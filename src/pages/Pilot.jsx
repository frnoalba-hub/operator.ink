import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, LayoutDashboard, MessageSquare, Zap } from 'lucide-react';
import { createPageUrl } from '@/utils';
import StickyNav from '../components/StickyNav';

export default function Pilot() {
  return (
    <div className="retro-theme min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      <StickyNav currentPage="pilot" />
      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <motion.a
          href={createPageUrl('Home')}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-sm text-[var(--retro-text-muted)] hover:text-[var(--retro-text)] mb-8 retro-link"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </motion.a>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight mb-4">
            Phase-0 Pilot: Dual-Role Dashboard for Nursing Facilities
          </h1>
          <p className="text-2xl font-bold retro-link-accent mb-2">$3,999</p>
          <p className="text-sm text-[var(--retro-text-muted)]">Up to 10 users included</p>
        </motion.header>

        {/* What You Get */}
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
                <h3 className="font-bold mb-1">Dual-Role Dashboard</h3>
                <ul className="text-sm text-[var(--retro-text-muted)] space-y-1">
                  <li>Admissions Coordinators: Interactive Kanban pipeline (Referral → Review → Bed Offer)</li>
                  <li>Executive Dashboard: Bed Forecast, Payer Mix, Bottleneck Alerts</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--retro-border)] flex-shrink-0" style={{ background: 'var(--retro-bg-elevated)' }}>
                <MessageSquare className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Real-time Contextual Chat</h3>
                <p className="text-sm text-[var(--retro-text-muted)]">Flag missing documents, assign tasks, simulate team collaboration</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--retro-border)] flex-shrink-0" style={{ background: 'var(--retro-bg-elevated)' }}>
                <Zap className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
              </div>
              <div>
                <h3 className="font-bold mb-1">Simulated AI/Agent Activity</h3>
                <p className="text-sm text-[var(--retro-text-muted)]">Auto-updating logs to visualize workflow automation</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Onboarding & Support */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <h2 className="text-sm uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Onboarding & Support</h2>
          <ul className="text-sm text-[var(--retro-text-muted)] space-y-2">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Live or recorded walkthrough</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Minor customization of chart labels, color codes, alert icons</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Guidance on interpreting metrics and workflow outputs</li>
          </ul>
        </motion.section>

        {/* Pilot Deliverables */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-sm uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Pilot Deliverables</h2>
          <ul className="text-sm text-[var(--retro-text-muted)] space-y-2">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Fully interactive demo dashboard (Base44)</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Dummy or client-provided data for realistic workflow simulation</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Documentation of simulated agent actions and KPI tracking</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-border-bright)' }} /> Feedback form for workflow refinement before full deployment</li>
          </ul>
        </motion.section>

        {/* Benefits */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12"
        >
          <h2 className="text-sm uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Benefits</h2>
          <ul className="text-sm text-[var(--retro-text-muted)] space-y-2">
            <li>Test and validate your operational workflow before full-scale deployment</li>
            <li>Understand bottlenecks, occupancy trends, and payer mix in real time</li>
            <li>Showcase to your internal team the value of automated, role-based dashboards</li>
            <li>Prepare the ground for future full-scale deployment with minimal risk</li>
          </ul>
        </motion.section>

        {/* Next Steps */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-sm uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Next Steps</h2>
          <ol className="text-sm text-[var(--retro-text-muted)] space-y-2 list-decimal list-inside">
            <li>Sign up and schedule a pilot kickoff call</li>
            <li>Provide facility data or allow use of realistic dummy data</li>
            <li>Review demo dashboard and provide feedback</li>
            <li>Optional follow-up for Phase-1 or full deployment</li>
          </ol>
        </motion.section>

        {/* Pricing card + CTA */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="retro-card rounded-2xl p-8 border-2"
          style={{ borderColor: 'var(--retro-border-bright)' }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-2">Phase-0 Pilot</p>
          <p className="text-4xl font-extrabold mb-1">$3,999</p>
          <p className="text-sm text-[var(--retro-text-muted)] mb-4">Max 10 users included.</p>
          <p className="text-xs text-[var(--retro-text-dim)] mb-6 italic">Fully functional, interactive Phase-0 pilot. Realistic workflow simulation with actionable insights, not just a static mockup.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:orders@operator.ink?subject=Phase-0 Pilot: Schedule Kickoff"
              className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-8 rounded-xl text-base hover:opacity-95"
              style={{ minHeight: '52px' }}
            >
              Schedule Pilot Kickoff <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={createPageUrl('Demos')}
              className="retro-link inline-flex items-center justify-center gap-2 px-8 rounded-xl border border-[var(--retro-border)] font-semibold hover:border-[var(--retro-border-bright)]"
              style={{ minHeight: '52px' }}
            >
              View Demo Brief
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
