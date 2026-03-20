/**
 * Streamer Analytics — analytics / directory providers (metadata only; no fabricated metrics).
 * Used to document how live Twitch (Helix) can be combined with other sources later.
 */

/** @typedef {'live' | 'sample' | 'planned' | 'reference'} ProviderUiStatus */

/**
 * @type {Array<{
 *   id: string;
 *   name: string;
 *   blurb: string;
 *   defaultStatus: ProviderUiStatus;
 *   docsUrl?: string;
 * }>}
 */
export const ANALYTICS_PROVIDERS = [
  {
    id: 'twitch_helix',
    name: 'Twitch (Helix)',
    blurb:
      'Categories, concurrent viewers, and live channel counts via Mission Control /api/twitch/* (app access token). This page uses Helix as the primary live signal.',
    defaultStatus: 'sample',
    docsUrl: 'https://dev.twitch.tv/docs/api/reference',
  },
  {
    id: 'youtube',
    name: 'YouTube (Data / Analytics)',
    blurb:
      'Different discovery model than Twitch directories. Useful for cross-platform reach and VOD/search signals; requires OAuth, quotas, and your own normalization.',
    defaultStatus: 'planned',
    docsUrl: 'https://developers.google.com/youtube/v3',
  },
  {
    id: 'kick',
    name: 'Kick',
    blurb:
      'Public APIs and category mapping are still maturing. Treat as a separate index until you have a stable server-side integration.',
    defaultStatus: 'planned',
    docsUrl: 'https://docs.kick.com/',
  },
  {
    id: 'indexes',
    name: 'Third-party indexes',
    blurb:
      'Stream Charts, SullyGnome, TwitchTracker, etc. — good for research and benchmarks. Respect ToS; data may lag; combine with Helix as source of truth for “right now”.',
    defaultStatus: 'reference',
  },
];

/**
 * @param {{ phase: string }} opts
 * @returns {Record<string, ProviderUiStatus>}
 */
export function resolveProviderStatus({ phase }) {
  return {
    twitch_helix: phase === 'live' ? 'live' : 'sample',
    youtube: 'planned',
    kick: 'planned',
    indexes: 'reference',
  };
}

export const STATUS_LABEL = {
  live: 'Live',
  sample: 'Sample / offline',
  planned: 'Planned',
  reference: 'Reference',
};

export const STATUS_STYLE = {
  live: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300',
  sample: 'border-zinc-500/30 bg-zinc-500/5 text-zinc-400',
  planned: 'border-amber-500/30 bg-amber-500/5 text-amber-200/90',
  reference: 'border-violet-500/30 bg-violet-500/5 text-violet-200/90',
};
