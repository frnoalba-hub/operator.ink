# AI Receptionist — base44 + Twilio (No Manos)

**Flow: Twilio → base44 twilioVoice → Groq.** No Manos, no Call Handler, no Mission Control.

---

## 1. base44 Secrets

In base44 → your app → Dashboard → Secrets, add:

| Secret | Purpose |
|--------|---------|
| `GROQ_API_KEY` | Required — Groq API key (free at console.groq.com) |

That's it. Tenant config comes from Operator.ink Ops Board (ActivatedSkill). No `BASE44_APP_URL` needed — twilioVoice auto-detects when running on base44.

---

## 2. Configure in Operator.ink

1. Go to **operator.ink** (or operator-ink-flow.base44.app) → sign in
2. **Ops Board** → **AI Receptionist** → **Configure**
3. Click **Use Outright Demo (888)** to pre-fill phone + persona
4. Add Twilio Account SID + Auth Token (optional for basic save; needed for Twilio webhook config)
5. **Save**

---

## 3. Twilio Voice Webhook

In Twilio Console → Phone Numbers → Your number → Voice:

- **A Call Comes In**: Webhook
- **URL**: `https://operator-ink-flow.base44.app/functions/v1/twilioVoice`
- **Method**: POST
- **Status Callback URL** (optional): same URL — for "call ended" Telegram alerts

---

## 4. Test

Call **+1 (888) 273-8659**. The AI answers using Groq, with persona from your Ops Board config.

---

## Cloudflare Worker (Alternative)

For zero base44 usage, deploy to Cloudflare Workers. See [`functions/README_VOICE_FREE.md`](functions/README_VOICE_FREE.md).
