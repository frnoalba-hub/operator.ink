import React from 'react';
import { motion } from 'framer-motion';
import { Radio, BarChart3, Users } from 'lucide-react';
import SEO from '@/components/SEO';
import StickyNav from '@/components/StickyNav';
import GridOverlay from '@/components/GridOverlay';
import BackToHome from '@/components/BackToHome';

const PAGE_TITLE = 'Streamer Analytics — Twitch & Streaming Analytics | Operator.ink';
const PAGE_DESC = 'Streamer Analytics: Twitch & streaming analytics for creators. Viewers, engagement, growth metrics.';

const VIEWS = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'channels', label: 'Channels', icon: Radio },
  { id: 'audience', label: 'Audience', icon: Users },
];

export default function StreamerAna() {
  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESC} noIndex />
      <div
        className="retro-theme min-h-screen antialiased overflow-x-hidden"
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}
      >
        <GridOverlay />
        <StickyNav currentPage="streamerana" />
        <main className="relative z-10 w-full px-6 lg:px-12 xl:px-16 2xl:px-24 pt-24 pb-16">
          <BackToHome />

          <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Streamer Analytics</h1>
              <p className="text-sm text-[var(--retro-text-dim)] mt-1">
                Twitch & streaming analytics • Viewers, engagement, growth.
              </p>
            </div>
            <nav className="flex rounded-xl border border-white/10 p-1 bg-black/30" aria-label="View tabs">
              {VIEWS.map((v) => {
                const Icon = v.icon;
                return (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={v.id === 'overview'}
                    id={`tab-${v.id}`}
                    aria-controls={`panel-${v.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all text-white/60 hover:text-white/80 hover:bg-white/5"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {v.label}
                  </button>
                );
              })}
            </nav>
          </motion.header>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="retro-card rounded-2xl p-8 lg:p-10 border border-[var(--retro-border)]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Overview
              </h2>
              <div className="flex gap-2 text-xs text-[var(--retro-text-dim)]">
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 cursor-default">7d</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 opacity-60 cursor-default">30d</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 opacity-60 cursor-default">90d</span>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              {[
                { label: 'Avg Viewers', value: '—', dim: '7d' },
                { label: 'Peak Viewers', value: '—', dim: '7d' },
                { label: 'Hours Streamed', value: '—', dim: '7d' },
                { label: 'Followers Gained', value: '—', dim: '7d' },
                { label: 'Chat Messages', value: '—', dim: '7d' },
                { label: 'Streams', value: '—', dim: '7d' },
              ].map((kpi) => (
                <div key={kpi.label} className="retro-card rounded-xl p-4 border border-[var(--retro-border)]">
                  <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">{kpi.label}</p>
                  <p className="text-xl font-extrabold mt-1">{kpi.value}</p>
                  <p className="text-[10px] text-[var(--retro-text-dim)] mt-0.5">{kpi.dim}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 h-48 rounded-xl border border-dashed border-white/20 flex items-center justify-center bg-white/[0.02]">
              <p className="text-sm text-white/40 italic">Chart area — viewer trend, peak hours, etc.</p>
            </div>
            <p className="mt-6 text-sm text-white/40 italic">
              Skeleton — Connect Twitch API or data source to populate metrics.
            </p>
          </motion.section>

          <p className="mt-6 text-xs text-white/40">
            Streamer Analytics • Twitch analytics placeholder. Ready for data integration.
          </p>
        </main>
      </div>
    </>
  );
}
