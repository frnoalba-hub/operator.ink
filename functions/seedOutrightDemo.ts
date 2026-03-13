/**
 * One-time seed: Creates an ActivatedSkill for Outright Landscape demo
 * with the 888 number (+18882738659).
 *
 * Call with POST body containing Twilio + Telegram credentials:
 * {
 *   "twilio_account_sid": "ACxxxxxxxx...",
 *   "twilio_auth_token": "your_token",
 *   "twilio_phone_number": "+18882738659",
 *   "telegram_bot_token": "123456:ABC-DEF...",  // optional
 *   "telegram_chat_id": "-100123456789"         // optional
 * }
 *
 * Uses asServiceRole to create the record. Run once from base44 dashboard
 * or curl with your base44 function URL + auth.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const OUTRIGHT_PERSONA = `You are the phone scheduling assistant for Outright Landscape, a professional landscaping and irrigation company in the San Gabriel Valley and San Diego area.

Your job on this call:
1. Greet the caller warmly and professionally.
2. Ask what kind of landscaping or irrigation help they need.
3. Discuss services and give ballpark price ranges when asked:
   - Irrigation systems: $800–$3,000+ depending on property size
   - Lawn care / maintenance: $60–$150/visit
   - Hardscape (patios, walkways, retaining walls): $2,000–$15,000+
   - Sprinkler repair: $75–$250 per service call
4. Qualify the lead: ask about property type (residential/commercial), size, job urgency, and location.
5. When the caller wants to book, collect: full name, property address, preferred date and time.
6. Always suggest appointment times that allow 1–2 hours travel time for the crew to arrive after their current location.
7. When booking is fully confirmed by the caller, output this exact JSON on its own line at the end of your response:
   {"booking":{"name":"...","address":"...","service":"...","date":"...","time":"...","notes":"..."}}
8. Be friendly, concise, and professional. Never promise exact prices without an in-person estimate.
9. If the caller is not interested or the call is wrapping up, say goodbye warmly.

IMPORTANT: Keep responses SHORT and conversational. This is a phone call — no bullet points, no headers, just natural spoken language.`;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    let body: Record<string, string> = {};
    try {
      body = (await req.json()) || {};
    } catch {
      body = {};
    }

    // Prefer env vars, fallback to request body
    const twilioAccountSid = (
      body.twilio_account_sid ||
      Deno.env.get('TWILIO_ACCOUNT_SID') ||
      ''
    ).trim();
    const twilioAuthToken = (
      body.twilio_auth_token ||
      Deno.env.get('TWILIO_AUTH_TOKEN') ||
      ''
    ).trim();
    const twilioPhoneNumber = (
      body.twilio_phone_number ||
      Deno.env.get('TWILIO_PHONE_NUMBER') ||
      '+18882738659'
    ).trim();
    const telegramBotToken = (
      body.telegram_bot_token ||
      Deno.env.get('TELEGRAM_BOT_TOKEN') ||
      ''
    ).trim();
    const telegramChatId = (
      body.telegram_chat_id ||
      Deno.env.get('TELEGRAM_OUTRIGHT_CHAT_ID') ||
      ''
    ).trim();

    if (!twilioAccountSid || !twilioAuthToken) {
      return Response.json(
        {
          ok: false,
          error: 'twilio_account_sid and twilio_auth_token required',
          hint: 'Set TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN in base44 Secrets or pass in request body',
        },
        { status: 400 }
      );
    }

    const config = {
      twilio_account_sid: twilioAccountSid,
      twilio_auth_token: twilioAuthToken,
      twilio_phone_number: twilioPhoneNumber || '+18882738659',
      telegram_bot_token: telegramBotToken || undefined,
      telegram_chat_id: telegramChatId || undefined,
      _persona: OUTRIGHT_PERSONA,
    };

    const existing = await base44.asServiceRole.entities.ActivatedSkill.list();
    const outright = existing.find(
      (s) =>
        s.skill_slug === 'ai-receptionist' &&
        (s.config?.includes('+18882738659') || s.config?.includes(twilioPhoneNumber))
    );

    if (outright) {
      await base44.asServiceRole.entities.ActivatedSkill.update(outright.id, {
        config: JSON.stringify(config),
        status: 'active',
      });
      return Response.json({
        ok: true,
        action: 'updated',
        skillId: outright.id,
        phone: twilioPhoneNumber,
        message: 'Outright Landscape demo config updated.',
      });
    }

    const created = await base44.asServiceRole.entities.ActivatedSkill.create({
      skill_slug: 'ai-receptionist',
      config: JSON.stringify(config),
      status: 'active',
      activated_at: new Date().toISOString(),
    });

    return Response.json({
      ok: true,
      action: 'created',
      skillId: created.id,
      phone: twilioPhoneNumber,
      message: 'Outright Landscape demo activated. Calls to +18882738659 will use this config.',
    });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
});
