/** Hour label for chart (0 = midnight). */
function formatHourLabel(h) {
  const p = h >= 12 ? 'p' : 'a';
  const d = h % 12 === 0 ? 12 : h % 12;
  return `${d}${p}`;
}

/**
 * Mock 24h curves: ccv ≈ avg concurrent viewers in category; viewerHours = thousands of viewer-hours
 * in that hour (volume). Real data = snapshots + integration window.
 */
function buildHourlyCurve(peakHour, baseCcv, ampCcv, vhScale) {
  return Array.from({ length: 24 }, (_, h) => {
    const dist = Math.min(Math.abs(h - peakHour), Math.abs(h - peakHour + 24), Math.abs(h - peakHour - 24));
    const ccv = baseCcv + ampCcv * Math.exp(-(dist * dist) / 20);
    const viewerHoursK = (ccv / 1000) * vhScale * (0.65 + 0.2 * Math.sin((h / 24) * Math.PI * 2));
    return {
      hour: h,
      label: formatHourLabel(h),
      ccv: Math.round(ccv),
      viewerHoursK: Math.round(viewerHoursK * 10) / 10,
    };
  });
}

export const MOCK_CATEGORIES = [
  {
    game: 'Hollow Knight',
    viewers: 8200,
    streamers: 18,
    ratio: 456,
    trend: +12,
    note: 'High viewers per stream — easier to get noticed if it fits your content.',
    grade: 'A',
  },
  {
    game: 'Valorant',
    viewers: 185000,
    streamers: 2100,
    ratio: 88,
    trend: -3,
    note: 'Huge audience but very crowded — need strong differentiation.',
    grade: 'B',
  },
  {
    game: 'Just Chatting',
    viewers: 312000,
    streamers: 4200,
    ratio: 74,
    trend: +1,
    note: 'Saturated; ratio is low — many streamers splitting the pie.',
    grade: 'C',
  },
  {
    game: 'Indie Horror (tag aggregate)',
    viewers: 24000,
    streamers: 95,
    ratio: 253,
    trend: +28,
    note: 'Niche with solid demand — good for smaller channels.',
    grade: 'A',
  },
];

export const MOCK_BEST_TIMES = [
  { game: 'Valorant', day: 'Saturday', window: '7 PM – 11 PM UTC', intensity: 'Peak' },
  { game: 'Just Chatting', day: 'Friday', window: '8 PM – 1 AM UTC', intensity: 'Peak' },
  { game: 'Hollow Knight', day: 'Sunday', window: '2 PM – 6 PM UTC', intensity: 'High' },
  { game: 'Indie Horror', day: 'Thursday', window: '9 PM – 12 AM UTC', intensity: 'High' },
];

export const MOCK_TITLE_PATTERNS = [
  'Short hook + game name in first 40 chars',
  '“First play” / “Blind” / “Hard mode” modifiers when true',
  'One clear CTA word: speedrun, chill, ranked, coaching',
];

export const MOCK_TITLE_SUGGESTIONS = [
  'Late-night Hollow Knight — first play, no spoilers pls',
  'Ranked grind | road to Immortal — Valorant',
  'Cozy Just Chatting — career Q&A + channel updates',
];

/** Preset titles by game — instant suggestions, no API. */
export const PRESET_TITLES_BY_GAME = {
  'Hollow Knight': [
    'Late-night Hollow Knight — first play, no spoilers pls',
    'Chill Hollow Knight — blind run, no backseating',
    'Hollow Knight speedrun practice — any%',
    'Cozy Hollow Knight — exploring Hallownest',
    'Hollow Knight 112% — going for full completion',
  ],
  Valorant: [
    'Ranked grind | road to Immortal — Valorant',
    'Unrated chill — learning the ropes',
    'Valorant ranked duo — LFG',
    'Warmup deathmatch — then ranked',
    'Valorant coaching session — VOD review',
  ],
  'Just Chatting': [
    'Cozy Just Chatting — career Q&A + channel updates',
    'Late-night vibes — chill chat',
    'Just Chatting — 24h stream day 1',
    'Q&A + gaming news — drop questions',
    'Chill stream — music + chat',
  ],
  'Indie Horror (tag aggregate)': [
    'Indie horror night — first play, no spoilers',
    'Spooky Sunday — indie horror marathon',
    'Blind playthrough — new indie horror',
    'Chill horror — low-key scares',
    'Indie horror co-op — backseat welcome',
  ],
};

export const MOCK_HOURLY_BY_GAME = {
  Valorant: buildHourlyCurve(21, 78000, 52000, 1.15),
  'Hollow Knight': buildHourlyCurve(15, 1800, 4200, 0.95),
  'Just Chatting': buildHourlyCurve(20, 240000, 95000, 1.25),
  'Indie Horror (tag aggregate)': buildHourlyCurve(22, 8000, 16000, 1.05),
};

export const CHART_GAME_OPTIONS = Object.keys(MOCK_HOURLY_BY_GAME);
