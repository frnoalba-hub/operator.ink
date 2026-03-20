# Streamer Analytics — Title Gen (Base44 function)

The **Metadata** tab’s “Generate titles” feature calls a Base44 backend function that uses an LLM to produce Twitch stream title suggestions.

## Function

- **Name:** `generateStreamTitles`
- **Path:** `base44/functions/generateStreamTitles/entry.ts`
- **Invoke:** `base44.functions.invoke('generateStreamTitles', { description, game?, count? })`

## Base44 secrets

Add **one** of these in your Base44 app’s function environment (dashboard):

| Secret | Purpose |
|--------|---------|
| `XAI_API_KEY` | xAI Grok API key (grok-4-mini) — **free tier recommended** |
| `GROQ_API_KEY` | Groq API key (llama-3.1-8b-instant) — free tier |
| `OPENAI_API_KEY` | OpenAI API key (gpt-4o-mini) |

Priority: XAI (Grok) → Groq → OpenAI.

## Deploy

1. Ensure the function is registered in your Base44 app (sync/deploy from the repo).
2. Set the API key secret in Base44.
3. If the function requires authentication, allow **public invoke** for anonymous visitors on `/StreamerAnalytics`, or require login.

## Request / response

**Request body:**
```json
{
  "description": "Hollow Knight first play, chill, no backseating",
  "game": "Hollow Knight",
  "count": 5
}
```

**Response:**
```json
{
  "ok": true,
  "titles": ["Late-night Hollow Knight — first play, no spoilers", "…"]
}
```

## Errors

- **401 / 403:** Function may require authentication — check Base44 permissions.
- **500 + "XAI_API_KEY ... required":** Add `XAI_API_KEY` (from [console.x.ai](https://console.x.ai)) or another provider key in Base44.
- **Network / CORS:** Ensure the app’s origin is allowed if you use a custom domain.
