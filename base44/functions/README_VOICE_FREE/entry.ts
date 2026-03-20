# AI Receptionist — Zero-Cost (Groq + Cloudflare)

Run the AI Receptionist with **no OpenAI or base44 credits** using Groq (free LLM) and Cloudflare Workers (free hosting).

## 1. Get Groq API Key

1. Sign up at [console.groq.com](https://console.groq.com)
2. Create an API key (free, 14,400 requests/day)

## 2. Deploy to Cloudflare Workers

From the `operator.ink` directory:

```bash
cd worker-voice
npx wrangler deploy
```

You'll get a URL like `https://operator-ink-voice.<you>.workers.dev`.

## 3. Set Secrets

```bash
npx wrangler secret put GROQ_API_KEY
# Paste your Groq API key when prompted
```

For tenant config (required for Twilio to route calls):

**Option A — JSON (single tenant):**
```bash
npx wrangler secret put TENANT_CONFIG_JSON
# Paste: {"phone":"+18882738659","persona":"You are Outright Landscape's receptionist. We do landscaping..."}
```

**Option B — Individual vars:**
```bash
npx wrangler secret put TENANT_PHONE
# +18882738659
npx wrangler secret put TENANT_PERSONA
# You are Outright Landscape's receptionist...
npx wrangler secret put TENANT_TELEGRAM_BOT_TOKEN   # optional
npx wrangler secret put TENANT_TELEGRAM_CHAT_ID    # optional
```

## 4. Twilio Webhook

In Twilio Console → Phone Numbers → Your number → Voice:

- **A Call Comes In**: Webhook
- **URL**: `https://operator-ink-voice.<you>.workers.dev` (your Worker URL)
- **Method**: POST
- **Status Callback URL** (optional): same URL — for "call ended" Telegram alerts

## 5. Call to Test

Call your Twilio number. The AI answers using Groq (free) with no base44 or OpenAI spend.

## Notes

- **Groq free tier**: 14,400 requests/day — plenty for demos and low-volume use
- **Model**: `llama-3.1-8b-instant` — fast, good for voice
- **No base44**: Tenant config comes from secrets only
- To add base44 tenant lookup later, set `BASE44_APP_URL` and `BASE44_SERVICE_KEY` as secrets
