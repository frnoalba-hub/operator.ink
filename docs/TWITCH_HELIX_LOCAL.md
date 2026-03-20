# Twitch Helix — local dev (Streamer Analytics)

Streamer Analytics calls **Mission Control** over `/api/twitch/*`. Vite proxies that path to port **8787** (see `vite.config.js`).

## 1. Twitch developer app

1. [Twitch Developer Console](https://dev.twitch.tv/console/apps) → Register an application.
2. Copy **Client ID** and create **Client Secret**.
3. No redirect URL needed for **client credentials** (app access token).

## 2. Secrets (workspace)

Add to your workspace secrets file (Mission Control already loads this path on boot):

`09_Tools/VC_CORE_SYSTEMS/_SECRETS_MANAGEMENT/.env`

```env
TWITCH_CLIENT_ID=your_client_id_here
TWITCH_CLIENT_SECRET=your_client_secret_here
```

Never commit real values. Do not expose the secret in the browser.

## 3. Run API + app

Terminal A — Mission Control API:

```bash
cd 09_Tools/VC_CORE_SYSTEMS/_MISSION_CONTROL
npm install   # once
npm run dev:api
```

Terminal B — operator.ink:

```bash
cd 05_Companies/Operator_Ink/_WEB_SYSTEM/operator.ink
npm run dev
```

Open `/StreamerAnalytics`. You should see **Live Helix** and real category rows.

## 4. Verify API directly

```bash
curl -s http://127.0.0.1:8787/api/twitch/status
curl -s "http://127.0.0.1:8787/api/twitch/featured?first=5"
```

## 5. Production (Base44 / static host)

The Vite proxy **only applies in dev**. For production you need either:

- Host Mission Control (or another proxy) on a public URL with CORS allowing your site origin, and set at build time:

  `VITE_TWITCH_API_BASE=https://your-api.example.com`

- Or move the Twitch routes to a serverless/edge function your host supports.

## Endpoints (Mission Control)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/twitch/status` | Credentials configured? |
| GET | `/api/twitch/featured?first=24` | Top games (`/helix/games/top`) |
| GET | `/api/twitch/category-summary?game_id=&max_pages=` | One category, paginated streams |
| POST | `/api/twitch/batch-summaries` | Body: `{ games: [{id,name}], maxPages }` |

## Title Gen (Metadata tab)

The **Generate titles** feature uses a Base44 function, not Mission Control. See [`docs/STREAMER_TITLE_GEN.md`](STREAMER_TITLE_GEN.md) for secrets, deploy, and permissions.
