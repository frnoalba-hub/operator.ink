/**
 * Streamer Analytics — Title Gen
 * Generates Twitch stream title suggestions from a short description.
 * Base44 secrets: XAI_API_KEY (Grok, free tier) — or GROQ_API_KEY / OPENAI_API_KEY as fallback
 */

type Env = Record<string, string | undefined>;

const XAI_MODEL = "grok-4-mini"; // Free tier recommended
const GROQ_MODEL = "llama-3.1-8b-instant";
const OPENAI_MODEL = "gpt-4o-mini";

const SYSTEM_PROMPT = `You are a Twitch stream title advisor. Generate concise, engaging stream titles that:
- Stay under 100 characters (Twitch limit)
- Are honest (no clickbait or false claims)
- Use patterns that work: short hook + game name, modifiers like "first play" / "blind" / "chill" when relevant, one clear CTA (speedrun, ranked, coaching)
- Match the streamer's described vibe and content

Return ONLY a JSON array of 3–5 title strings. No other text. Example: ["Late-night Hollow Knight — first play, no spoilers", "Ranked grind | road to Immortal — Valorant"]`;

async function callLLM(env: Env, userPrompt: string): Promise<string> {
  const xaiKey = env.XAI_API_KEY;
  const groqKey = env.GROQ_API_KEY;
  const openaiKey = env.OPENAI_API_KEY;
  const apiKey = xaiKey || groqKey || openaiKey;
  if (!apiKey) throw new Error("XAI_API_KEY (Grok free tier), GROQ_API_KEY, or OPENAI_API_KEY required in Base44 function secrets");

  const provider = xaiKey ? "xai" : groqKey ? "groq" : "openai";
  const url = xaiKey
    ? "https://api.x.ai/v1/chat/completions"
    : groqKey
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";
  const model = xaiKey ? XAI_MODEL : groqKey ? GROQ_MODEL : OPENAI_MODEL;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${provider === "xai" ? "Grok" : provider === "groq" ? "Groq" : "OpenAI"} ${res.status}: ${err}`);
  }
  const j = await res.json();
  return j.choices?.[0]?.message?.content?.trim() || "[]";
}

function parseTitles(raw: string): string[] {
  const trimmed = raw?.trim() || "";
  if (!trimmed) return [];
  // Handle markdown code blocks
  const jsonStr = trimmed.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.filter((x) => typeof x === "string").slice(0, 5);
    }
    if (parsed?.titles && Array.isArray(parsed.titles)) {
      return parsed.titles.filter((x) => typeof x === "string").slice(0, 5);
    }
    return [];
  } catch {
    // Fallback: split by newlines and clean
    return trimmed
      .split(/\n/)
      .map((s) => s.replace(/^[-*]\s*|^"\s*|"\s*$/g, "").trim())
      .filter((s) => s.length > 0 && s.length <= 100)
      .slice(0, 5);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const description = String(body?.description ?? "").trim();
    const game = String(body?.game ?? "").trim();
    const count = Math.min(5, Math.max(1, Number(body?.count) || 5));

    if (!description) {
      return Response.json({ ok: false, error: "description required" }, { status: 400 });
    }

    const env = Deno.env.toObject() as unknown as Env;
    const userPrompt = game
      ? `Generate ${count} stream titles for: "${description}" (game/category: ${game})`
      : `Generate ${count} stream titles for: "${description}"`;

    const raw = await callLLM(env, userPrompt);
    const titles = parseTitles(raw).slice(0, count);

    return Response.json(
      { ok: true, titles },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err) {
    return Response.json(
      { ok: false, error: String(err?.message ?? err) },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
});
