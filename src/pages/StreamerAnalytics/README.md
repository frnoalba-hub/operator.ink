# Streamer Analytics (page module)

Everything for **`/StreamerAnalytics`** lives **here** — not under `hooks/` or `components/streamer/`.

| File | Role |
|------|------|
| `index.jsx` | Route entry: layout, tabs, panels |
| `mocks.js` | Mock categories, times, titles, hourly templates (no preset title banks) |
| `analyticsProviders.js` | Provider metadata + statuses (Twitch live vs planned/reference sources) |
| `utils.js` | `fmt`, grades, chart styles, `scaleMockToLive` |
| `useStreamerTwitchLive.js` | Helix data via `/api/twitch/*` (Vite → Mission Control) |

Future small UI pieces (e.g. `CategoryCard.jsx`) can be added **in this folder** the same way.
