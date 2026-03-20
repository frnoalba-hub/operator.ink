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
  ExternalLink,
  Link2,
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
import {
  ANALYTICS_PROVIDERS,
  resolveProviderStatus,
  STATUS_LABEL,
  STATUS_STYLE,
} from './analyticsProviders';
import { fmt, gradeStyle, gradeFromRatio, scaleMockToLive, chartAxisStyle, chartTooltipStyle } from './utils';
import { useStreamerTwitchLive, TWITCH_BATCH_MAX_PAGES } from './useStreamerTwitchLive';

const PAGE_TITLE = 'Streamer Analytics — Pick the Best Category to Stream | Operator.ink';
const PAGE_DESC =
  'Compare Twitch categories by viewer demand vs competition, plan stream times, and improve titles.';

const TABS = [
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'timing', label: 'Best times', icon: Clock },
  { id: 'titles', label: 'Titles', icon: Sparkles },
];

export default function StreamerAnalytics() {
  /** Internal setup (paths, env, raw errors, roadmap cards) — dev / local only, not public builds. */
  const showDevInternals = import.meta.env.DEV;

  const [activeTab, setActiveTab] = useState('categories');
  const [chartGame, setChartGame] = useState('Valorant');
  const [chartGameId, setChartGameId] = useState(null);

  const { phase, categories, batchErrors, fetchedAt, loadError, refetch } = useStreamerTwitchLive();

  const providerStatusById = useMemo(() => resolveProviderStatus({ phase }), [phase]);

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
      note: showDevInternals
        ? 'Live Helix: total viewers ÷ channels live in this category (paginated sample). Higher ratio often means more viewers per stream.'
        : 'Live Twitch: total viewers ÷ channels live in this category (sample). Higher ratio often means more viewers per stream.',
    }));
  }, [phase, categories, showDevInternals]);

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
        className="bg-black text-zinc-300 min-h-screen antialiased overflow-x-hidden flex flex-col selection:bg-cyan-500/30 selection:text-cyan-50"
        role="document"
      >
        <GridOverlay />
        <StickyNav currentPage="streameranalytics" />

        {/* Ambient Dark Gradients for sleek color touches */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>

        <main className="relative z-10 flex-1 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pt-28 pb-20">
          <BackToHome />

          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12"
          >
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  Streamer Analytics
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  Beta
                </span>
                {phase === 'live' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <Database className="w-3 h-3" /> {showDevInternals ? 'Live Helix' : 'Live Twitch'}
                  </span>
                )}
                {phase === 'mock' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-white/5 text-zinc-400 border border-white/10 px-3 py-1 rounded-full">
                    Sample data
                  </span>
                )}
                {phase === 'loading' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-1.5 px-2 py-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Loading…
                  </span>
                )}
              </div>
              <p className="text-base lg:text-lg text-zinc-400 leading-relaxed font-light">
                <strong className="text-white font-medium">Pick a better category to stream in.</strong> Compare viewer
                demand vs how many people are already live, then tune schedule and titles.{' '}
                {phase === 'live' ? (
                  showDevInternals ? (
                    <>
                      Categories use <strong className="text-white font-medium">live Twitch Helix</strong> via Mission
                      Control. The <strong className="text-white font-medium">Data sources</strong> section is a dev roadmap
                      for combining other analytics server-side. The 24h curve is still a template scaled to live totals
                      until hourly snapshots exist.
                    </>
                  ) : (
                    <>
                      Categories below use <strong className="text-white font-medium">live Twitch data</strong>. The 24h
                      chart is a simplified shape scaled to current totals — not full historical hour-by-hour data yet.
                    </>
                  )
                ) : showDevInternals ? (
                  <>
                    You’re seeing <strong className="text-white font-medium">sample categories</strong> for local testing.
                    Connect Mission Control + Twitch credentials (see internal docs) to load live data.
                  </>
                ) : (
                  <>
                    You’re seeing <strong className="text-white font-medium">sample categories</strong> so you can explore
                    the tool. <strong className="text-white font-medium">Live Twitch categories</strong> will show here when
                    the service is connected.
                  </>
                )}
              </p>

              {loadError && showDevInternals && (
                <p className="mt-4 text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg inline-block break-words">
                  Detail: {loadError}
                </p>
              )}
              {phase === 'live' && fetchedAt && (
                <p className="mt-4 text-[11px] text-zinc-500 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Last fetch: {new Date(fetchedAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-shrink-0">
              <button
                type="button"
                onClick={() => refetch()}
                disabled={phase === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-40 shadow-xl"
              >
                <RefreshCw className={`w-4 h-4 text-cyan-400 ${phase === 'loading' ? 'animate-spin' : ''}`} />
                Refresh data
              </button>
              <nav className="flex rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-1.5 shadow-xl" aria-label="View tabs">
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
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-white/10 text-white shadow-sm ring-1 ring-white/10'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-cyan-400' : ''}`} />
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col gap-3 text-xs text-zinc-400 max-w-4xl bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-cyan-400 flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    <span className="leading-relaxed">
                      <strong className="text-white/90">Viewer / streamer ratio</strong> — Higher usually means more
                      eyeballs per live channel in that category (easier to get noticed if the game fits you). Not
                      financial advice; Twitch numbers are a snapshot.
                    </span>
                  </div>
                  {batchErrors?.length > 0 && (
                    <p className="text-amber-400/90 text-sm pl-8 mt-1">
                      Couldn’t load {batchErrors.length} categor{batchErrors.length === 1 ? 'y' : 'ies'}. Try{' '}
                      <strong className="text-zinc-300">Refresh data</strong>
                      {showDevInternals ? ' or reduce batch size in Mission Control.' : '.'}
                    </p>
                  )}
                </div>

                {showDevInternals && (
                  <div className="rounded-[24px] p-6 lg:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    <div className="flex items-start gap-4 mb-6">
                      <Link2 className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" aria-hidden />
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                          Data sources &amp; combining <span className="text-zinc-500 normal-case">(dev only)</span>
                        </h2>
                        <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-4xl">
                          This page does <strong className="text-zinc-200 font-medium">not</strong> invent extra provider
                          metrics. Twitch Helix is the only live pipeline wired here. The cards below are the roadmap:
                          normalize each provider on the server, then merge (e.g. weighted index, cross-platform tags, or
                          “confirm with Helix” for anything live).
                        </p>
                      </div>
                    </div>
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {ANALYTICS_PROVIDERS.map((p) => {
                        const st = providerStatusById[p.id] || p.defaultStatus;
                        return (
                          <li
                            key={p.id}
                            className={`rounded-2xl border px-5 py-4 text-left transition-colors bg-white/[0.02] hover:bg-white/[0.04] ${STATUS_STYLE[st] || STATUS_STYLE.sample}`}
                          >
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <span className="text-base font-bold text-white tracking-tight">{p.name}</span>
                              <span className="text-[10px] uppercase font-black tracking-widest opacity-90 border px-2 py-0.5 rounded-md text-inherit border-current bg-current/10">
                                {STATUS_LABEL[st]}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-3">{p.blurb}</p>
                            {p.docsUrl && (
                              <a
                                href={p.docsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-cyan-400/90 hover:text-cyan-300 transition-colors"
                              >
                                Docs <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {phase === 'loading' && !categoryRows?.length && (
                  <div className="rounded-3xl p-16 border border-white/5 bg-white/[0.02] backdrop-blur-xl text-center text-zinc-500 flex flex-col items-center justify-center min-h-[400px]">
                    <RefreshCw className="w-8 h-8 animate-spin mb-4 text-cyan-400/80" />
                    <p className="text-sm font-medium text-zinc-400">Loading categories…</p>
                  </div>
                )}

                <div className="grid gap-5">
                  {(categoryRows ||
                    MOCK_CATEGORIES.map((row) => ({ ...row, key: row.game, live: false }))).map((row, i) => {
                    const up = row.trend >= 0;
                    const rowKey = row.key || row.game;
                    return (
                      <div
                        key={rowKey}
                        className="rounded-[24px] p-6 lg:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-zinc-800/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)] group"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                          
                          <div className="flex items-start gap-5 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-white text-lg flex-shrink-0 shadow-inner">
                              {i + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{row.game}</h2>
                                <span
                                  className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-lg border ${gradeStyle(row.grade)}`}
                                >
                                  {row.grade} Target
                                </span>
                                {row.live && (
                                  <span className="text-[10px] uppercase font-bold text-emerald-400 border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                    Live
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl">{row.note}</p>
                              {row.live && row.pagesFetched != null && (
                                <p className="text-[10px] text-zinc-500 font-mono mt-3 uppercase tracking-wider flex items-center gap-2">
                                  {showDevInternals ? 'Helix' : 'API'} pages: {row.pagesFetched} / {TWITCH_BATCH_MAX_PAGES}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 text-left lg:text-right">
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 flex items-center lg:justify-end gap-1.5"><Users className="w-3.5 h-3.5"/> Viewers</p>
                              <p className="font-bold text-xl text-white tracking-tight drop-shadow-sm">{fmt(row.viewers)}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 flex items-center lg:justify-end gap-1.5"><Radio className="w-3.5 h-3.5"/> Broadcasters</p>
                              <p className="font-bold text-xl text-white tracking-tight drop-shadow-sm">{fmt(row.streamers)}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Ratio</p>
                              <p className="font-bold text-xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">{row.ratio}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Trend</p>
                              {row.live ? (
                                <p className="font-bold text-[15px] text-cyan-400/90 pt-1 lg:justify-end flex">
                                  Streaming
                                </p>
                              ) : (
                                <p
                                  className={`font-bold text-[15px] pt-1 flex items-center lg:justify-end gap-1 ${
                                    up ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.3)]' : 'text-rose-400 drop-shadow-[0_0_5px_rgba(251,113,133,0.3)]'
                                  }`}
                                >
                                  {up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                  {Math.abs(row.trend)}%
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 backdrop-blur-sm max-w-4xl">
                  <p className="text-sm font-light text-zinc-300 leading-relaxed border-l-2 border-amber-400/50 pl-4">
                    <strong className="text-white font-medium">When to go live.</strong> Suggested windows below are still
                    mock. The chart uses a rough 24h shape; with{' '}
                    {showDevInternals ? 'live Helix' : 'live Twitch data'} it scales to current viewer totals for the game
                    you pick. Real heatmaps need saved hourly data later.
                  </p>
                </div>

                <div className="rounded-[24px] p-6 lg:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" /> Suggested windows (mock)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_BEST_TIMES.map((bt) => (
                      <div
                        key={`${bt.game}-${bt.day}`}
                        className="flex items-center gap-5 p-5 rounded-[16px] bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20 group-hover:scale-110 transition-transform">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-base mb-1">{bt.game}</p>
                          <p className="text-xs text-zinc-400">
                            {bt.day} <span className="mx-1 text-zinc-600">•</span> {bt.window}
                          </p>
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 px-2.5 py-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                          {bt.intensity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] p-6 lg:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3 flex items-center gap-3">
                        <LineChartIcon className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" /> 24h activity (illustrative curve)
                      </h3>
                      <p className="text-xs text-zinc-400 font-light max-w-xl">
                        <span className="text-cyan-400 font-semibold drop-shadow-sm">Teal series</span> denotes concurrent scales. <span className="text-violet-400 font-semibold drop-shadow-sm">Violet series</span> maps retention volume.
                      </p>
                    </div>
                    <label className="flex flex-col gap-2 shrink-0">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Category</span>
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
                        className="rounded-xl bg-black/50 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
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
                  
                  <div className="w-full h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hourlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                        <XAxis
                          dataKey="label"
                          interval={2}
                          tick={chartAxisStyle}
                          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          dy={10}
                        />
                        <YAxis
                          yAxisId="ccv"
                          tickFormatter={(v) => fmt(v)}
                          tick={chartAxisStyle}
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                        />
                        <YAxis
                          yAxisId="vh"
                          orientation="right"
                          tickFormatter={(v) => `${v}k`}
                          tick={chartAxisStyle}
                          axisLine={false}
                          tickLine={false}
                          dx={10}
                        />
                        <Tooltip
                          contentStyle={chartTooltipStyle}
                          labelStyle={{ color: 'rgba(255,255,255,0.8)', fontWeight: 'bold' }}
                          formatter={(value, name) => {
                            if (name === 'Avg concurrent viewers') return [fmt(value), 'Active Viewers'];
                            if (name === 'Viewer-hours (k)') return [`${value}k`, 'Retention Metric'];
                            return [value, name];
                          }}
                          labelFormatter={(_, p) => (p?.[0]?.payload ? `Time Block ${p[0].payload.label}:00` : '')}
                        />
                        <Legend wrapperStyle={{ fontSize: 11, fontWeight: 'bold', paddingTop: 20, color: 'rgba(255,255,255,0.7)' }} />
                        <Line
                          yAxisId="ccv"
                          type="monotone"
                          dataKey="ccv"
                          name="Avg concurrent viewers"
                          stroke="#22d3ee"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 6, fill: '#22d3ee', stroke: '#000', strokeWidth: 2 }}
                        />
                        <Line
                          yAxisId="vh"
                          type="monotone"
                          dataKey="viewerHoursK"
                          name="Viewer-hours (k)"
                          stroke="#a78bfa"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 6, fill: '#a78bfa', stroke: '#000', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'titles' && (
              <motion.div
                key="titles"
                role="tabpanel"
                id="panel-titles"
                aria-labelledby="tab-titles"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="rounded-[24px] p-6 lg:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-5 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" /> Title patterns
                  </h3>
                  <p className="text-sm text-zinc-400 font-light mb-8">
                    Ideas from how strong titles are usually built — hooks, honesty, clear game or vibe. Don’t copy others
                    verbatim; stay within Twitch ToS.
                  </p>
                  <ul className="space-y-4">
                    {MOCK_TITLE_PATTERNS.map((p) => (
                      <li key={p} className="text-sm font-medium text-white/90 flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                        <span className="text-cyan-400 font-bold shrink-0 block mt-0.5">→</span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] p-6 lg:p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/70 mb-5 flex items-center gap-3">
                    <Wand2 className="w-5 h-5 text-violet-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.6)]" /> Titles + other signals
                  </h3>
                  <p className="text-sm text-zinc-400 font-light mb-4">
                    Titles work best when they match <strong className="text-zinc-300">real</strong> stream context — game,
                    mood, schedule. We’re not adding more canned title banks here; optional next step is LLM or data from{' '}
                    <strong className="text-zinc-300">your</strong> analytics providers.
                  </p>
                  {showDevInternals && (
                    <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 mb-6 text-xs text-zinc-400 leading-relaxed font-light">
                      <strong className="text-violet-200/90 font-semibold">Combine carefully (dev):</strong> use Helix for
                      “who is live right now”; use third-party indexes or YouTube for trends; merge on the server with
                      clear rules.
                    </div>
                  )}
                  
                  <label htmlFor="title-prompt" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block ml-1">
                    Your stream (optional)
                  </label>
                  <textarea
                    id="title-prompt"
                    rows={4}
                    className="w-full rounded-xl bg-black/40 border border-white/10 p-4 text-sm text-white mb-8 resize-none focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all shadow-inner placeholder:text-zinc-600"
                    placeholder="e.g. First playthrough, no spoilers, high interaction."
                  />
                  
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 ml-1">Examples</p>
                  <ul className="space-y-3">
                    {MOCK_TITLE_SUGGESTIONS.map((s, idx) => (
                      <li
                        key={s}
                        className="text-sm font-medium leading-relaxed p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white shadow-sm flex items-start gap-3 relative overflow-hidden group"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-violet-500/50 group-hover:bg-violet-400 transition-colors" />
                        <span className="font-mono text-zinc-500 text-[10px] tracking-widest uppercase mt-0.5 shrink-0">OPT-{idx + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-zinc-500">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              {showDevInternals ? (
                <>
                  Streamer Analytics — Mission Control <code className="text-zinc-600">/api/twitch/*</code>
                </>
              ) : (
                <>Streamer Analytics — Operator.ink</>
              )}
            </p>
            <p>Operator.ink</p>
          </footer>
        </main>
      </div>
    </>
  );
}
