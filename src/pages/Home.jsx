import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Search, Zap, BarChart2, Globe, MessageSquare, FileSearch, Wrench, Rocket } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SEO from '@/components/SEO';
import StickyNav from '../components/StickyNav';
import SummaryBox from '../components/SummaryBox';
import { ORGANIZATION_SCHEMA, FAQ_SCHEMA_HOME, HOWTO_SCHEMA } from '@/schemas/geo-schemas';
import IntakeForm from '../components/intake/IntakeForm';

const LOGO_URL = "/operator-logo.png";
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

const PIPELINE_STAGES = [
  { id: 'referral', label: 'Referral', patients: [{ name: 'M. Johnson', payer: 'Medicare', flag: 'New' }] },
  { id: 'clinical', label: 'Clinical', patients: [] },
  { id: 'bed', label: 'Bed Offer', patients: [{ name: 'L. Martinez', payer: 'HMO', flag: 'Prior Auth' }] },
  { id: 'admitted', label: 'Admitted', patients: [{ name: 'J. Williams', payer: 'Private', flag: 'Complete' }] },
  { id: 'denied', label: 'Discharged', patients: [] },
];

const HOME_TITLE = 'Operator.ink — Digital Operations & Growth Systems | GEO, AEO, SEO, AI Workflows';
const HOME_DESC = 'Operator.ink builds operational websites, GEO/AEO/SEO search strategies, AI workflows, and ads. Web design, local SEO, generative engine optimization, skilled nursing census tools.';

export default function Home() {
  const [movingCardStage, setMovingCardStage] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setMovingCardStage((s) => (s + 1) % 5);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <SEO
        title={HOME_TITLE}
        description={HOME_DESC}
        schema={[ORGANIZATION_SCHEMA, FAQ_SCHEMA_HOME, HOWTO_SCHEMA]}
        canonicalUrl="https://operator.ink/"
        ogImage="/operator-logo.png"
      />
      <div className="retro-theme min-h-screen antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }} role="document">

      {/* Tech grid overlay - decorative */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" aria-hidden="true"
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[400px] xl:max-w-[480px]">
              {/* Subtle premium glow behind the logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff3366]/10 to-[#00ccff]/10 blur-3xl rounded-full" />
              <img
                src={LOGO_URL}
                alt="Operator.ink"
                className="relative w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-4">
              Digital Operations
              <span className="retro-link-accent"> &amp; Growth Systems.</span>
            </h1>
            <p className="text-base sm:text-lg text-[var(--retro-text-muted)] max-w-xl">
              5 core service lines: Web Design, GEO/AEO/SEO Search, Workflows &amp; AI Agents, Ads &amp; Brand Identity, and Base44 Setup. Premium websites, managed hosting, custom AI agents. Phase-0 Pilot: $3,999. We build the digital infrastructure that scales your operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
               <Link to={createPageUrl('InventoryDashboard')} className="retro-rgb-btn inline-flex items-center justify-center px-6 h-12 rounded-xl text-sm font-bold hover:opacity-95 transition-all w-full sm:w-auto" aria-label="Try the dashboard demo">
                 Dashboard Demo <ArrowRight className="w-4 h-4 ml-2" />
               </Link>
               <a href="#intake" className="retro-link inline-flex items-center justify-center px-6 h-12 rounded-xl border border-[var(--retro-border)] font-semibold text-sm hover:border-[var(--retro-border-bright)] w-full sm:w-auto" aria-label="Request a custom dashboard">
                 Custom Dashboard Request
               </a>
            </div>
          </div>
        </motion.header>

        {/* Lead Paragraph — GEO: Direct answer for AI extraction (KDD '24) */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-14 lg:mb-16"
          aria-labelledby="lead-heading"
        >
          <h2 id="lead-heading" className="sr-only">What is Operator.ink</h2>
          <div className="retro-card rounded-[24px] p-6 lg:p-10 border-l-4 shadow-2xl" style={{ borderLeftColor: '#00ccff', background: 'var(--retro-bg-elevated)' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: '#00ccff' }} />
              <h3 className="text-xs uppercase tracking-widest font-bold" style={{ color: '#00ccff' }}>System Architecture & Mission</h3>
            </div>
            <p className="text-base sm:text-lg text-[var(--retro-text)] leading-relaxed">
              <strong>Operator.ink</strong> is a digital operations agency that builds conversion-focused websites, GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) search strategies, AI workflows, and precision ad campaigns. The agency offers 5 core service lines: Web Design &amp; Operations, GEO/AEO/SEO Search, Workflows &amp; AI Agents, Ads &amp; Brand Identity, and Base44 Setup. The process follows Brief → Discovery → Build → Launch. An optional Phase-0 Pilot costs $3,999 to validate before full engagement. All demos and pilots use synthetic data only. Operator.ink designs for healthcare and regulated industries with HIPAA considerations from the start. Contact: orders@operator.ink.
            </p>
          </div>
        </motion.section>

        <SummaryBox
          title="At a Glance"
          items={[
            'Operator.ink builds operational websites, GEO/AEO/SEO search strategies, AI workflows, and ads.',
            '5 service lines: Web Design, GEO/AEO/SEO Search, Workflows & AI Agents, Ads & Brand Identity, Base44 Setup.',
            'Process: Brief → Discovery → Build → Launch. Phase-0 Pilot $3,999 to validate fast.',
            'Compliance-aware: demos use synthetic data only. Safe for healthcare and regulated industries.',
          ]}
        />

        {/* Quotation — GEO: KDD '24 ~41% visibility lift for attributed quotes */}
        <blockquote
          className="retro-card rounded-2xl p-6 lg:p-8 mb-14 border-l-4"
          style={{ borderLeftColor: 'var(--retro-border-bright)' }}
          cite="https://www.linkedin.com/in/francisco-albavc/"
        >
          <p className="text-lg text-[var(--retro-text)] leading-relaxed mb-4">
            &ldquo;We build systems that work while you sleep. Every website, every workflow, every campaign — engineered for one outcome: your operations scale without you having to scale yourself.&rdquo;
          </p>
          <footer className="text-sm text-[var(--retro-text-muted)]">
            — <cite><strong>Francisco Alba</strong>, Founder, Operator.ink</cite>
          </footer>
        </blockquote>

        {/* CREATING WITH US — process */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-14 lg:mb-20"
          aria-labelledby="process-heading"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--rgb-gradient)' }} />
            <h2 id="process-heading" className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">
              Creating With Us
            </h2>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: MessageSquare, step: '01', title: 'Brief', desc: 'Share your scope, goals, and constraints. We align on outcomes and timeline.' },
              { icon: FileSearch, step: '02', title: 'Discovery', desc: 'We map your ops, audience, and tech. You get a clear deployment plan.' },
              { icon: Wrench, step: '03', title: 'Build', desc: 'Sprints, check-ins, and iterative delivery. You see progress, we ship.' },
              { icon: Rocket, step: '04', title: 'Launch', desc: 'Handoff, docs, and ongoing support. Systems active, you stay in control.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.06 }}
                  className="retro-card rounded-2xl p-5 lg:p-6"
                >
                  <div className="flex items-center gap-3 mb-3" aria-hidden>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--retro-border)]" style={{ background: 'var(--retro-bg-elevated)' }}>
                      <Icon className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
                    </div>
                    <span className="text-xs font-mono text-[var(--retro-text-dim)]">{item.step}</span>
                  </div>
                  <dt className="text-base font-bold mb-1.5">Step {item.step}: {item.title}</dt>
                  <dd className="text-sm text-[var(--retro-text-muted)] leading-relaxed m-0">{item.desc}</dd>
                </motion.div>
              );
            })}
          </dl>
          <p className="text-sm text-[var(--retro-text-dim)] mt-4">
            No endless discovery. No scope creep. We start with a Phase-0 Pilot when it fits — validate fast, then scale.
          </p>
        </motion.section>

        {/* FEATURED DEMO — clearly labeled */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-14 lg:mb-20"
          aria-labelledby="demo-heading"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--rgb-gradient)' }} />
            <h2 id="demo-heading" className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">
              Featured Project
            </h2>
          </div>
          <p className="text-sm text-[var(--retro-text-muted)] mb-4 max-w-xl">
            Live interactive environments demonstrating our custom workflows, from inventory command centers to skilled nursing admissions tracking.
          </p>
          
          <div className="grid grid-cols-1 gap-6 mb-8" role="list">
            {/* Project 1: Inventory Dashboard */}
            <article>
            <Link
              to={createPageUrl('InventoryDashboard')}
              className="block retro-card rounded-2xl overflow-hidden border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-all duration-200 group"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold group-hover:text-[#00ccff] transition-colors">Inventory & Sales Command Center</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#00ccff]/90 bg-[#00ccff]/10 rounded px-2 py-0.5 border border-[#00ccff]/30 uppercase font-bold tracking-wider">Live Demo</span>
                  </div>
                </div>
                
                <p className="text-sm text-[var(--retro-text-muted)] mb-4">
                  A high-performance MVP simulating logistics management. Try toggling between stock counts, detailed order tracking panes, and the omnichannel message inbox.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {['React', 'Motion', 'Responsive', 'Mock Data'].map((tag) => (
                    <span key={tag} className="text-xs font-bold text-[var(--retro-text-dim)] bg-[var(--retro-bg-elevated)] rounded border border-[var(--retro-border)] px-2 py-1 uppercase tracking-tight">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-semibold retro-link flex items-center gap-1 mt-auto">
                  Launch interactive demo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
            </article>

            {/* Project 2: SNF Admissions */}
          <article>
          <Link
            to={createPageUrl('Pilot')}
            className="block retro-card rounded-2xl overflow-hidden border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-all duration-200 group"
          >
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-base font-bold group-hover:text-[#00ccff] transition-colors">Admissions &amp; Bed Tracking Dashboard</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50 bg-white/5 rounded px-2 py-0.5">Coordinator: my pipeline</span>
                  <span className="text-xs text-[#00ccff]/90 bg-[#00ccff]/10 rounded px-2 py-0.5 border border-[#00ccff]/30">Admin: view all + metrics</span>
                </div>
              </div>
              <p className="text-xs text-white/40 mb-2 font-semibold">View all administrators:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['K. Smith', 'J. Lee', 'M. Chen', 'R. Davis', 'T. Park', '+5'].map((name) => (
                  <span key={name} className="text-xs font-bold text-white/70 bg-white/5 rounded px-2.5 py-1.5 border border-white/10 uppercase tracking-tight">
                    {name}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 min-h-[72px] overflow-x-auto hide-scrollbar pb-2">
                {PIPELINE_STAGES.map((col, i) => (
                  <div key={col.id} className="w-28 flex-shrink-0 md:flex-1 md:w-auto rounded-lg bg-black/40 border border-white/5 p-2">
                    <p className="text-[10px] md:text-xs text-white/40 font-bold truncate mb-1.5 border-b border-white/10 pb-1">{col.label}</p>
                    <div className="space-y-1">
                      {col.patients.map((p) => (
                        <div key={p.name} className="text-sm py-1.5 px-2 rounded bg-white/5 border border-white/5 shadow-sm">
                          <span className="text-white font-bold truncate block">{p.name}</span>
                          <span className="text-xs text-white/50 block font-medium uppercase tracking-tight">{p.payer}</span>
                          {p.flag && (
                            <span className={`text-[10px] mt-1 inline-block rounded px-1.5 py-0.5 font-black uppercase tracking-wider ${p.flag === 'Complete' ? 'bg-green-500/20 text-green-400' : p.flag === 'Prior Auth' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-white/60'}`}>
                              {p.flag}
                            </span>
                          )}
                        </div>
                      ))}
                      {i === movingCardStage && (
                        <motion.div
                          key="moving"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-sm py-1.5 px-2 rounded bg-[#00ccff]/10 border border-[#00ccff]/40 shadow-xl shadow-[#00ccff]/20"
                        >
                          <span className="text-[#00ccff] font-black block">R. Davis</span>
                          <span className="text-xs text-[#00ccff]/80 block font-bold uppercase tracking-tight">HMO</span>
                          <span className="text-[10px] mt-1 inline-block rounded px-1.5 py-0.5 bg-amber-500/30 text-amber-400 font-black uppercase tracking-wider">Prior Auth</span>
                        </motion.div>
                      )}
                      {col.patients.length === 0 && i !== movingCardStage && (
                        <span className="text-xs text-white/20 px-1">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--retro-text-dim)] mt-3">
                Flags: New, Prior Auth, Urgent, Complete • Finish & clear patients • Coordinators see who has beds, message each other
              </p>
              <span className="text-xs font-semibold retro-link inline-flex items-center gap-1 mt-2">
                View full brief <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
          </article>
          </div>
        </motion.section>

        {/* CTAs + Why Operator.ink */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16 lg:mb-20"
          aria-labelledby="cta-heading"
        >
          <div className="lg:col-span-7">
            <h2 id="cta-heading" className="sr-only">Get Started</h2>
            <div className="flex flex-wrap gap-3">
              <a href="#intake" className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-6 rounded-xl text-sm hover:opacity-95" style={{ minHeight: '48px' }}>
                Request Custom Dashboard <ArrowRight className="w-4 h-4" />
              </a>
              <Link to={createPageUrl('InventoryDashboard')} className="retro-link inline-flex items-center gap-2 px-6 rounded-xl border border-[var(--retro-border)] font-semibold text-sm hover:border-[var(--retro-border-bright)]" style={{ minHeight: '48px' }}>
                View Demo
              </Link>
              <a href="mailto:orders@operator.ink" className="retro-link inline-flex items-center gap-2 px-6 rounded-xl border border-[var(--retro-border)] font-semibold text-sm hover:border-[var(--retro-border-bright)]" style={{ minHeight: '48px' }}>
                <Mail className="w-4 h-4 opacity-70" /> orders@operator.ink
              </a>
            </div>
          </div>
          <aside className="lg:col-span-5" aria-labelledby="why-heading">
            <div className="retro-card rounded-2xl p-6">
              <h2 id="why-heading" className="text-base font-bold mb-3">Why Operator.ink</h2>
              <ul className="space-y-2 text-sm text-[var(--retro-text)]">
                {["Premium website design.", "Managed fast hosting.", "Conversion-focused sites.", "GEO + AEO search.", "Agents & workflows.", "Precision ads.", "Client Portal — upload assets & notes.", "Compliance-aware & safe for healthcare."].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full" style={{ background: 'var(--rgb-gradient)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#intake" className="retro-rgb-btn mt-4 inline-flex items-center justify-center w-full rounded-lg text-sm py-3">
                Start Initialization
              </a>
              <p className="text-xs text-[var(--retro-text-muted)] mt-3 pt-3 border-t border-[var(--retro-border)]">
                Phase-0 Pilot $3,999 → <Link to={createPageUrl('Pilot')} className="retro-link">Pilot</Link>
              </p>
            </div>
          </aside>
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-[var(--retro-border)] pt-14 pb-14 scroll-mt-24"
          aria-labelledby="intake-heading"
        >
          <div>
            <h2 id="intake-heading" className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">System Initialization.</h2>
            <p className="text-[var(--retro-text-muted)] mb-8 leading-relaxed">
              Describe your scope and receive a custom deployment plan with timeline and next steps.
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
    </>
  );
}