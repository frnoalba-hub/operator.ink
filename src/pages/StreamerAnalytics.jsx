import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, BarChart3, Users, ArrowUpRight, ArrowDownRight, Eye, Clock, UserPlus, MessageSquare, Tv, Trophy, Globe, Monitor, Smartphone, Gamepad2, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import StickyNav from '@/components/StickyNav';
import GridOverlay from '@/components/GridOverlay';
import BackToHome from '@/components/BackToHome';

const PAGE_TITLE = 'Streamer Analytics — Twitch & Streaming Analytics | Operator.ink';
const PAGE_DESC = 'Streamer Analytics: Twitch & streaming analytics for creators. Viewers, engagement, growth metrics.';

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_KPIS = {
  '7d':  { avgViewers: 342,   peakViewers: 1_247, hoursStreamed: 28.5, followersGained: 186,  chatMessages: 14_820, streams: 6  },
  '30d': { avgViewers: 298,   peakViewers: 2_031, hoursStreamed: 112,  followersGained: 724,  chatMessages: 58_340, streams: 22 },
  '90d': { avgViewers: 271,   peakViewers: 2_031, hoursStreamed: 318,  followersGained: 2_140, chatMessages: 162_900, streams: 64 },
};

const MOCK_TREND = [
  { day: 'Mon', viewers: 280 },
  { day: 'Tue', viewers: 310 },
  { day: 'Wed', viewers: 420 },
  { day: 'Thu', viewers: 385 },
  { day: 'Fri', viewers: 510 },
  { day: 'Sat', viewers: 680 },
  { day: 'Sun', viewers: 342 },
];

const MOCK_CHANNELS = [
  { id: 1, name: 'AlexPlaysGames',  platform: 'Twitch',  status: 'live',    avgViewers: 342, peakViewers: 1247, delta: +14.2, category: 'Valorant',        followers: 8_420 },
  { id: 2, name: 'AlexGaming',      platform: 'YouTube', status: 'offline',  avgViewers: 189, peakViewers: 612,  delta: -3.1,  category: 'Variety',         followers: 3_210 },
  { id: 3, name: 'alex_live',       platform: 'Kick',    status: 'offline',  avgViewers: 76,  peakViewers: 245,  delta: +28.6, category: 'Just Chatting',   followers: 1_180 },
];

const MOCK_BEST_TIMES = [
  { day: 'Saturday',  time: '7 PM – 11 PM', avgViewers: 580, category: 'Valorant' },
  { day: 'Friday',    time: '8 PM – 12 AM', avgViewers: 510, category: 'Variety' },
  { day: 'Sunday',    time: '3 PM – 7 PM',  avgViewers: 420, category: 'Just Chatting' },
  { day: 'Wednesday', time: '9 PM – 11 PM', avgViewers: 385, category: 'Valorant' },
];

const MOCK_AUDIENCE = {
  geo: [
    { region: 'United States', percent: 62, viewers: 212 },
    { region: 'Mexico',        percent: 14, viewers: 48 },
    { region: 'Canada',        percent: 8,  viewers: 27 },
    { region: 'United Kingdom', percent: 5, viewers: 17 },
    { region: 'Germany',       percent: 3,  viewers: 10 },
    { region: 'Other',         percent: 8,  viewers: 28 },
  ],
  devices: [
    { type: 'Desktop',  percent: 58, icon: Monitor },
    { type: 'Mobile',   percent: 28, icon: Smartphone },
    { type: 'Console',  percent: 14, icon: Gamepad2 },
  ],
  peakHours: [
    { hour: '6 PM', intensity: 0.4 },
    { hour: '7 PM', intensity: 0.7 },
    { hour: '8 PM', intensity: 0.9 },
    { hour: '9 PM', intensity: 1.0 },
    { hour: '10 PM', intensity: 0.85 },
    { hour: '11 PM', intensity: 0.6 },
    { hour: '12 AM', intensity: 0.3 },
  ],
};

// ─── Tabs ────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'overview',  label: 'Overview',  icon: BarChart3 },
  { id: 'channels',  label: 'Channels',  icon: Radio },
  { id: 'audience',  label: 'Audience',  icon: Users },
];

const DATE_RANGES = ['7d', '30d', '90d'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function getPlatformColor(platform) {
  switch (platform) {
    case 'Twitch':  return { text: 'text-[#9146FF]', bg: 'bg-[#9146FF]/10', border: 'border-[#9146FF]/20' };
    case 'YouTube': return { text: 'text-[#FF0000]', bg: 'bg-[#FF0000]/10', border: 'border-[#FF0000]/20' };
    case 'Kick':    return { text: 'text-[#53FC18]', bg: 'bg-[#53FC18]/10', border: 'border-[#53FC18]/20' };
    default:        return { text: 'text-zinc-400',  bg: 'bg-zinc-400/10',  border: 'border-zinc-400/20' };
  }
}

function getStatusBadge(status) {
  if (status === 'live') return 'bg-rose-500 text-white';
  return 'bg-zinc-700 text-zinc-400';
}

// ─── Mini Bar Chart (pure CSS, no dep) ───────────────────────────────────────

function MiniBarChart({ data, maxKey = 'viewers', color = '#00ccff' }) {
  const max = Math.max(...data.map(d => d[maxKey]));
  return (
    <div className="flex items-end gap-1.5 h-32 w-full">
      {data.map((d, i) => {
        const pct = max > 0 ? (d[maxKey] / max) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] text-[var(--retro-text-dim)] font-bold">{d[maxKey]}</span>
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{ height: `${pct}%`, background: color, minHeight: '4px', opacity: 0.7 + (pct / 300) }}
            />
            <span className="text-[9px] text-[var(--retro-text-dim)] font-medium">{d.day}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function StreamerAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');

  const kpis = MOCK_KPIS[dateRange];

  const KPI_CARDS = [
    { label: 'Avg Viewers',      value: fmt(kpis.avgViewers),      icon: Eye,          delta: +8.4,  dim: dateRange },
    { label: 'Peak Viewers',     value: fmt(kpis.peakViewers),     icon: TrendingUp,   delta: +22.1, dim: dateRange },
    { label: 'Hours Streamed',   value: kpis.hoursStreamed + 'h',  icon: Clock,        delta: +5.0,  dim: dateRange },
    { label: 'Followers Gained', value: fmt(kpis.followersGained), icon: UserPlus,     delta: +12.3, dim: dateRange },
    { label: 'Chat Messages',   value: fmt(kpis.chatMessages),    icon: MessageSquare, delta: +18.7, dim: dateRange },
    { label: 'Streams',         value: String(kpis.streams),      icon: Tv,            delta: 0,     dim: dateRange },
  ];

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} noIndex />
      <div
        className="retro-theme min-h-screen antialiased overflow-x-hidden flex flex-col"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}
        role="document"
      >
        <GridOverlay />
        <StickyNav currentPage="streameranalytics" />

        <main className="relative z-10 flex-1 w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pt-24 pb-16">
          <BackToHome />

          {/* ── Header ── */}
          <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Streamer Analytics</h1>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#9146FF]/10 text-[#9146FF] border border-[#9146FF]/20 px-2 py-0.5 rounded-full">Beta</span>
              </div>
              <p className="text-sm text-[var(--retro-text-dim)] mt-1">
                Twitch & streaming analytics • Viewers, engagement, growth.
              </p>
            </div>

            {/* Tab Nav */}
            <nav className="flex rounded-xl border border-white/10 p-1 bg-black/30" aria-label="View tabs">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={isActive}
                    id={`tab-${t.id}`}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
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

          {/* ── Content Area ── */}
          <AnimatePresence mode="wait">

            {/* ────── OVERVIEW TAB ────── */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                role="tabpanel"
                id="panel-overview"
                aria-labelledby="tab-overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Date Range */}
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Overview
                  </h2>
                  <div className="flex gap-1.5">
                    {DATE_RANGES.map((r) => (
                      <button
                        key={r}
                        onClick={() => setDateRange(r)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          dateRange === r
                            ? 'bg-white/10 text-white border-white/20'
                            : 'bg-white/[0.02] text-[var(--retro-text-dim)] border-white/5 hover:border-white/10'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                  {KPI_CARDS.map((kpi) => {
                    const KpiIcon = kpi.icon;
                    const isPositive = kpi.delta > 0;
                    const isNeutral = kpi.delta === 0;
                    return (
                      <div key={kpi.label} className="retro-card rounded-2xl p-4 border border-[var(--retro-border)]">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">{kpi.label}</p>
                          <KpiIcon className="w-4 h-4 text-[var(--retro-text-dim)]" />
                        </div>
                        <p className="text-xl md:text-2xl font-extrabold">{kpi.value}</p>
                        {!isNeutral && (
                          <p className={`text-[10px] md:text-xs mt-1 flex items-center font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                            {Math.abs(kpi.delta)}% vs prior
                          </p>
                        )}
                        {isNeutral && (
                          <p className="text-[10px] text-[var(--retro-text-dim)] mt-1">{kpi.dim}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Viewer Trend Chart */}
                <div className="retro-card rounded-2xl p-6 lg:p-8 border border-[var(--retro-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Viewer Trend (Last 7 Days)
                  </h3>
                  <MiniBarChart data={MOCK_TREND} maxKey="viewers" color="#00ccff" />
                </div>
              </motion.div>
            )}

            {/* ────── CHANNELS TAB ────── */}
            {activeTab === 'channels' && (
              <motion.div
                key="channels"
                role="tabpanel"
                id="panel-channels"
                aria-labelledby="tab-channels"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                  <Radio className="w-4 h-4" /> Your Channels
                </h2>

                {/* Channel Cards */}
                <div className="space-y-3">
                  {MOCK_CHANNELS.map((ch, idx) => {
                    const pc = getPlatformColor(ch.platform);
                    const isPositive = ch.delta > 0;
                    return (
                      <div key={ch.id} className="retro-card rounded-2xl p-5 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-all group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl font-extrabold text-lg bg-[var(--retro-bg)] border border-[var(--retro-border)]">
                              {idx + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-base">{ch.name}</h3>
                                <span className={`text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full ${getStatusBadge(ch.status)}`}>
                                  {ch.status === 'live' ? '● LIVE' : 'OFFLINE'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${pc.text} ${pc.bg} ${pc.border}`}>
                                  {ch.platform}
                                </span>
                                <span className="text-xs text-[var(--retro-text-dim)]">{ch.category}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 sm:gap-8">
                            <div className="text-center">
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">Avg</p>
                              <p className="font-extrabold text-lg">{fmt(ch.avgViewers)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">Peak</p>
                              <p className="font-extrabold text-lg">{fmt(ch.peakViewers)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">Followers</p>
                              <p className="font-bold text-sm">{fmt(ch.followers)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">Δ 7d</p>
                              <p className={`font-bold text-sm flex items-center ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {Math.abs(ch.delta)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Best Stream Times */}
                <div className="retro-card rounded-2xl p-6 border border-[var(--retro-border)]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-400" /> Best Stream Times
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MOCK_BEST_TIMES.map((bt, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--retro-bg)] border border-[var(--retro-border)]">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 font-extrabold text-sm border border-amber-400/20">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm">{bt.day} · {bt.time}</p>
                          <p className="text-xs text-[var(--retro-text-dim)]">{bt.category} · Avg {bt.avgViewers} viewers</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ────── AUDIENCE TAB ────── */}
            {activeTab === 'audience' && (
              <motion.div
                key="audience"
                role="tabpanel"
                id="panel-audience"
                aria-labelledby="tab-audience"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Audience Breakdown
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                  {/* Geographic Breakdown */}
                  <div className="retro-card rounded-2xl p-6 border border-[var(--retro-border)]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Geography
                    </h3>
                    <div className="space-y-3">
                      {MOCK_AUDIENCE.geo.map((g) => (
                        <div key={g.region}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-semibold">{g.region}</span>
                            <span className="text-xs font-bold text-[var(--retro-text-dim)]">{g.percent}% · {g.viewers} avg</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-[var(--retro-bg)] border border-[var(--retro-border)] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${g.percent}%` }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                              className="h-full rounded-full"
                              style={{ background: 'linear-gradient(90deg, #00ccff, #9966ff)' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Breakdown */}
                  <div className="retro-card rounded-2xl p-6 border border-[var(--retro-border)]">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                      <Monitor className="w-4 h-4" /> Devices
                    </h3>
                    <div className="space-y-4">
                      {MOCK_AUDIENCE.devices.map((d) => {
                        const DevIcon = d.icon;
                        return (
                          <div key={d.type} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[var(--retro-bg)] border border-[var(--retro-border)] flex items-center justify-center">
                              <DevIcon className="w-5 h-5 text-[var(--retro-text-dim)]" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-bold">{d.type}</span>
                                <span className="text-sm font-extrabold">{d.percent}%</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-[var(--retro-bg)] border border-[var(--retro-border)] overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${d.percent}%` }}
                                  transition={{ duration: 0.6, delay: 0.1 }}
                                  className="h-full rounded-full"
                                  style={{ background: d.type === 'Desktop' ? '#66ff66' : d.type === 'Mobile' ? '#00ccff' : '#ffcc00' }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Peak Viewing Hours */}
                    <div className="mt-8">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Peak Viewing Hours
                      </h3>
                      <div className="flex items-end gap-2 h-24">
                        {MOCK_AUDIENCE.peakHours.map((ph) => (
                          <div key={ph.hour} className="flex-1 flex flex-col items-center gap-1">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${ph.intensity * 100}%` }}
                              transition={{ duration: 0.5, delay: 0.05 }}
                              className="w-full rounded-t-md"
                              style={{
                                background: `rgba(255, 51, 102, ${0.3 + ph.intensity * 0.7})`,
                                minHeight: '4px',
                              }}
                            />
                            <span className="text-[8px] text-[var(--retro-text-dim)] font-medium whitespace-nowrap">{ph.hour}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          <p className="mt-8 text-xs text-white/30">
            Streamer Analytics v1 • Mock data. Twitch Helix integration coming soon.
          </p>
        </main>
      </div>
    </>
  );
}
