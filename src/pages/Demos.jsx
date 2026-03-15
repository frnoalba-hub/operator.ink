import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutDashboard, Mail } from 'lucide-react';
import { createPageUrl } from '@/utils';
import StickyNav from '../components/StickyNav';

const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";

export default function Demos() {
  return (
    <div className="retro-theme min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      <StickyNav currentPage="demos" />
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
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight"
        >
          Demo Briefs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[var(--retro-text-muted)] mb-10"
        >
          Ready-to-send prompts for frontend companies or agencies.
        </motion.p>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="retro-card rounded-[28px] p-8 lg:p-10 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
              <LayoutDashboard className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Admissions & Bed Tracking Dashboard</h2>
              <p className="text-sm text-[var(--retro-text-dim)]">For skilled nursing facilities</p>
            </div>
          </div>
          <div className="prose prose-invert max-w-none text-sm text-[var(--retro-text-muted)] space-y-4">
            <p><strong>Objective:</strong> Build a dashboard for managing patient admissions in skilled nursing facilities. Each card tracks <strong>patient name</strong> + admission status.</p>
            <p><strong>How admissions work:</strong> Referral (name, source) → Clinical Review (PASRR, meds) → Bed Offer (pick payer: Medicare/HMO/Private, track per patient) → Admitted or Denied.</p>
            <p><strong>Design:</strong> Dark command-center aesthetic. Vercel, Linear inspiration. Grid-based, responsive, minimalistic.</p>
            <p><strong>Tech:</strong> React + Vite, Tailwind CSS, Framer Motion, Lucide icons.</p>
            <p><strong>Core features:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pipeline (5 stages), drag-and-drop patient cards</li>
              <li><strong>Patient cards: Name</strong> (required), Facility, Payer, Task progress. Click for side panel</li>
              <li>Stage checklist: Medication List, PASRR Level 1, Face-to-face scheduled, Financial clearance</li>
              <li><strong>Notifications:</strong> New referral alerts, stage-change alerts, pending-item reminders</li>
              <li><strong>Flags:</strong> New, Prior Auth, Urgent, Complete. Mark Complete when finished; clear patient.</li>
              <li><strong>Payer selection</strong> — Medicare, HMO, Private; payer can switch mid-stay</li>
              <li><strong>Coordinators coordinate:</strong> See who has beds, message each other</li>
              <li><strong>Admin:</strong> Views all coordinators + metrics</li>
              <li><strong>Mobile-first</strong> — coordinators walk the floor</li>
              <li><strong>HIPAA:</strong> Demo uses synthetic data only; no PHI</li>
              <li>Clearer data — filters, drill-down, export</li>
              <li>Analytics: Referrals, Admitted/Denied counts, bed forecast</li>
              <li>Quick-add new referral with patient name</li>
            </ul>
            <p><strong>Deliverable:</strong> Interactive demo with pipeline, name-based patient cards, notifications, side panel, analytics.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--retro-border)]">
            <p className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-2">Phase-0 Pilot — $3,999</p>
            <p className="text-sm text-[var(--retro-text-muted)] mb-3">Discovery → tailored deployment → working demo → observation → report. Proven framework, measurable outcomes. Limited slots.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={createPageUrl('Pilot')}
              className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-6 rounded-xl text-sm"
              style={{ minHeight: '48px' }}
            >
              Phase-0 Pilot — Schedule Kickoff
            </a>
            <a
              href="mailto:orders@operator.ink?subject=Demo Request: Admissions Dashboard"
              className="retro-link inline-flex items-center justify-center gap-2 px-6 rounded-xl text-sm border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)]"
              style={{ minHeight: '48px' }}
            >
              <Mail className="w-4 h-4" /> Request This Demo
            </a>
          </div>
        </motion.article>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-[var(--retro-text-dim)]"
        >
          More demos coming soon. Contact <a href="mailto:orders@operator.ink" className="retro-link">orders@operator.ink</a> or <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="retro-link">LinkedIn</a> to discuss.
        </motion.p>
      </main>
    </div>
  );
}
