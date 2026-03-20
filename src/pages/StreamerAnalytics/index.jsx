import React, { useState, useEffect, useMemo } from 'react';
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
  RefreshCw,
  Database,
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

import {
  MOCK_CATEGORIES,
  MOCK_BEST_TIMES,
  MOCK_TITLE_PATTERNS,
  MOCK_TITLE_SUGGESTIONS,
  MOCK_HOURLY_BY_GAME,
  CHART_GAME_OPTIONS,
} from './mocks';
import { fmt, gradeStyle, gradeFromRatio, scaleMockToLive, chartAxisStyle, chartTooltipStyle } from './utils';
import { useStreamerTwitchLive, TWITCH_BATCH_MAX_PAGES } from './useStreamerTwitchLive';

const PAGE_TITLE = 'Streamer Analytics — Pick the Best Category to Stream | Operator.ink';
const PAGE_DESC =
  'Compare Twitch categories by viewer demand vs competition, find best times to go live per game, and improve titles. Built for streamers choosing where to stream.';

const TABS = [
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'timing', label: 'Best times', icon: Clock },
  { id: 'titles', label: 'Titles', icon: Sparkles },
];

export default function StreamerAnalytics() {
  const [activeTab, setActiveTab] = useState('categories');
  const [chartGame, setChartGame] = useState('Valorant');
  const [chartGameId, setChartGameId] = useState(null);

  const { phase, categories, batchErrors, fetchedAt, loadError, refetch } = useStreamerTwitchLive();

  /** Chart uses Helix-backed categories only when we have rows (avoids empty select). */
  const chartIsLive = phase === 'live' && categories.length > 0;

  useEffect(() => {
    if (phase !== 'live' || !categories.length) {
      return;
    }
    setChartGameId((prev) => {
      if (prev && categories.some((c) => c.gameId === prev)) {
        return prev;
      }
      const sorted = [...categories].sort((a, b) => b.viewerSum - a.viewerSum);
      return sorted[0]?.gameId ?? null;
    });
  }, [phase, categories]);

  const liveCategoryRows = useMemo(() => {
    if (phase !== 'live' || !categories.length) {
      return [];
    }
    const sorted = [...categories].sort((a, b) => b.viewerSum - a.viewerSum);
    return sorted.map((c) => ({
      key: c.gameId,
      game: c.gameName || c.gameId,
      gameId: c.gameId,
      viewers: c.viewerSum,
      streamers: c.streamCount,
      ratio: c.ratio,
      grade: gradeFromRatio(c.ratio),
      live: true,
      pagesFetched: c.pagesFetched,
      note:
        'Live Helix sample: total viewers ÷ channels live (paginated; big categories may be partial — increase maxPages on server later).',
    }));
  }, [phase, categories]);

  const hourlyData = useMemo(() => {
    if (chartIsLive && chartGameId) {
      const cat = categories.find((c) => c.gameId === chartGameId);
      const template =
        (cat?.gameName && MOCK_HOURLY_BY_GAME[cat.gameName]) || MOCK_HOURLY_BY_GAME.Valorant;
      if (cat?.viewerSum) {
        return scaleMockToLive(template, cat.viewerSum);
      }
      return template;
    }
    return MOCK_HOURLY_BY_GAME[chartGame] ?? MOCK_HOURLY_BY_GAME.Valorant;
  }, [chartIsLive, chartGameId, chartGame, categories]);

  const categoryRows = liveCategoryRows.length ? liveCategoryRows : null;

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
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Streamer Analytics</h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#9146FF]/10 text-[#9146FF] border border-[#9146FF]/20 px-2 py-0.5 rounded-full">
                  Beta
                </span>
                {phase === 'live' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Database className="w-3 h-3" /> Live Helix
                  </span>
                )}
                {phase === 'mock' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-white/5 text-white/50 border border-white/10 px-2 py-0.5 rounded-full">
                    Mock fallback
                  </span>
                )}
                {phase === 'loading' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Loading…</span>
                )}
              </div>
              <p className="text-sm text-[var(--retro-text-dim)] leading-relaxed">
                <strong className="text-white/90">Pick a better category to stream in.</strong> Compare viewer demand vs
                how many people are already live, then tune schedule and titles.{' '}
                {phase === 'live' ? (
                  <>
                    Categories below use <strong className="text-white/80">live Twitch data</strong> via Mission Control (
                    <code className="text-cyan-400/90 text-xs">/api/twitch/*</code>, app token). 24h curve shape is still
                    illustrative — scaled to current totals until we store hourly snapshots.
                  </>
                ) : (
                  <>
                    <strong className="text-white/70">Mock data</strong> — start Mission Control API (
                    <code className="text-cyan-400/90 text-xs">8787</code>) with{' '}
                    <code className="text-white/50 text-xs">TWITCH_CLIENT_ID</code> /{' '}
                    <code className="text-white/50 text-xs">TWITCH_CLIENT_SECRET</code> in workspace secrets{' '}
                    <code className="text-white/50 text-xs">.env</code>, run Vite dev (proxy to MC).
                  </>
                )}
              </p>
              {loadError && (
                <p className="mt-2 text-xs text-amber-400/90">
                  Twitch load failed — showing mock. {loadError}
                </p>
              )}
              {phase === 'live' && fetchedAt && (
                <p className="mt-1 text-[10px] text-white/35">Last fetch: {new Date(fetchedAt).toLocaleString()}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => refetch()}
                disabled={phase === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/5 disabled:opacity-40"
              >
                <RefreshCw className={`w-4 h-4 ${phase === 'loading' ? 'animate-spin' : ''}`} />
                Refresh data
              </button>
              <nav className="flex rounded-xl border border-white/10 p-1 bg-black/30" aria-label="View tabs">
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
            </div>
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
                <div className="flex flex-col gap-2 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white/70">Viewer / streamer ratio</strong> — higher ≈ more eyeballs per live
                      channel in our sample (not financial advice).
                    </span>
                  </div>
                  {batchErrors?.length > 0 && (
                    <p className="text-amber-400/90 pl-6">
                      Some categories failed to load ({batchErrors.length}). Check Mission Control logs.
                    </p>
                  )}
                </div>

                {phase === 'loading' && !categoryRows?.length && (
                  <div className="retro-card rounded-2xl p-12 border border-[var(--retro-border)] text-center text-white/50">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-cyan-400/80" />
                    Fetching Twitch top games + live streams…
                  </div>
                )}

                <div className="grid gap-4">
                  {(categoryRows ||
                    MOCK_CATEGORIES.map((row) => ({ ...row, key: row.game, live: false }))).map((row, i) => {
                    const up = row.trend >= 0;
                    const rowKey = row.key || row.game;
                    return (
                      <div
                        key={rowKey}
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
                                {row.live && (
                                  <span className="text-[10px] uppercase font-bold text-emerald-400/90">Helix</span>
                                )}
                              </div>
                              <p className="text-sm text-[var(--retro-text-dim)] leading-snug">{row.note}</p>
                              {row.live && row.pagesFetched != null && (
                                <p className="text-[10px] text-white/35 mt-1">
                                  Streams API pages scanned: {row.pagesFetched} (max {TWITCH_BATCH_MAX_PAGES} per category
                                  in this build)
                                </p>
                              )}
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
                              {row.live ? (
                                <p className="font-bold text-sm text-cyan-400/90 flex items-center justify-center lg:justify-end">
                                  Live
                                </p>
                              ) : (
                                <p
                                  className={`font-bold text-sm flex items-center justify-center lg:justify-end gap-0.5 ${
                                    up ? 'text-emerald-400' : 'text-rose-400'
                                  }`}
                                >
                                  {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                  {Math.abs(row.trend)}% (mock)
                                </p>
                              )}
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
                  <strong className="text-white/80">When to go live in each category</strong> — suggested windows below are
                  still mock. The chart uses an <strong className="text-white/70">illustrative 24h shape</strong>; when Live
                  Helix is on, it’s <strong className="text-white/70">scaled to current viewer totals</strong> for the
                  selected game. True hour-by-hour needs stored snapshots (next backend step).
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
                      <LineChartIcon className="w-4 h-4 text-cyan-400" /> 24h curve{' '}
                      {chartIsLive ? '(shape + live scale)' : '(mock)'}
                    </h3>
                    <label className="flex items-center gap-2 text-sm text-[var(--retro-text-dim)]">
                      <span className="text-[10px] uppercase font-bold tracking-wider">Category</span>
                      <select
                        value={chartIsLive && chartGameId ? chartGameId : chartGame}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (chartIsLive) {
                            setChartGameId(v);
                          } else {
                            setChartGame(v);
                          }
                        }}
                        className="rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/40"
                      >
                        {chartIsLive
                          ? [...categories]
                              .sort((a, b) => b.viewerSum - a.viewerSum)
                              .map((c) => (
                                <option key={c.gameId} value={c.gameId}>
                                  {c.gameName || c.gameId}
                                </option>
                              ))
                          : CHART_GAME_OPTIONS.map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                      </select>
                    </label>
                  </div>
                  <p className="text-xs text-[var(--retro-text-dim)] mb-4 max-w-3xl">
                    <span className="text-cyan-400 font-semibold">Teal</span> = concurrent viewers (category activity).{' '}
                    <span className="text-violet-400 font-semibold">Violet</span> = viewer-hours (k) — watch volume.{' '}
                    {chartIsLive ? (
                      <span className="text-white/45">
                        Curve shape is template-based; magnitudes match current Helix totals for the selected game.
                      </span>
                    ) : (
                      <span>Fully mock until Twitch proxy + credentials are configured.</span>
                    )}
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
            Streamer Analytics — live categories via Mission Control <code className="text-white/40">/api/twitch/*</code>;
            hourly history = snapshots (planned).
          </p>
        </main>
      </div>
    </>
  );
}
