import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, LayoutDashboard, MessageSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEO from '@/components/SEO';
import StickyNav from '../components/StickyNav';
import GridOverlay from '../components/GridOverlay';
import BackToHome from '../components/BackToHome';

const PILOT_TITLE = 'Pilot Program — Operations Dashboard Sample | Operator.ink';
const PILOT_DESC =
  'Operator.ink pilot program: dual-role operations dashboard sample with Kanban-style workflow, analytics, contextual chat, and simulated automation—scoped per client.';

export default function Pilot() {
  return (
    <>
      <SEO title={PILOT_TITLE} description={PILOT_DESC} canonicalUrl="https://operator.ink/Pilot" />
      <div className="retro-theme min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}>
      <GridOverlay />
      <StickyNav currentPage="pilot" />
      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <BackToHome />

        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight mb-4">
            Pilot Program — Operations Dashboard
          </h1>
          <p className="text-lg text-[var(--retro-text-muted)]">
            Interactive sample with role-based views, workflow boards, and onboarding—tailored when we scope your build.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-sm uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">What You Get</h2>
          <div className="retro-card rounded-2xl p-6 space-y-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center retro-rgb-border flex-shrink-0" style={{ background: 'var(--retro-bg-elevated)' }}>
                <LayoutDashboard className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Dual-role dashboard</h3>
                <ul className="text-sm text-[var(--retro-text-muted)] space-y-1">
                  <li>Operator view: pipeline boards and day-to-day workflow</li>
                  <li>Leadership view: forecast-style metrics, mix, and bottleneck signals</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--retro-border)] flex-shrink-0" style={{ background: 'var(--retro-bg-elevated)' }}>
                <MessageSquare className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Contextual collaboration</h3>
                <p className="text-sm text-[var(--retro-text-muted)]">Task handoffs, notes, and team-style messaging patterns—demo uses synthetic data only.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--retro-border)] flex-shrink-0" style={{ background: 'var(--retro-bg-elevated)' }}>
                <Zap className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Simulated automation</h3>
                <p className="text-sm text-[var(--retro-text-muted)]">Activity logs to show how agents and workflows attach to real operations.</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <h2 className="text-sm uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Onboarding & Support</h2>
          <ul className="text-sm text-[var(--retro-text-muted)] space-y-2">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Live or recorded walkthrough</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Label and UX tweaks aligned to your workflow</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Guidance on reading metrics and handoff patterns</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12"
        >
          <h2 className="text-sm uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Benefits</h2>
          <ul className="text-sm text-[var(--retro-text-muted)] space-y-2">
            <li>Validate layout and workflow before a full build</li>
            <li>Align stakeholders on roles, metrics, and automation touchpoints</li>
            <li>Reduce delivery risk with a concrete reference UI</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="retro-card rounded-2xl p-8 border-2"
          style={{ borderColor: 'var(--retro-border-bright)' }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-2">Next step</p>
          <p className="text-lg font-bold text-[var(--retro-text)] mb-2">Scoped per project</p>
          <p className="text-sm text-[var(--retro-text-muted)] mb-6">
            Share your ops context via intake—we reply with timeline, deliverables, and investment. No public price card; every pilot is quoted after Brief and Discovery.
          </p>
          <Link
            to={`${createPageUrl('Home')}#intake`}
            className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-8 rounded-xl text-base font-bold hover:opacity-95"
            style={{ minHeight: '52px' }}
          >
            Request scope <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.section>
      </main>
    </div>
    </>
  );
}
