# Streamer Analytics — Product Spec

**Module:** `src/pages/StreamerAnalytics/` (`index.jsx`, `mocks.js`, `utils.js`, `useStreamerTwitchLive.js`)
**Route:** `/StreamerAnalytics` (direct link, not in nav)
**Status:** 🟢 Active — Live Helix for **categories** (local via Mission Control); hourly history = snapshots (next)
**Collaborators:** Cursor (UI) + Antigravity (data/arch)
**Last updated:** 2026-03-20

---

## Overview

A hidden analytics dashboard for Twitch streamers. Accessible via direct link only (not exposed in StickyNav). Built on top of operator.ink's retro-theme design system.

**Primary users:** Alex / internal streamers only (for now)

---

## Features

### Tab 1 — Overview
| KPI | Source | Notes |
|-----|--------|-------|
| Avg Viewers | Twitch Helix `/streams` | Rolling 7d average |
| Peak Viewers | Twitch Helix `/videos` | Max concurrent per session |
| Hours Streamed | Twitch Helix `/videos` | Sum of stream durations |
| Followers Gained | Twitch Helix `/channels/followers` | Delta over period |
| Chat Messages | Twitch EventSub or logs | Optional — may need EventSub |
| Streams | Twitch Helix `/videos` | Count of VODs in period |

- Date range selector: 7d / 30d / 90d
- Trend chart: viewer count over time (Recharts — already in deps)

### Tab 2 — Channels
- Channel list: name, platform badge (Twitch / YouTube / Kick), live status
- View delta: current viewers vs. prior period
- Viewer-to-streamer ratio per category
- Best stream times per game/category (historical analysis)
- Leaderboard view: ranked by avg viewers

### Tab 3 — Audience
- Geographic breakdown (country/region)
- Device split (desktop / mobile / console)
- Peak viewing hours heatmap
- Follower growth chart

### Title Tools (Future / Phase 5+)
- **Best Titles:** Analyze top-performing stream titles by CTR / avg viewers
- **Title Gen:** AI-suggested titles based on game, time, and historical performance
- Depends on VOD metadata + LLM integration

---

## Data Strategy

### Primary: Twitch Helix API
- **Auth:** OAuth Client Credentials (app token) or user token
- **Key endpoints:**
  - `GET /helix/streams` — live stream data
  - `GET /helix/videos` — VOD history, durations
  - `GET /helix/channels/followers` — follower counts
  - `GET /helix/games` — category/game names
- **Rate limits:** 800 req/min (app token), respect `Ratelimit-Remaining` headers
- **CORS:** Must proxy through a backend — cannot call Helix directly from browser

### Backend Proxy (current)
1. **Mission Control API** — **`/api/twitch/*`** in `_MISSION_CONTROL/server/index.js` + `twitch-helix.js` (app token, Helix).
2. **operator.ink dev** — Vite proxies `/api/twitch` → `http://127.0.0.1:8787` (`vite.config.js`).
3. **Mock fallback** — If credentials missing or request fails, Streamer Analytics shows mock categories.

**Docs:** `docs/TWITCH_HELIX_LOCAL.md`  
**Production:** Set `VITE_TWITCH_API_BASE` to a deployed proxy URL, or add serverless routes; see TWITCH_HELIX_LOCAL.md.

---

## UI Mapping

```
pages/StreamerAnalytics/
├── Header (title + tab nav)
├── Tab: Overview
│   ├── Date range selector (7d / 30d / 90d)
│   ├── KPI grid (6 cards — 2 col mobile / 4 col lg / 6 col xl)
│   └── Trend chart (Recharts LineChart)
├── Tab: Channels
│   ├── Channel rows (name, badge, status, delta)
│   └── Category leaderboard
└── Tab: Audience
    ├── Geo breakdown
    ├── Device split
    └── Peak hours heatmap
```

---

## Component Plan

| Component | File | Status |
|-----------|------|--------|
| KPICard | `src/components/streamer/KPICard.jsx` | ⏳ Planned |
| ChannelRow | `src/components/streamer/ChannelRow.jsx` | ⏳ Planned |
| AudienceChart | `src/components/streamer/AudienceChart.jsx` | ⏳ Planned |
| useStreamerData hook | `src/hooks/useStreamerData.js` | ⏳ Planned |

---

## Helix Constraints

- Cannot call Helix from browser (CORS blocked) — proxy required
- App token scope: no user-specific data (need user token for follower details on private accounts)
- `GET /helix/channels/followers` requires broadcaster user token scope `moderator:read:followers`
- VOD data only available for non-deleted VODs (check `type: archive`)

---

## Out of Scope (v1)

- Subscription revenue data (requires affiliate/partner + user token)
- Clip analytics
- Multi-account / team management
- Public-facing embed
