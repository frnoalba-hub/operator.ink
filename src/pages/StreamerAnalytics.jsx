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
} from 'lucide-react';
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

                <div className="rounded-xl border border-dashed border-white/20 p-8 text-center text-sm text-white/40">
                  Heatmap by hour × day-of-week (per category) — placeholder for v2.
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
