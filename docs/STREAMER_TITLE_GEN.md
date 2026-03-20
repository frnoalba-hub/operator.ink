# Streamer Analytics — Title Gen

The **Titles** tab lets streamers get Twitch title suggestions in two ways:

1. **Presets** — Pick a game from the dropdown for instant, curated title ideas (no API).
2. **AI generation** — Describe your stream and click "Generate titles" to get LLM suggestions via Base44 integration credits.

## How it works

- **Presets:** `PRESET_TITLES_BY_GAME` in `src/pages/StreamerAnalytics/mocks.js` — add games and title arrays as needed.
- **AI:** Uses `base44.integrations.Core.InvokeLLM` with `response_json_schema` for structured output. No custom function, no external API keys.

## Base44 integration credits

Title generation consumes Base44 integration credits (AI integrations). Ensure your app has AI integrations enabled and sufficient credits.

## Models

Default model: `gpt_5_mini`. You can change it in the `handleGenerateTitles` call in `index.jsx` (e.g. `gemini_3_flash`).
