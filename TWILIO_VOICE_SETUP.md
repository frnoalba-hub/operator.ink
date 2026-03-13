# AI Receptionist — Serverless (No Server)

Twilio webhook runs in base44 or Cloudflare Workers. No Call Handler or Mission Control to run.

---

## Option A: Zero-Cost (Groq + Cloudflare Workers)

No base44 credits, no OpenAI. See [`functions/README_VOICE_FREE.md`](functions/README_VOICE_FREE.md) for full setup.

- **LLM**: Groq (free, 14.4k req/day)
- **Hosting**: Cloudflare Workers (free)
- **Tenant**: Static env vars or `TENANT_CONFIG_JSON`

---

## Option B: base44 Functions

## 1. Activate in Ops Board

1. Go to Operator.ink → Ops Board
2. Activate **AI Receptionist**
3. Add Twilio Account SID, Auth Token, Phone Number (e.g. +18882738659)
4. Add Telegram Bot Token + Chat ID (optional, for alerts)
5. Click **Use Outright Landscape** for persona, or write your own
6. Save

## 2. base44 Environment

Set these in your base44 project (env/secrets):

| Variable | Purpose |
|----------|---------|
| `GROQ_API_KEY` | Free — Groq API key (preferred, no cost) |
| `OPENAI_API_KEY` | Optional — fallback if no Groq |
| `BASE44_APP_URL` | Base URL of your base44 app |
| `BASE44_SERVICE_KEY` | Optional — for getTenantConfig |
| `TENANT_CONFIG_JSON` | Optional — static tenant (skips base44 lookup) |

**Zero base44 usage**: Use `GROQ_API_KEY` + `TENANT_CONFIG_JSON` — no getTenantConfig calls, no OpenAI.

## 3. Twilio Webhook

In Twilio Console → Phone Numbers → Your number → Voice:

- **A Call Comes In**: Webhook  
- **URL**: `https://YOUR_BASE44_APP/functions/v1/twilioVoice` (base44) or your Cloudflare Worker URL  
- **Method**: POST  
- **Status Callback URL** (optional): same URL — enables "call ended" Telegram alerts

## 4. Deploy

**base44**: Push to GitHub — base44 deploys functions automatically.

**Cloudflare**: `cd worker-voice && npx wrangler deploy`

## Model

- **Groq**: `llama-3.1-8b-instant` (free, fast for voice)
- **OpenAI**: `gpt-5-mini` (fallback when `OPENAI_API_KEY` is set)
