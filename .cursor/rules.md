# Cursor Rules — operator.ink

## Active Feature: Streamer Analytics

Working on `src/pages/StreamerAnalytics/` (colocated module). Both Cursor and Antigravity are collaborating on this.

**Reference doc:** `VC_CORE_HQ/11_Memory/SHARED_BRAIN/STREAMER_ANALYTICS_REF.md`
**Feature task:** `VC_CORE_HQ/11_Memory/SHARED_BRAIN/STREAMER_ANA_TASK.md`

## Page Overview

- **Purpose:** Help streamers **choose which category/game to stream in** (viewer demand vs channels live, best times, titles) — not a generic “my channel stats” dashboard.
- **Route:** `/StreamerAnalytics` (direct link only, not in nav)
- **Module:** `src/pages/StreamerAnalytics/` — `index.jsx`, `mocks.js`, `utils.js`, `useStreamerTwitchLive.js`
- **Registered in:** explicit `<Route>` in `src/App.jsx` (Base44 may omit extra `pages.config` entries)
- **Style system:** Uses `retro-theme` CSS vars + Tailwind classes (see `App.css`)
- **Pattern:** Follow `InventoryDashboard.jsx` or `CensusBoard.jsx` for patterns

## Coordination Rules

- **Antigravity** handles: architecture decisions, data integration, backend wiring, new sub-components
- **Cursor** handles: interactive UI edits, styling, tab logic, component refinement
- **Sync point:** `STREAMER_ANA_TASK.md` — update the checklist when you complete items, so neither agent duplicates work
- Before touching a section, check `STREAMER_ANA_TASK.md` to see if it's claimed

## File Structure (StreamerAnalytics scope)

```
src/pages/StreamerAnalytics/   ← all Streamer Analytics code lives here
  index.jsx
  mocks.js
  utils.js
  useStreamerTwitchLive.js
  README.md
```
Optional cross-page streamer components may use `src/components/streamer/` — prefer colocating splits inside `StreamerAnalytics/` first.

## Tech Stack

- React + Framer Motion (already in use)
- Lucide icons
- Tailwind CSS + retro-theme CSS vars
- No new libraries without checking first

## Don't Do

- Don't add StreamerAnalytics to StickyNav (hidden page, intentional)
- Don't install Twitch API libraries without discussing data strategy first

## If Stuck

Check `STREAMER_ANA_TASK.md` → ask Alex on Telegram → note in INBOX.md

---
*Scoped rules for operator.ink. Last updated: 2026-03-20*
