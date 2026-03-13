# Activate Outright Landscape Demo (888 Number)

**Flow: Twilio → base44 twilioVoice → Groq.** No Manos, no Call Handler.

---

## Option A: Via Ops Board (Recommended)

1. Open **operator.ink** → **Ops Board**
2. Click **Activate** on **AI Receptionist**
3. Click **Use Outright Demo (888)** to pre-fill phone + persona
4. Add Twilio Account SID + Auth Token (if you have them)
5. Save

Add `GROQ_API_KEY` in base44 → Secrets. Point Twilio voice webhook to `https://operator-ink-flow.base44.app/functions/v1/twilioVoice`.

---

## Option B: Via Seed Function (One-Time)

Creates an ActivatedSkill record with Outright config.

```bash
curl -X POST "https://operator-ink-flow.base44.app/functions/v1/seedOutrightDemo" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SERVICE_TOKEN" \
  -d '{
    "twilio_account_sid": "ACxxxxxxxx...",
    "twilio_auth_token": "your_token",
    "twilio_phone_number": "+18882738659",
    "telegram_bot_token": "...",
    "telegram_chat_id": "..."
  }'
```

Or set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, etc. in base44 Secrets and call with empty body.
