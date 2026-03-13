/**
 * AI Receptionist — serverless Twilio voice webhook (no server to run).
 * Uses Groq (free) or OpenAI for replies. Tenant from static env or base44.
 *
 * Set Twilio voice webhook to: https://YOUR_DEPLOY_URL/twilioVoice
 *
 * Env: GROQ_API_KEY (free) or OPENAI_API_KEY, TENANT_CONFIG_JSON or TENANT_PHONE+TENANT_PERSONA, BASE44_APP_URL (optional)
 */
const VOICE = "Polly.Joanna";
const GROQ_MODEL = "llama-3.1-8b-instant";
const OPENAI_MODEL = "gpt-5-mini";
const MAX_HISTORY_TURNS = 6;
const MAX_URL_LEN = 6000;

const DEFAULT_PERSONA = `You are a professional phone scheduling assistant. Greet warmly, ask how you can help, discuss services, qualify leads, and book appointments when ready. Keep responses SHORT and conversational — this is a phone call.`;

function twiml(tag: string, attrs: Record<string, string> = {}, body = "") {
  const a = Object.entries(attrs)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, "&quot;")}"`)
    .join(" ");
  return a ? `<${tag} ${a}>${body}</${tag}>` : `<${tag}>${body}</${tag}>`;
}

function buildTwiML(...elements: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response>${elements.join("")}</Response>`;
}

function say(text: string) {
  const clean = (text || "")
    .replace(/\{"booking":\{[\s\S]*?\}\}/g, "")
    .replace(/[*_`#\[\]]/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim() || "Thank you for calling. Goodbye.";
  return twiml("Say", { voice: VOICE }, clean);
}

function gather(action: string, prompt: string) {
  return twiml("Gather", {
    input: "speech",
    action,
    method: "POST",
    timeout: "8",
    speechTimeout: "auto",
    language: "en-US",
  }, say(prompt) + twiml("Say", { voice: VOICE }, "We didn't hear anything. Please call back. Goodbye.") + twiml("Hangup"));
}

function hangup() {
  return twiml("Hangup");
}

type Env = Record<string, string | undefined>;

function getStaticTenant(env: Env, phone: string): { persona?: string; telegram_bot_token?: string; telegram_chat_id?: string } | null {
  const json = env.TENANT_CONFIG_JSON;
  if (json) {
    try {
      const c = JSON.parse(json) as { phone?: string; persona?: string; telegram_bot_token?: string; telegram_chat_id?: string };
      if (c.phone && c.phone === phone) return c;
      if (!c.phone && phone) return c;
    } catch (_) {}
  }
  const tenantPhone = env.TENANT_PHONE;
  if (tenantPhone && tenantPhone === phone) {
    return {
      persona: env.TENANT_PERSONA,
      telegram_bot_token: env.TENANT_TELEGRAM_BOT_TOKEN,
      telegram_chat_id: env.TENANT_TELEGRAM_CHAT_ID,
    };
  }
  return null;
}

async function getTenantFromBase44(baseUrl: string, phone: string, env: Env) {
  if (!baseUrl) return null;
  const url = `${baseUrl.replace(/\/$/, "")}/functions/v1/getTenantConfig`;
  const serviceKey = env.BASE44_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (serviceKey) headers["Authorization"] = `Bearer ${serviceKey}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ phoneNumber: phone }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const j = await res.json();
    return j.ok ? j.tenant : null;
  } catch (_) {
    return null;
  }
}

async function resolveTenant(env: Env, phone: string) {
  const staticTenant = getStaticTenant(env, phone);
  if (staticTenant) return { persona: staticTenant.persona || undefined, telegram_bot_token: staticTenant.telegram_bot_token, telegram_chat_id: staticTenant.telegram_chat_id };
  const base44Url = env.BASE44_APP_URL || env.VITE_BASE44_APP_BASE_URL;
  return base44Url ? await getTenantFromBase44(base44Url, phone, env) : null;
}

async function callLLM(
  env: Env,
  systemPrompt: string,
  messages: { role: string; content: string }[]
) {
  const groqKey = env.GROQ_API_KEY;
  const openaiKey = env.OPENAI_API_KEY;
  const apiKey = groqKey || openaiKey;
  if (!apiKey) throw new Error("GROQ_API_KEY or OPENAI_API_KEY required");

  const useGroq = !!groqKey;
  const url = useGroq ? "https://api.groq.com/openai/v1/chat/completions" : "https://api.openai.com/v1/chat/completions";
  const model = useGroq ? GROQ_MODEL : OPENAI_MODEL;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      max_tokens: 220,
      temperature: 0.7,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${useGroq ? "Groq" : "OpenAI"} ${res.status}: ${err}`);
  }
  const j = await res.json();
  return j.choices?.[0]?.message?.content?.trim() || "I'm sorry, could you repeat that?";
}

function parseHistory(h: string): { role: string; content: string }[] {
  if (!h) return [];
  try {
    const s = atob(h.replace(/-/g, "+").replace(/_/g, "/"));
    const arr = JSON.parse(s);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function encodeHistory(msgs: { role: string; content: string }[]): string {
  const trimmed = msgs.slice(-MAX_HISTORY_TURNS * 2);
  return btoa(JSON.stringify(trimmed)).replace(/\+/g, "-").replace(/\//g, "_");
}

function extractBooking(text: string): object | null {
  const m = text.match(/\{"booking":\{[^{}]*(?:\{[^{}]*\}[^{}]*)?\}\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[0]);
  } catch {
    return null;
  }
}

async function sendTelegram(botToken: string, chatId: string, text: string) {
  if (!botToken || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ chat_id: chatId, text }),
    });
  } catch (_) {}
}

async function handleTwilioVoice(req: Request, env: Env): Promise<Response> {
  const groqKey = env.GROQ_API_KEY;
  const openaiKey = env.OPENAI_API_KEY;
  if (!groqKey && !openaiKey) {
    console.error("[twilioVoice] GROQ_API_KEY or OPENAI_API_KEY required");
    return new Response(
      buildTwiML(say("Service is temporarily unavailable. Please try again later."), hangup()),
      { headers: { "Content-Type": "text/xml" } }
    );
  }

  let body: Record<string, string> = {};
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/x-www-form-urlencoded")) {
      const raw = await req.text();
      body = Object.fromEntries(new URLSearchParams(raw));
    } else {
      body = await req.json();
    }
  } catch {
    body = {};
  }

  const callSid = body.CallSid || body.call_sid || "";
  const fromNumber = body.From || body.FromNumber || "";
  const toNumber = body.To || body.ToNumber || "";
  const speechResult = (body.SpeechResult || "").trim();
  const callStatus = body.CallStatus || "";

  const url = new URL(req.url);
  const basePath = url.origin + url.pathname;
  const histParam = url.searchParams.get("h") || "";
  const history = parseHistory(histParam);

  if (callStatus === "completed" || callStatus === "failed" || callStatus === "busy" || callStatus === "no-answer") {
    const duration = body.CallDuration || "0";
    const tenant = await resolveTenant(env, toNumber);
    if (tenant?.telegram_bot_token && tenant?.telegram_chat_id && duration !== "0") {
      await sendTelegram(
        tenant.telegram_bot_token,
        tenant.telegram_chat_id,
        `📵 Call ended • ${duration}s • From: ${fromNumber} • Ref: ${callSid}`
      );
    }
    return new Response(buildTwiML(say("Goodbye."), hangup()), {
      headers: { "Content-Type": "text/xml" },
    });
  }

  if (!speechResult) {
    const tenant = await resolveTenant(env, toNumber);
    const greeting = "Thank you for calling. How can we help you today?";
    if (tenant?.telegram_bot_token && tenant?.telegram_chat_id) {
      await sendTelegram(
        tenant.telegram_bot_token,
        tenant.telegram_chat_id,
        `📞 Incoming call from ${fromNumber || "unknown"} to ${toNumber}`
      );
    }
    const nextUrl = `${basePath}?h=${encodeURIComponent(encodeHistory([{ role: "assistant", content: greeting }]))}`;
    const twi = buildTwiML(gather(nextUrl, greeting), hangup());
    return new Response(twi, { headers: { "Content-Type": "text/xml" } });
  }

  const tenant = await resolveTenant(env, toNumber);
  const persona = tenant?.persona || DEFAULT_PERSONA;

  const userMsg = { role: "user", content: speechResult };
  const allMessages = [...history, userMsg];

  let reply: string;
  try {
    reply = await callLLM(env, persona, allMessages);
  } catch (err) {
    console.error("[twilioVoice] GPT error:", err);
    reply = "I'm having a brief connection issue. Could you say that again?";
  }

  const booking = extractBooking(reply);
  const spokenReply = booking
    ? reply.replace(/\{"booking":\{[\s\S]*?\}\}/g, "").replace(/\s{2,}/g, " ").trim() || "Perfect, your appointment is all set. Goodbye!"
    : reply;

  const newHistory = [...allMessages, { role: "assistant", content: spokenReply }];
  let nextUrl = `${basePath}?h=${encodeURIComponent(encodeHistory(newHistory))}`;
  if (nextUrl.length > MAX_URL_LEN) {
    nextUrl = `${basePath}?h=${encodeURIComponent(encodeHistory(newHistory.slice(-4)))}`;
  }

  if (booking && tenant?.telegram_bot_token && tenant?.telegram_chat_id) {
    const lines = [
      "New booking via AI Receptionist",
      "",
      `Name: ${(booking as any).booking?.name || "—"}`,
      `Address: ${(booking as any).booking?.address || "—"}`,
      `Service: ${(booking as any).booking?.service || "—"}`,
      `Date: ${(booking as any).booking?.date || "—"}`,
      `Time: ${(booking as any).booking?.time || "—"}`,
      "",
      `From: ${fromNumber}`,
      `Ref: ${callSid}`,
    ];
    await sendTelegram(tenant.telegram_bot_token, tenant.telegram_chat_id, lines.join("\n"));
  }

  const endPhrases = ["goodbye", "thank you for calling", "have a great day", "take care"];
  const shouldEnd = endPhrases.some((p) => spokenReply.toLowerCase().includes(p)) || !!booking;

  if (shouldEnd) {
    return new Response(buildTwiML(say(spokenReply), hangup()), {
      headers: { "Content-Type": "text/xml" },
    });
  }

  return new Response(buildTwiML(gather(nextUrl, spokenReply), hangup()), {
    headers: { "Content-Type": "text/xml" },
  });
}

if (typeof Deno !== "undefined") {
  Deno.serve(async (req) =>
    handleTwilioVoice(req, Object.fromEntries(Deno.env.entries()) as Env)
  );
}

export { handleTwilioVoice };
