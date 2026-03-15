import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import { createPageUrl } from '@/utils';
import StickyNav from '../components/StickyNav';
import GridOverlay from '../components/GridOverlay';
import BackToHome from '../components/BackToHome';

const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";

export default function Demos() {
  return (
    <div className="retro-theme min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}>
      <GridOverlay />
      <StickyNav currentPage="demos" />
      <main className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <BackToHome />
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="retro-card rounded-2xl p-8 lg:p-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
              <LayoutDashboard className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admissions & Bed Tracking Dashboard</h1>
              <p className="text-sm text-[var(--retro-text-dim)]">For skilled nursing facilities</p>
            </div>
          </div>
          <p className="text-[var(--retro-text-muted)] mb-6">
            Coordinators track referrals through a 5-stage pipeline (Referral → Clinical → Bed Offer → Admitted/Denied). Pick payer (Medicare, HMO, Private), use flags, see who has beds. Admins view all coordinators + metrics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href={createPageUrl('Pilot')}
              className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-8 rounded-xl text-base font-bold"
              style={{ minHeight: '52px' }}
            >
              Get Pilot — $3,999
            </a>
            <a href="mailto:orders@operator.ink?subject=Admissions Dashboard" className="retro-link text-sm font-semibold">
              Ask a question →
            </a>
          </div>
        </motion.article>
      </main>
    </div>
  );
}
