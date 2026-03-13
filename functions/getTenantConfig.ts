import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { phoneNumber, tenantId } = await req.json();

    if (!phoneNumber && !tenantId) {
      return Response.json({ ok: false, error: 'phoneNumber or tenantId required' }, { status: 400 });
    }

    const skills = await base44.asServiceRole.entities.ActivatedSkill.list();

    let match = null;
    for (const skill of skills) {
      if (skill.skill_slug !== 'ai-receptionist') continue;
      let config = {};
      try {
        config = typeof skill.config === 'string' ? JSON.parse(skill.config || '{}') : (skill.config || {});
      } catch { continue; }

      if (phoneNumber && config.twilio_phone_number === phoneNumber) {
        match = { skill, config };
        break;
      }
      if (tenantId && skill.customer_id === tenantId) {
        match = { skill, config };
        break;
      }
    }

    if (!match) {
      return Response.json({ ok: false, error: 'No tenant found for this number' }, { status: 404 });
    }

    return Response.json({
      ok: true,
      tenant: {
        id: match.skill.customer_id || match.skill.id,
        skillId: match.skill.id,
        phone: match.config.twilio_phone_number || phoneNumber,
        agent: 'operator-ink',
        persona: match.config._persona || null,
        telegram_bot_token: match.config.telegram_bot_token || null,
        telegram_chat_id: match.config.telegram_chat_id || null,
        voice: 'Polly.Joanna',
        status: match.skill.status,
      },
    });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
});
