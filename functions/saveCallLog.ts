/**
 * Upsert CallLog by call_sid. Called by twilioVoice to persist conversation transcripts.
 * Requires: CallLog entity in base44 (add via Dashboard → Data → Entities).
 * Auth: Bearer BASE44_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  }
  try {
    const base44 = createClientFromRequest(req);
    const { call_sid, from_number, to_number, skill_id, transcript, duration_seconds } = await req.json();

    if (!call_sid || !transcript) {
      return Response.json({ ok: false, error: 'call_sid and transcript required' }, { status: 400 });
    }

    const entity = base44.asServiceRole.entities.CallLog;
    if (!entity) {
      return Response.json({ ok: false, error: 'CallLog entity not found. Add it in base44 Dashboard → Data → Entities.' }, { status: 500 });
    }

    const existing = await entity.list();
    const match = (existing || []).find((r: any) => r.call_sid === call_sid);
    const now = new Date().toISOString();

    const payload: Record<string, unknown> = {
      from_number: from_number || '',
      to_number: to_number || '',
      transcript,
      updated_at: now,
    };
    if (skill_id) payload.skill_id = skill_id;
    if (duration_seconds != null) payload.duration_seconds = Number(duration_seconds);

    if (match) {
      await entity.update(match.id, payload);
      return Response.json({ ok: true, id: match.id, updated: true });
    }

    const created = await entity.create({
      call_sid,
      from_number: from_number || '',
      to_number: to_number || '',
      skill_id: skill_id || '',
      transcript,
      duration_seconds: duration_seconds != null ? Number(duration_seconds) : null,
      created_at: now,
      updated_at: now,
    });
    return Response.json({ ok: true, id: created.id });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
});
