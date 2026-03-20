import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Users,
  Radio,
  Trophy,
  Wand2,
  LineChart as LineChartIcon,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import SEO from '@/components/SEO';
import StickyNav from '@/components/StickyNav';
import GridOverlay from '@/components/GridOverlay';
import BackToHome from '@/components/BackToHome';

const PAGE_TITLE = 'Streamer Analytics — Pick the Best Category to Stream | Operator.ink';
const PAGE_DESC =
  'Compare Twitch categories by viewer demand vs competition, find best times to go live per game, and improve titles. Built for streamers choosing where to stream.';

// ─── Mock: category opportunity (viewer/streamer ratio = demand per live channel) ───

const MOCK_CATEGORIES = [
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

// ─── Mock: when each category peaks (for scheduling) ───

const MOCK_BEST_TIMES = [
  { game: 'Valorant', day: 'Saturday', window: '7 PM – 11 PM UTC', intensity: 'Peak' },
  { game: 'Just Chatting', day: 'Friday', window: '8 PM – 1 AM UTC', intensity: 'Peak' },
  { game: 'Hollow Knight', day: 'Sunday', window: '2 PM – 6 PM UTC', intensity: 'High' },
  { game: 'Indie Horror', day: 'Thursday', window: '9 PM – 12 AM UTC', intensity: 'High' },
];

// ─── Mock: title tools ───

const MOCK_TITLE_PATTERNS = [
  'Short hook + game name in first 40 chars',
  '“First play” / “Blind” / “Hard mode” modifiers when true',
  'One clear CTA word: speedrun, chill, ranked, coaching',
];

const MOCK_TITLE_SUGGESTIONS = [
  'Late-night Hollow Knight — first play, no spoilers pls',
  'Ranked grind | road to Immortal — Valorant',
  'Cozy Just Chatting — career Q&A + channel updates',
];

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

const MOCK_HOURLY_BY_GAME = {
  Valorant: buildHourlyCurve(21, 78000, 52000, 1.15),
  'Hollow Knight': buildHourlyCurve(15, 1800, 4200, 0.95),
  'Just Chatting': buildHourlyCurve(20, 240000, 95000, 1.25),
  'Indie Horror (tag aggregate)': buildHourlyCurve(22, 8000, 16000, 1.05),
};

const CHART_GAME_OPTIONS = Object.keys(MOCK_HOURLY_BY_GAME);

const chartAxisStyle = { fontSize: 11, fill: 'rgba(255,255,255,0.45)' };
const chartTooltipStyle = {
  backgroundColor: 'rgba(15,15,18,0.95)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px',
  fontSize: 12,
};

const TABS = [
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'timing', label: 'Best times', icon: Clock },
  { id: 'titles', label: 'Titles', icon: Sparkles },
];

function fmt(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

function gradeStyle(grade) {
  if (grade === 'A') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
  if (grade === 'B') return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
  return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
}

export default function StreamerAnalytics() {
  const [activeTab, setActiveTab] = useState('categories');
  const [chartGame, setChartGame] = useState('Valorant');
  const hourlyData = MOCK_HOURLY_BY_GAME[chartGame] ?? MOCK_HOURLY_BY_GAME.Valorant;

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} noIndex />
      <div
        className="retro-theme min-h-screen antialiased overflow-x-hidden flex flex-col"
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif",
          background: 'var(--retro-bg)',
        }}
        role="document"
      >
        <GridOverlay />
        <StickyNav currentPage="streameranalytics" />

        <main className="relative z-10 flex-1 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pt-24 pb-16">
          <BackToHome />

          <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Streamer Analytics</h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#9146FF]/10 text-[#9146FF] border border-[#9146FF]/20 px-2 py-0.5 rounded-full">
                  Beta
                </span>
              </div>
              <p className="text-sm text-[var(--retro-text-dim)] leading-relaxed">
                <strong className="text-white/90">Pick a better category to stream in.</strong> Compare viewer demand vs
                how many people are already live, see rough best times per game, then tighten your title. Mock data for
                now — Twitch data hooks next.
              </p>
            </div>

            <nav className="flex rounded-xl border border-white/10 p-1 bg-black/30 flex-shrink-0" aria-label="View tabs">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`tab-${t.id}`}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </motion.header>

          <AnimatePresence mode="wait">
            {activeTab === 'categories' && (
              <motion.div
                key="categories"
                role="tabpanel"
                id="panel-categories"
                aria-labelledby="tab-categories"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>
                    <strong className="text-white/70">Viewer / streamer ratio</strong> — higher ≈ more eyeballs per live
                    channel (simplified; not financial advice).
                  </span>
                </div>

                <div className="grid gap-4">
                  {MOCK_CATEGORIES.map((row, i) => {
                    const up = row.trend >= 0;
                    return (
                      <div
                        key={row.game}
                        className="retro-card rounded-2xl p-5 sm:p-6 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-[var(--retro-bg)] border border-[var(--retro-border)] flex items-center justify-center font-extrabold text-white/80 flex-shrink-0">
                              {i + 1}
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h2 className="text-lg font-bold text-white">{row.game}</h2>
                                <span
                                  className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-md border ${gradeStyle(row.grade)}`}
                                >
                                  {row.grade} opportunity
                                </span>
                              </div>
                              <p className="text-sm text-[var(--retro-text-dim)] leading-snug">{row.note}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-6 text-center lg:text-right">
                            <div>
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)]">Live viewers</p>
                              <p className="font-extrabold text-lg flex items-center justify-center lg:justify-end gap-1">
                                <Users className="w-4 h-4 text-[var(--retro-text-dim)] opacity-70" />
                                {fmt(row.viewers)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)]">Channels live</p>
                              <p className="font-extrabold text-lg flex items-center justify-center lg:justify-end gap-1">
                                <Radio className="w-4 h-4 text-[var(--retro-text-dim)] opacity-70" />
                                {fmt(row.streamers)}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)]">Ratio</p>
                              <p className="font-extrabold text-lg text-cyan-400">{row.ratio}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)]">Trend</p>
                              <p
                                className={`font-bold text-sm flex items-center justify-center lg:justify-end gap-0.5 ${
                                  up ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                              >
                                {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {Math.abs(row.trend)}% (mock)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'timing' && (
              <motion.div
                key="timing"
                role="tabpanel"
                id="panel-timing"
                aria-labelledby="tab-timing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <p className="text-sm text-[var(--retro-text-dim)] max-w-3xl">
                  <strong className="text-white/80">When to go live in each category</strong> — rough windows from mock
                  aggregates. Real version needs historical snapshots (see product spec).
                </p>

                <div className="retro-card rounded-2xl p-6 border border-[var(--retro-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" /> Suggested windows (mock)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {MOCK_BEST_TIMES.map((bt) => (
                      <div
                        key={`${bt.game}-${bt.day}`}
                        className="flex items-center gap-4 p-4 rounded-xl bg-[var(--retro-bg)] border border-[var(--retro-border)]"
                      >
                        <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20 flex-shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white">{bt.game}</p>
                          <p className="text-sm text-[var(--retro-text-dim)]">
                            {bt.day} · {bt.window}
                          </p>
                        </div>
                        <span className="text-[10px] uppercase font-extrabold text-emerald-400/90 flex-shrink-0">
                          {bt.intensity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="retro-card rounded-2xl p-5 sm:p-6 border border-[var(--retro-border)]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                      <LineChartIcon className="w-4 h-4 text-cyan-400" /> 24h curve (mock)
                    </h3>
                    <label className="flex items-center gap-2 text-sm text-[var(--retro-text-dim)]">
                      <span className="text-[10px] uppercase font-bold tracking-wider">Category</span>
                      <select
                        value={chartGame}
                        onChange={(e) => setChartGame(e.target.value)}
                        className="rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/40"
                      >
                        {CHART_GAME_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <p className="text-xs text-[var(--retro-text-dim)] mb-4 max-w-3xl">
                    <span className="text-cyan-400 font-semibold">Teal</span> = avg concurrent viewers in the category
                    (how busy the directory is). <span className="text-violet-400 font-semibold">Violet</span> = viewer-hours
                    in that hour (thousands) — total watch volume, good for spotting “heavy” slots.
                  </p>
                  <div className="w-full h-[min(360px,55vh)] min-h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hourlyData} margin={{ top: 8, right: 12, left: 4, bottom: 4 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                          dataKey="label"
                          interval={2}
                          tick={chartAxisStyle}
                          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                          tickLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                        />
                        <YAxis
                          yAxisId="ccv"
                          tickFormatter={(v) => fmt(v)}
                          tick={chartAxisStyle}
                          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                          tickLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                          label={{
                            value: 'Concurrent viewers',
                            angle: -90,
                            position: 'insideLeft',
                            style: { fill: 'rgba(0,204,255,0.7)', fontSize: 10 },
                          }}
                        />
                        <YAxis
                          yAxisId="vh"
                          orientation="right"
                          tickFormatter={(v) => `${v}k`}
                          tick={chartAxisStyle}
                          axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                          tickLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                          label={{
                            value: 'Viewer-hours (k)',
                            angle: 90,
                            position: 'insideRight',
                            style: { fill: 'rgba(167,139,250,0.85)', fontSize: 10 },
                          }}
                        />
                        <Tooltip
                          contentStyle={chartTooltipStyle}
                          labelStyle={{ color: 'rgba(255,255,255,0.85)' }}
                          formatter={(value, name) => {
                            if (name === 'Avg concurrent viewers') return [fmt(value), name];
                            if (name === 'Viewer-hours (k)') return [`${value}k`, name];
                            return [value, name];
                          }}
                          labelFormatter={(_, p) => (p?.[0]?.payload ? `Hour ${p[0].payload.label}` : '')}
                        />
                        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                        <Line
                          yAxisId="ccv"
                          type="monotone"
                          dataKey="ccv"
                          name="Avg concurrent viewers"
                          stroke="#00ccff"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                        <Line
                          yAxisId="vh"
                          type="monotone"
                          dataKey="viewerHoursK"
                          name="Viewer-hours (k)"
                          stroke="#a78bfa"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-3 text-[10px] text-white/35">
                    Heatmap day × hour can stack on this later; data from Helix + stored snapshots when wired.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'titles' && (
              <motion.div
                key="titles"
                role="tabpanel"
                id="panel-titles"
                aria-labelledby="tab-titles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <div className="retro-card rounded-2xl p-6 border border-[var(--retro-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Best title patterns
                  </h3>
                  <p className="text-sm text-[var(--retro-text-dim)] mb-4">
                    Learn from high-performing streams in a category — patterns only, not copying verbatim.
                  </p>
                  <ul className="space-y-2">
                    {MOCK_TITLE_PATTERNS.map((p) => (
                      <li key={p} className="text-sm text-white/85 flex gap-2">
                        <span className="text-cyan-400 flex-shrink-0">→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="retro-card rounded-2xl p-6 border border-[var(--retro-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-violet-400" /> Gen (mock)
                  </h3>
                  <p className="text-sm text-[var(--retro-text-dim)] mb-4">
                    Describe your stream; get editable suggestions. Wire to LLM later; respect platform ToS.
                  </p>
                  <label htmlFor="title-prompt" className="sr-only">
                    Stream description for title ideas
                  </label>
                  <textarea
                    id="title-prompt"
                    rows={3}
                    className="w-full rounded-xl bg-black/30 border border-white/10 p-3 text-sm text-white/90 mb-4 resize-none focus:outline-none focus:border-cyan-500/40"
                    placeholder="e.g. Hollow Knight first play, chill, no backseating"
                  />
                  <p className="text-[10px] uppercase font-bold text-white/40 mb-2">Example outputs</p>
                  <ul className="space-y-2">
                    {MOCK_TITLE_SUGGESTIONS.map((s) => (
                      <li
                        key={s}
                        className="text-sm p-3 rounded-lg bg-white/[0.04] border border-white/10 text-white/90"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-10 text-xs text-white/30">
            Built for streamers choosing a category and schedule — mock data. Helix + snapshots per product spec.
          </p>
        </main>
      </div>
    </>
  );
}
