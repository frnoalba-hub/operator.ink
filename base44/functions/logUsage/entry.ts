import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { customer_id, skill_slug, event_type, tokens_used, cost_cents, meta } = await req.json();

    if (!skill_slug || !event_type) {
      return Response.json({ ok: false, error: 'skill_slug and event_type required' }, { status: 400 });
    }

    const entry = await base44.asServiceRole.entities.UsageLog.create({
      customer_id: customer_id || 'unknown',
      skill_slug,
      event_type,
      timestamp: new Date().toISOString(),
      tokens_used: tokens_used || 0,
      cost_cents: cost_cents || 0,
      meta: meta ? JSON.stringify(meta) : null,
    });

    return Response.json({ ok: true, id: entry.id });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
});
