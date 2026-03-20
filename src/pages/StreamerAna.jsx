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
        <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
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
            className="retro-card rounded-2xl p-8 border border-[var(--retro-border)]"
          >
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Avg Viewers', value: '—', dim: '7d' },
                { label: 'Peak Viewers', value: '—', dim: '7d' },
                { label: 'Hours Streamed', value: '—', dim: '7d' },
                { label: 'Followers Gained', value: '—', dim: '7d' },
              ].map((kpi) => (
                <div key={kpi.label} className="retro-card rounded-xl p-4 border border-[var(--retro-border)]">
                  <p className="text-[10px] uppercase font-bold text-[var(--retro-text-dim)] tracking-wider">{kpi.label}</p>
                  <p className="text-xl font-extrabold mt-1">{kpi.value}</p>
                  <p className="text-[10px] text-[var(--retro-text-dim)] mt-0.5">{kpi.dim}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-white/40 italic">
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
