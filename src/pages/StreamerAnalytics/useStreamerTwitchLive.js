import { useState, useEffect, useCallback } from 'react';

/** Top categories to pull from /games/top */
const FEAT_FIRST = 24;
/** Pages of /streams per category (100 streams/page max) — balance accuracy vs Helix usage */
export const TWITCH_BATCH_MAX_PAGES = 5;

function apiPrefix() {
  return import.meta.env.VITE_TWITCH_API_BASE || '';
}

/**
 * Live Twitch aggregates for Streamer Analytics (Helix via Mission Control proxy).
 */
export function useStreamerTwitchLive() {
  const [phase, setPhase] = useState('loading');
  const [configured, setConfigured] = useState(false);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [batchErrors, setBatchErrors] = useState([]);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const load = useCallback(async () => {
    const prefix = apiPrefix();
    setPhase('loading');
    setLoadError(null);
    try {
      const stRes = await fetch(`${prefix}/api/twitch/status`);
      const st = await stRes.json();
      if (!st.configured) {
        setConfigured(false);
        setGames([]);
        setCategories([]);
        setBatchErrors([]);
        setFetchedAt(null);
        setPhase('mock');
        return;
      }
      setConfigured(true);

      const featRes = await fetch(`${prefix}/api/twitch/featured?first=${FEAT_FIRST}`);
      const feat = await featRes.json();
      if (!feat.ok) {
        throw new Error(feat.error || 'Featured games request failed');
      }

      const batchRes = await fetch(`${prefix}/api/twitch/batch-summaries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          games: feat.games.map((g) => ({ id: g.id, name: g.name })),
          maxPages: TWITCH_BATCH_MAX_PAGES,
        }),
      });
      const batch = await batchRes.json();
      if (!batch.ok) {
        throw new Error(batch.error || 'Batch summaries failed');
      }

      setGames(feat.games);
      setCategories(batch.categories || []);
      setBatchErrors(batch.errors || []);
      setFetchedAt(batch.fetchedAt || null);
      setPhase('live');
    } catch (e) {
      setLoadError(String(e?.message || e));
      setConfigured(false);
      setPhase('mock');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    phase,
    configured,
    games,
    categories,
    batchErrors,
    fetchedAt,
    loadError,
    refetch: load,
  };
}
