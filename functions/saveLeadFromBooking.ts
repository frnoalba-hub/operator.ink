/**
 * Create LeadSubmission from AI Receptionist booking. Called by twilioVoice when extractBooking finds a booking.
 * Auth: Bearer BASE44_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  }
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { from_number, call_sid } = body;
    const b = body.booking || body;

    const name = b.name || 'Unknown';
    const address = b.address || '';
    const service = b.service || 'General';
    const date = b.date || '';
    const time = b.time || '';
    const notes = b.notes || '';

    const scope = [
      'Phone booking via AI Receptionist',
      '',
      `Service: ${service}`,
      `Date: ${date} ${time}`.trim(),
      `Address: ${address}`,
      notes ? `Notes: ${notes}` : '',
      from_number ? `Caller: ${from_number}` : '',
      call_sid ? `Call ref: ${call_sid}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const lead = await base44.asServiceRole.entities.LeadSubmission.create({
      client_name: name,
      client_email: from_number ? `call-${from_number.replace(/\D/g, '')}@operator.ink` : '',
      scope,
      service: service || 'General',
      status: 'new',
    });

    return Response.json({ ok: true, id: lead.id });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
});
