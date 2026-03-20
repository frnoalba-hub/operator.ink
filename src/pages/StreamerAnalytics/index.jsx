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
import { base44 } from '@/api/base44Client';

import {
  MOCK_CATEGORIES,
  MOCK_BEST_TIMES,
  MOCK_TITLE_PATTERNS,
  MOCK_TITLE_SUGGESTIONS,
  MOCK_HOURLY_BY_GAME,
  CHART_GAME_OPTIONS,
} from './mocks';
import { fmt, gradeStyle, gradeFromRatio, scaleMockToLive } from './utils';
import { useStreamerTwitchLive, TWITCH_BATCH_MAX_PAGES } from './useStreamerTwitchLive';

const PAGE_TITLE = 'Streamer Analytics — Market Intelligence | Operator.ink';
const PAGE_DESC =
  'Analyze viewer demand against competition density. Identify optimal broadcast windows and optimize metadata for maximum visibility.';

const TABS = [
  {
    id: 'categories',
    label: 'Market Data',
    icon: Layers,
    purpose:
      'See live or mock demand vs how many channels are live. Ratio = where attention is less crowded — higher is better for discoverability.',
  },
  {
    id: 'timing',
    label: 'Temporal Analysis',
    icon: Clock,
    purpose:
      'When categories tend to be busy. Chart is illustrative until hourly snapshots exist — scaled to current totals when live.',
  },
  {
    id: 'titles',
    label: 'Metadata',
    icon: Sparkles,
    purpose:
      'Patterns to mimic plus Generate concrete stream title lines from your description. Type what you’re streaming; get ideas you can edit.',
  },
];

export default function StreamerAnalytics() {
  const [activeTab, setActiveTab] = useState('categories');
  const [chartGame, setChartGame] = useState('Valorant');
  const [chartGameId, setChartGameId] = useState(null);
  const [titlePrompt, setTitlePrompt] = useState('');
  const [titleLoading, setTitleLoading] = useState(false);
  const [titleError, setTitleError] = useState(null);
  const [generatedTitles, setGeneratedTitles] = useState([]);

  const { phase, categories, batchErrors, fetchedAt, loadError, refetch } = useStreamerTwitchLive();

  const handleGenerateTitles = async () => {
    const desc = titlePrompt.trim();
    if (!desc) {
      setTitleError('Enter a short description of your stream.');
      return;
    }
    setTitleLoading(true);
    setTitleError(null);
    setGeneratedTitles([]);
    try {
      const result = await base44.functions.invoke('generateStreamTitles', {
        description: desc,
        count: 5,
      });
      const data = result?.data ?? result;
      const titles = Array.isArray(data?.titles) ? data.titles : [];
      setGeneratedTitles(titles);
      if (titles.length === 0) {
        setTitleError('No titles returned. Add XAI_API_KEY (Grok free), GROQ_API_KEY, or OPENAI_API_KEY in Base44 secrets.');
      }
    } catch (e) {
      setTitleError(
        e?.message ||
          'Title Gen needs the Base44 function deployed and API key set. See docs/STREAMER_TITLE_GEN.md.'
      );
    } finally {
      setTitleLoading(false);
    }
  };

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
      note: 'Live Helix extraction: aggregates viewer totals against active broadcast volume. High ratio delineates unsaturated demand.',
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
        className="bg-black text-zinc-300 min-h-screen antialiased overflow-x-hidden flex flex-col selection:bg-white selection:text-black"
        role="document"
      >
        <GridOverlay />
        <StickyNav currentPage="streameranalytics" />

        <main className="relative z-10 flex-1 w-full px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-24 pt-32 pb-24">
          <BackToHome />

          <motion.header
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-12"
          >
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Market Intelligence.</h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-white/10 text-white border border-white/20 px-3 py-1">
                  Beta Access
                </span>
                {phase === 'live' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 flex items-center gap-2">
                    <Database className="w-3 h-3" /> Live Telemetry
                  </span>
                )}
                {phase === 'mock' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-zinc-900 text-zinc-500 border border-white/10 px-3 py-1">
                    Simulated Fallback
                  </span>
                )}
                {phase === 'loading' && (
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-2">
                    <RefreshCw className="w-3 h-3 animate-spin"/> Executing payload...
                  </span>
                )}
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-light">
                <strong className="text-white font-medium">Identify unsaturated viewing metrics.</strong> Analyze active demand against broadcast density to pinpoint highly profitable directories.
                {' '}
                {phase === 'live' ? (
                  <>
                    The following matrices are powered by <strong className="text-white font-medium">live Twitch telemetry</strong>. Volume curves remain generalized to specific template archetypes until we activate continuous snapshot architecture.
                  </>
                ) : (
                  <>
                    Currently utilizing <strong className="text-white font-medium">simulated data vectors</strong>. Initialize the Mission Control API locally to retrieve active endpoint payloads.
                  </>
                )}
              </p>
              {loadError && (
                <p className="mt-4 text-xs font-mono text-rose-400/80 border-l-2 border-rose-400 pl-3">
                  Endpoint payload failure — {loadError}
                </p>
              )}
              {phase === 'live' && fetchedAt && (
                <p className="mt-4 text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Last synchronization: {new Date(fetchedAt).toLocaleString()}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-shrink-0">
              <button
                type="button"
                onClick={() => refetch()}
                disabled={phase === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${phase === 'loading' ? 'animate-spin' : ''}`} />
                Synchronize
              </button>
              
              <nav className="flex rounded-none border border-white/10 bg-zinc-900/30 p-1" aria-label="View mechanisms">
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
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-black'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {t.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <p className="w-full mt-4 text-sm text-zinc-500 leading-relaxed lg:mt-6">
              {TABS.find((t) => t.id === activeTab)?.purpose}
            </p>
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
                className="space-y-8"
              >
                <div className="flex flex-col gap-3 text-xs text-zinc-500 px-1">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-zinc-300">Audience Concentration Ratio</strong> — Higher thresholds indicate strong viewer density relative to competitive broadcasts. Leverage for strategic channel transitions.
                    </span>
                  </div>
                  {batchErrors?.length > 0 && (
                    <p className="text-rose-400 font-mono border-l border-rose-400 pl-3">
                      Synchronization interrupted for {batchErrors.length} clusters. Review system logs.
                    </p>
                  )}
                </div>

                {phase === 'loading' && !categoryRows?.length && (
                  <div className="bg-zinc-900/40 p-16 border border-white/10 text-center text-zinc-500 flex flex-col items-center justify-center">
                    <RefreshCw className="w-8 h-8 animate-spin mb-4 text-white/50" />
                    <p className="text-sm uppercase tracking-widest font-bold">Querying Directory Matrix...</p>
                  </div>
                )}

                <div className="grid gap-6">
                  {(categoryRows ||
                    MOCK_CATEGORIES.map((row) => ({ ...row, key: row.game, live: false }))).map((row, i) => {
                    const up = row.trend >= 0;
                    const rowKey = row.key || row.game;
                    return (
                      <div
                        key={rowKey}
                        className="p-6 sm:p-8 bg-zinc-900/30 border border-white/10 hover:border-white/30 hover:bg-white/[0.02] transition-colors relative overflow-hidden group"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white transition-colors" />
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 ml-2">
                          
                          <div className="flex items-start gap-5 flex-1 min-w-0">
                            <div className="w-12 h-12 flex items-center justify-center font-black text-white text-lg flex-shrink-0 bg-white/5 border border-white/20">
                              {i + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h2 className="text-xl font-black text-white tracking-tight">{row.game}</h2>
                                <span
                                  className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 border ${gradeStyle(row.grade)}`}
                                >
                                  {row.grade} Target
                                </span>
                                {row.live && (
                                  <span className="text-[10px] uppercase font-bold text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5">Live Target</span>
                                )}
                              </div>
                              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xl">{row.note}</p>
                              {row.live && row.pagesFetched != null && (
                                <p className="text-[10px] text-zinc-600 font-mono mt-3 uppercase tracking-wider">
                                  Extraction Depth: {row.pagesFetched} / {TWITCH_BATCH_MAX_PAGES} node blocks
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 text-left lg:text-right border-t border-white/10 lg:border-t-0 pt-6 lg:pt-0">
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 flex items-center lg:justify-end gap-1"><Users className="w-3 h-3"/> Viewers</p>
                              <p className="font-mono text-lg text-white">{fmt(row.viewers)}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1 flex items-center lg:justify-end gap-1"><Radio className="w-3 h-3"/> Broadcasters</p>
                              <p className="font-mono text-lg text-white">{fmt(row.streamers)}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Concentration</p>
                              <p className="font-mono text-lg text-white">{row.ratio}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Vector Trend</p>
                              {row.live ? (
                                <p className="font-mono text-sm text-zinc-400 pt-1">
                                  Streaming
                                </p>
                              ) : (
                                <p
                                  className={`font-mono text-sm pt-1 flex items-center lg:justify-end gap-1 ${
                                    up ? 'text-zinc-200' : 'text-zinc-500'
                                  }`}
                                >
                                  {up ? <ArrowUpRight className="w-4 h-4 text-emerald-400" /> : <ArrowDownRight className="w-4 h-4 text-rose-400" />}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div className="px-1 max-w-4xl">
                  <p className="text-sm font-light text-zinc-400 leading-relaxed border-l-2 border-white/20 pl-4">
                    <strong className="text-zinc-200 font-medium">Optimal Activation Vectors.</strong> Utilize the volume tracking to determine low-friction entry windows. Daily architecture patterns remain structural until the telemetry cache scales to full 24-hour persistent snapshotting.
                  </p>
                </div>

                <div className="bg-zinc-900/30 border border-white/10 p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-white" /> Recommended Broadcast Sequences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_BEST_TIMES.map((bt) => (
                      <div
                        key={`${bt.game}-${bt.day}`}
                        className="flex items-center gap-5 p-5 bg-black border border-white/10 hover:border-white/30 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-white/5 text-white flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-base mb-1">{bt.game}</p>
                          <p className="text-xs text-zinc-500 uppercase tracking-widest">
                            {bt.day} <span className="mx-1 opacity-50">/</span> {bt.window}
                          </p>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white border border-white/20 px-2 py-1 bg-white/5">
                          {bt.intensity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900/30 border border-white/10 p-8">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2 flex items-center gap-2">
                        <LineChartIcon className="w-4 h-4 text-white" /> 24-Hour Trajectory Analysis
                      </h3>
                      <p className="text-xs text-zinc-500 font-light">
                        <span className="border-b border-white text-white">White series</span> denotes audience scale. <span className="border-b border-zinc-500 text-zinc-400">Zinc series</span> maps viewership retention metrics.
                      </p>
                    </div>
                    <label className="flex flex-col gap-2 shrink-0">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Select Directory Parameter</span>
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
                        className="bg-black border border-white/20 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white focus:outline-none focus:border-white transition-colors"
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
                  
                  <div className="w-full h-[380px] bg-black/40 border border-white/5 p-4 relative">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />
                    
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={hourlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="1 4" stroke="rgba(255,255,255,0.1)" vertical={false} />
                        <XAxis
                          dataKey="label"
                          interval={1}
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                          axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                          tickLine={{ stroke: 'rgba(255,255,255,0.15)' }}
                          dy={10}
                        />
                        <YAxis
                          yAxisId="ccv"
                          tickFormatter={(v) => fmt(v)}
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                          axisLine={false}
                          tickLine={false}
                          dx={-10}
                        />
                        <YAxis
                          yAxisId="vh"
                          orientation="right"
                          tickFormatter={(v) => `${v}k`}
                          tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                          axisLine={false}
                          tickLine={false}
                          dx={10}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.2)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                          labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}
                          itemStyle={{ padding: '2px 0' }}
                          formatter={(value, name) => {
                            if (name === 'Avg concurrent viewers') return [fmt(value), 'Active Viewers'];
                            if (name === 'Viewer-hours (k)') return [`${value}k`, 'Retention Metric'];
                            return [value, name];
                          }}
                          labelFormatter={(_, p) => (p?.[0]?.payload ? `T-Minus ${p[0].payload.label}:00` : '')}
                        />
                        <Legend wrapperStyle={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: 20, opacity: 0.7 }} />
                        <Line
                          yAxisId="ccv"
                          type="monotone"
                          dataKey="ccv"
                          name="Avg concurrent viewers"
                          stroke="#ffffff"
                          strokeWidth={2}
                          dot={{ r: 2, fill: '#000', stroke: '#fff', strokeWidth: 1 }}
                          activeDot={{ r: 5, fill: '#fff' }}
                        />
                        <Line
                          yAxisId="vh"
                          type="monotone"
                          dataKey="viewerHoursK"
                          name="Viewer-hours (k)"
                          stroke="#71717a"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 4, fill: '#71717a' }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="bg-zinc-900/30 border border-white/10 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-white" /> Market-Tested Architectures
                    </h3>
                    <p className="text-sm text-zinc-400 font-light mb-8 max-w-sm">
                      Synthesized metadata patterns extracted from high-conversion streams. Deploy structural logic, omitting verbatim duplication.
                    </p>
                    <ul className="space-y-4">
                      {MOCK_TITLE_PATTERNS.map((p) => (
                        <li key={p} className="text-sm font-light text-zinc-300 flex items-start gap-4 p-4 bg-black border border-white/5">
                          <span className="text-white font-mono mt-0.5 shrink-0 block">{"//"}</span>
                          <span className="leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-zinc-900/30 border border-white/10 p-8">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-white" /> Generate titles
                  </h3>
                  <p className="text-sm text-zinc-400 font-light mb-6">
                    Type what you’re streaming; get editable title ideas. Uses Base44 function with OpenAI or Groq.
                  </p>

                  <label htmlFor="title-prompt" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 block">
                    Stream description
                  </label>
                  <textarea
                    id="title-prompt"
                    rows={4}
                    value={titlePrompt}
                    onChange={(e) => setTitlePrompt(e.target.value)}
                    className="w-full bg-black border border-white/20 p-4 text-sm text-white mb-4 resize-none focus:outline-none focus:border-white transition-colors placeholder:text-zinc-700"
                    placeholder="e.g. Hollow Knight first play, chill, no backseating"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateTitles}
                    disabled={titleLoading}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
                  >
                    {titleLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating…
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4" />
                        Generate titles
                      </>
                    )}
                  </button>

                  {titleError && (
                    <p className="text-xs text-rose-400 mb-4 border-l-2 border-rose-400 pl-3">{titleError}</p>
                  )}

                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                    {generatedTitles.length ? 'Generated' : 'Example outputs'}
                  </p>
                  <ul className="space-y-3">
                    {(generatedTitles.length ? generatedTitles : MOCK_TITLE_SUGGESTIONS).map((s, idx) => (
                      <li
                        key={`${s}-${idx}`}
                        className="text-sm font-light leading-relaxed p-4 bg-black border border-white/10 text-zinc-300 relative group overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-white/20 group-hover:bg-white transition-colors" />
                        <span className="font-mono text-zinc-600 text-[10px] tracking-widest uppercase mr-3">
                          {generatedTitles.length ? `GEN-${idx + 1}` : `OPT-${idx + 1}`}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">
               Market Intelligence Engine — Continuous Integration <span className="mx-2">|</span> Directory /api/twitch/*
             </p>
             <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">
               Operator.ink Systems
             </p>
          </div>
        </main>
      </div>
    </>
  );
}
