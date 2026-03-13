# Activate Outright Landscape Demo (888 Number)

Two ways to set up the Outright Landscape demo with **+1 (888) 273-8659**:

---

## Option A: Via Ops Board (Manual)

1. Open Operator.ink → **Ops Board**
2. Click **Activate** on **AI Receptionist**
3. Fill in (from `05_VOICE_CALL_HANDLER/.env`):
   - Twilio Account SID
   - Twilio Auth Token
   - Twilio Phone Number: `+18882738659`
   - Telegram Bot Token (optional)
   - Telegram Chat ID (optional)
4. In **Agent Persona**, click **Use Outright Landscape** to auto-fill
5. Save

---

## Option B: Via Seed Function (One-Time)

Invoke the `seedOutrightDemo` function with your Manos credentials.

**Example (curl):**

```bash
curl -X POST "https://YOUR_BASE44_APP_URL/functions/v1/seedOutrightDemo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "twilio_account_sid": "ACxxxxxxxx...",
    "twilio_auth_token": "your_token",
    "twilio_phone_number": "+18882738659",
    "telegram_bot_token": "123456:ABC-DEF...",
    "telegram_chat_id": "-100123456789"
  }'
```

**Or from Node (reading from .env):**

```js
import 'dotenv/config';
const res = await fetch(process.env.BASE44_FUNCTION_URL + '/seedOutrightDemo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    twilio_account_sid: process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_phone_number: '+18882738659',
    telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN,
    telegram_chat_id: process.env.TELEGRAM_OUTRIGHT_CHAT_ID,
  }),
});
console.log(await res.json());
```

---

## After Activation

- The **Call Handler** fetches tenant config from **Mission Control** (`/api/v1/tenant/config?phone=+18882738659`).
- Mission Control must be wired to **base44 getTenantConfig** to read from ActivatedSkill.
- If still using static config from `.env`, the existing Manos setup continues to work.

---

## Credentials Source (Manos creds)

Use the same credentials as Manos in `05_VOICE_CALL_HANDLER/.env`:

**Option 1 — base44 env vars**  
Set these in your base44 project (env / secrets):

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER` (default: +18882738659)
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_OUTRIGHT_CHAT_ID`

Then call the seed with an empty body — it will use these Manos creds.

**Option 2 — Request body**  
Send the same values in the POST body (see Option B above).
