# CallLog Entity Setup (base44)

To store AI Receptionist conversation transcripts in Operator.ink, add the **CallLog** entity in base44.

## 1. Create Entity

In base44 → your app → **Dashboard** → **Data** → **Entities** (or equivalent schema editor):

Create entity: **CallLog**

## 2. Fields

| Field | Type | Notes |
|-------|------|-------|
| call_sid | string | Twilio Call SID (unique identifier) |
| from_number | string | Caller phone number |
| to_number | string | Business line number |
| skill_id | string | ActivatedSkill id (optional) |
| transcript | text | Full conversation (Caller / Assistant turns) |
| duration_seconds | number | Optional, from Twilio status callback |
| created_at | timestamp | Auto or manual |
| updated_at | timestamp | Auto or manual |

## 3. After Creating

- Deploy/publish your app
- `saveCallLog` and `twilioVoice` will start persisting transcripts
- View logs at **Operator.ink** → **Calls**

## 4. Secrets

Ensure `BASE44_SERVICE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) is set in base44 Secrets so `twilioVoice` can authenticate when calling `saveCallLog` and `saveLeadFromBooking`.
