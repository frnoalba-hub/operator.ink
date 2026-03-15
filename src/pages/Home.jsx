import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Search, Zap, BarChart2, Globe, LayoutDashboard } from 'lucide-react';
import { createPageUrl } from '@/utils';
import StickyNav from '../components/StickyNav';
import IntakeForm from '../components/intake/IntakeForm';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a891df439583825e4f7f0e/cc3b199f0_Untitled5.png";
const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";

const capabilities = [
  {
    icon: Globe,
    title: "Web Design & Operations",
    description: "Conversion-first operational websites engineered for speed, performance, and scalable growth.",
    wide: true
  },
  {
    icon: Search,
    title: "GEO, AEO & SEO Search",
    description: "Localized search strategies and content engineering to capture high-intent demand.",
    wide: false
  },
  {
    icon: Zap,
    title: "Workflows & AI Agents",
    description: "Custom automation and intelligent agents to eliminate manual tasks and lower cost-per-action.",
    wide: false
  },
  {
    icon: BarChart2,
    title: "Ads & Brand Identity",
    description: "Cohesive brand assets plus precision ad campaigns for scalable acquisition and efficient CAC.",
    wide: true
  }
];

export default function Home() {
  // Form state is now managed by IntakeForm component

  return (
    <div className="retro-theme min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}>

      {/* Tech grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Toast removed — success/error messages now inline in IntakeForm */}

      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-3 py-2 rounded-md z-50">
        Skip to content
      </a>

      <StickyNav currentPage="home" />

      <main id="main" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-10 lg:pb-16">

        {/* HERO — Demos at top */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 lg:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white">
            Digital Operations<br />
            <span className="retro-link-accent">&amp; Growth Systems.</span>
          </h1>
          <p className="mt-4 text-base text-[var(--retro-text-muted)] max-w-lg">
            Operational websites, GEO/AEO search, workflows, AI agents.
          </p>
        </motion.header>

        {/* DEMOS — unified at top */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-14 lg:mb-20"
        >
          <a
            href={createPageUrl('Demos')}
            className="block retro-card rounded-2xl overflow-hidden border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-all duration-200 group"
          >
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
                  <LayoutDashboard className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Demo</p>
                  <h3 className="text-base font-bold group-hover:text-[#00ccff] transition-colors">Admissions &amp; Bed Tracking Dashboard</h3>
                </div>
              </div>
              <div className="flex-1 min-w-0 flex gap-1.5 sm:gap-2">
                {[
                  { stage: 'Referral', patients: ['M. Johnson', 'R. Davis'] },
                  { stage: 'Clinical', patients: ['T. Chen'] },
                  { stage: 'Bed Offer', patients: ['L. Martinez'] },
                  { stage: 'Admitted', patients: ['J. Williams'] },
                  { stage: 'Denied', patients: [] },
                ].map((col, i) => (
                  <div key={i} className="flex-1 min-w-0 rounded-lg bg-black/40 border border-white/5 p-1.5 sm:p-2">
                    <p className="text-[8px] sm:text-[9px] text-white/40 truncate mb-1">{col.stage}</p>
                    {col.patients.length ? col.patients.map((name, j) => (
                      <div key={j} className="text-[9px] sm:text-[10px] text-white/80 truncate py-0.5 px-1 rounded bg-white/5 mb-0.5">{name}</div>
                    )) : (
                      <p className="text-[8px] text-white/25 italic">—</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 sm:border-l border-[var(--retro-border)] pt-3 sm:pt-0 sm:pl-4">
                <span className="text-[10px] text-[var(--retro-text-dim)]">Pipeline • Notifications • $3k pilot</span>
                <span className="text-sm font-semibold retro-link inline-flex items-center gap-1">
                  View brief <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </a>
        </motion.section>

        {/* CTAs + Why Operator.ink */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16 lg:mb-20"
        >
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-3">
              <a href="#intake" className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-6 rounded-xl text-sm hover:opacity-95" style={{ minHeight: '48px' }}>
                Deploy Request <ArrowRight className="w-4 h-4" />
              </a>
              <a href={createPageUrl('Services')} className="retro-link inline-flex items-center gap-2 px-6 rounded-xl border border-[var(--retro-border)] font-semibold text-sm hover:border-[var(--retro-border-bright)]" style={{ minHeight: '48px' }}>
                Services
              </a>
              <a href="mailto:orders@operator.ink" className="retro-link inline-flex items-center gap-2 px-6 rounded-xl border border-[var(--retro-border)] font-semibold text-sm hover:border-[var(--retro-border-bright)]" style={{ minHeight: '48px' }}>
                <Mail className="w-4 h-4 opacity-70" /> orders@operator.ink
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="retro-card rounded-2xl p-6">
              <h3 className="text-base font-bold mb-3">Why Operator.ink</h3>
              <ul className="space-y-2 text-sm text-[var(--retro-text-muted)]">
                {["Conversion-focused sites.", "GEO + AEO search.", "Agents & workflows.", "Precision ads."].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full" style={{ background: 'var(--rgb-gradient)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#intake" className="retro-rgb-btn mt-4 inline-flex items-center justify-center w-full rounded-lg text-sm py-3">
                Start Initialization
              </a>
              <p className="text-[10px] text-[var(--retro-text-dim)] mt-3 pt-3 border-t border-[var(--retro-border)]">
                Phase-0 Pilot $3k → <a href={createPageUrl('Demos')} className="retro-link">demos</a>
              </p>
            </div>
          </div>
        </motion.section>

        {/* CAPABILITIES BENTO GRID */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 lg:mb-20"
          aria-labelledby="capabilities-heading"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--rgb-gradient)' }} />
            <h2 id="capabilities-heading" className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.08 }}
                  className={`retro-card rounded-[32px] p-7 lg:p-8 ${cap.wide ? 'md:col-span-2' : ''}`}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{cap.title}</h3>
                  <p className="text-sm text-[var(--retro-text-muted)] leading-relaxed">{cap.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        {/* INTAKE FORM */}
        <motion.section
          id="intake"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-[var(--retro-border)] pt-14 pb-14"
          aria-labelledby="intake-heading"
        >
          <div>
            <h2 id="intake-heading" className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">System Initialization.</h2>
            <p className="text-[var(--retro-text-muted)] mb-8 leading-relaxed">
              Describe your scope and we'll return a custom deployment plan with timeline and next steps.
            </p>
            <div className="retro-card rounded-[28px] p-6">
              <p className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Direct Contact</p>
              <a href="mailto:orders@operator.ink" className="retro-link flex items-center gap-2 font-semibold mb-3" style={{ minHeight: '44px' }}>
                <Mail className="w-4 h-4 opacity-60" /> orders@operator.ink
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="retro-link flex items-center gap-2 font-semibold" style={{ minHeight: '44px' }}>
                <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                linkedin.com/in/francisco-albavc
              </a>
            </div>
          </div>

          <IntakeForm />
        </motion.section>

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--retro-text-dim)] border-t border-[var(--retro-border)] py-8"
        >
          <span>© {new Date().getFullYear()} Operator.ink — Systems Active.</span>
          <div className="flex items-center gap-4">
            <a href="mailto:orders@operator.ink" className="retro-link">orders@operator.ink</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="retro-link">LinkedIn</a>
          </div>
        </motion.footer>

      </main>
    </div>
  );
}