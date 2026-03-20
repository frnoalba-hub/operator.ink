import { useState, useEffect, useCallback } from 'react';

/** Top categories to pull from /games/top */
const FEAT_FIRST = 24;
/** Pages of /streams per category (100 streams/page max) — balance accuracy vs Helix usage */
export const TWITCH_BATCH_MAX_PAGES = 5;

function apiPrefix() {
  return import.meta.env.VITE_TWITCH_API_BASE || '';
}

/**
 * Safe JSON parse; empty or non-JSON body → structured error (UI decides how loud to be).
 * Checks HTTP status first so we don’t mislabel HTML error pages as “empty”.
 */
async function safeJsonResponse(res) {
  const text = await res.text();
  const trimmed = text?.trim() ?? '';
  if (!trimmed) {
    return {
      ok: false,
      error:
        res.ok === false
          ? `Twitch API returned no body (HTTP ${res.status}). Mission Control may be down or the proxy target wrong.`
          : 'Empty response from /api/twitch — is Mission Control running on port 8787?',
    };
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return {
      ok: false,
      error: `Expected JSON from Twitch API but got ${res.ok ? 'non-JSON' : `HTTP ${res.status}`} (often HTML from the dev server when the route isn’t the API).`,
    };
  }
}

/**
 * Why we’re on sample data (only set when phase === 'mock').
 * - needs_twitch_env: MC reachable, TWITCH_* not set in workspace .env
 * - mc_unreachable: could not get /api/twitch/status (MC off, proxy, or wrong base URL)
 * - helix_failed: creds OK but featured/batch failed (Twitch API error, rate limit, etc.)
 */
export const MOCK_REASON = /** @type {const} */ ({
  NEEDS_TWITCH_ENV: 'needs_twitch_env',
  MC_UNREACHABLE: 'mc_unreachable',
  HELIX_FAILED: 'helix_failed',
});

/**
 * Live Twitch aggregates for Streamer Analytics (Helix via Mission Control proxy).
 */
export function useStreamerTwitchLive() {
  const [phase, setPhase] = useState('loading');
  const [configured, setConfigured] = useState(false);
  const [mockReason, setMockReason] = useState(/** @type {string | null} */ (null));
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [batchErrors, setBatchErrors] = useState([]);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const load = useCallback(async () => {
    const prefix = apiPrefix();
    setPhase('loading');
    setLoadError(null);
    setMockReason(null);
    /** Past /status with configured:true — failures after this are Twitch/Helix, not “MC down”. */
    let pastStatusReady = false;
    try {
      const stRes = await fetch(`${prefix}/api/twitch/status`);
      const st = await safeJsonResponse(stRes);
      if (!st || st.error) {
        throw new Error(st?.error || 'Could not reach Twitch API');
      }
      if (!st.configured) {
        setConfigured(false);
        setMockReason(MOCK_REASON.NEEDS_TWITCH_ENV);
        setGames([]);
        setCategories([]);
        setBatchErrors([]);
        setFetchedAt(null);
        setPhase('mock');
        return;
      }
      setConfigured(true);
      pastStatusReady = true;

      const featRes = await fetch(`${prefix}/api/twitch/featured?first=${FEAT_FIRST}`);
      const feat = await safeJsonResponse(featRes);
      if (!feat || feat.error || !feat.ok) {
        throw new Error(feat?.error || 'Featured games request failed');
      }

      const batchRes = await fetch(`${prefix}/api/twitch/batch-summaries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          games: feat.games.map((g) => ({ id: g.id, name: g.name })),
          maxPages: TWITCH_BATCH_MAX_PAGES,
        }),
      });
      const batch = await safeJsonResponse(batchRes);
      if (!batch || batch.error || !batch.ok) {
        throw new Error(batch?.error || 'Batch summaries failed');
      }

      setGames(feat.games);
      setCategories(batch.categories || []);
      setBatchErrors(batch.errors || []);
      setFetchedAt(batch.fetchedAt || null);
      setMockReason(null);
      setPhase('live');
    } catch (e) {
      const msg = String(e?.message || e);
      setLoadError(msg);
      setConfigured(false);
      setMockReason(pastStatusReady ? MOCK_REASON.HELIX_FAILED : MOCK_REASON.MC_UNREACHABLE);
      setPhase('mock');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    phase,
    configured,
    mockReason,
    games,
    categories,
    batchErrors,
    fetchedAt,
    loadError,
    refetch: load,
  };
}
