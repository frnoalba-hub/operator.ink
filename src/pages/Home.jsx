import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, ArrowRight, Search, Zap, BarChart2, Globe, LayoutDashboard } from 'lucide-react';
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

        {/* HERO */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16 lg:mb-20"
        >
          <div className="lg:col-span-7">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Digital Operations<br />
              <span className="retro-link-accent">&amp; Growth Systems.</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--retro-text-muted)] max-w-xl leading-relaxed">
              We design operational websites, engineer GEO/AEO search dominance, build workflow automation, and deploy custom AI agents that scale your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#intake"
                className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-8 rounded-2xl text-base hover:opacity-95 transition-opacity"
                style={{ minHeight: '56px' }}
              >
                Deploy Request <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={createPageUrl('Services')}
                className="retro-link inline-flex items-center justify-center gap-2 px-8 rounded-2xl border border-[var(--retro-border)] font-semibold text-base hover:border-[var(--retro-border-bright)] transition-colors"
                style={{ minHeight: '56px' }}
              >
                View Services <ArrowRight className="w-4 h-4 opacity-70" />
              </a>
              <a
                href="mailto:orders@operator.ink"
                className="retro-link inline-flex items-center justify-center gap-2 px-8 rounded-2xl border border-[var(--retro-border)] font-semibold text-base hover:border-[var(--retro-border-bright)] transition-colors"
                style={{ minHeight: '56px' }}
              >
                <Mail className="w-4 h-4 opacity-70" /> orders@operator.ink
              </a>
            </div>
          </div>

          {/* Value Panel + Featured Demo */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Featured Demo — admissions / skilled nursing */}
            <a
              href={createPageUrl('Demos')}
              className="retro-card rounded-[24px] p-5 lg:p-6 flex items-start gap-4 hover:border-[var(--retro-border-bright)] transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
                <LayoutDashboard className="w-6 h-6" style={{ color: 'var(--retro-text)' }} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-1">Featured Demo</p>
                <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--retro-border-bright)] transition-colors">Admissions &amp; Bed Tracking Dashboard</h3>
                <p className="text-sm text-[var(--retro-text-muted)] mb-3">For admissions coordinators &amp; skilled nursing facilities. Pipeline, patient cards, analytics.</p>
                <span className="text-sm font-semibold retro-link inline-flex items-center gap-2">
                  View Demo Brief <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
            <div className="retro-card rounded-[32px] p-7 lg:p-8">
              <h3 className="text-xl font-bold mb-4">Why Operator.ink</h3>
              <ul className="space-y-3 text-sm text-[var(--retro-text-muted)]">
                {[
                  "Conversion-focused operational websites.",
                  "Localized GEO + AEO strategies for high-intent traffic.",
                  "Custom agents and workflows to remove manual work.",
                  "Precision ad campaigns for scalable acquisition."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--rgb-gradient)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#intake"
                className="retro-rgb-btn mt-6 inline-flex items-center justify-center w-full rounded-xl text-sm"
                style={{ minHeight: '52px' }}
              >
                Start Initialization
              </a>
            </div>
          </div>
        </motion.header>

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