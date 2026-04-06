import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Search, Zap, BarChart2, Globe, MessageSquare, FileSearch, Wrench, Rocket, ExternalLink } from 'lucide-react';
import { createPageUrl } from '@/utils';
import SEO from '@/components/SEO';
import StickyNav from '../components/StickyNav';
import SummaryBox from '../components/SummaryBox';
import { ORGANIZATION_SCHEMA, FAQ_SCHEMA_HOME, HOWTO_SCHEMA } from '@/schemas/geo-schemas';
import IntakeForm from '../components/intake/IntakeForm';

const LOGO_URL = "/operator-logo.png";
const FOUNDER_PHOTO_URL = "/founder.png";
const LINKEDIN_URL = "https://www.linkedin.com/in/franciscoalbavc/";

const ventures = [
  { title: 'Operator.ink', subtitle: 'AI operations platform', href: 'https://operator.ink', external: false },
  { title: 'Dental Core Supplies', subtitle: 'Dental equipment e-commerce', href: 'https://github.com/frnoalba-hub/dentalcore', external: true },
  { title: 'Outright Landscape', subtitle: 'Commercial/residential construction', href: 'https://outrightlandscape.com', external: true },
  { title: 'Dr. Jose Dental', subtitle: 'Tijuana dental implants', href: 'https://github.com/frnoalba-hub/tijuana-dental-implants', external: true },
  { title: 'G8 Solar', subtitle: 'Solar energy services', href: 'https://github.com/frnoalba-hub/g8-solar', external: true },
];

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

const HOME_TITLE = 'Operator.ink — Digital Operations & Growth Systems | GEO, AEO, SEO, AI Workflows';
const HOME_DESC = 'Operator.ink is a digital operations agency building AI workflows, automated systems, operational websites, and GEO/AEO/SEO strategies across 6 concurrent business lines.';

export default function Home() {
  const [founderImgFailed, setFounderImgFailed] = useState(false);

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
              We ship AI workflows, automation, operational sites, and GEO/AEO/SEO so ops move faster with less manual work. Built for operators who want execution—see{' '}
              <Link to={createPageUrl('Services')} className="retro-link font-semibold text-[var(--retro-text)]">Services</Link>
              {' '}for the full stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
               <a href="#intake" className="retro-rgb-btn inline-flex items-center justify-center px-6 h-12 rounded-xl text-sm font-bold hover:opacity-95 transition-all w-full sm:w-auto" aria-label="Get in touch about your project">
                 Get in touch <ArrowRight className="w-4 h-4 ml-2" />
               </a>
               <Link to={createPageUrl('InventoryDashboard')} className="retro-link inline-flex items-center justify-center px-6 h-12 rounded-xl border border-[var(--retro-border)] font-semibold text-sm hover:border-[var(--retro-border-bright)] w-full sm:w-auto" aria-label="See a live operations sample dashboard">
                 See a live sample
               </Link>
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
              <strong>Operator.ink</strong> is a digital operations agency: conversion-led sites, GEO/AEO/SEO, AI workflows, and disciplined ad spend—plus Base44 architecture when that is your platform. <strong className="text-[var(--retro-text)]">How we work:</strong> Brief → Discovery → Build → Launch. Public demos use synthetic data; production work respects your compliance needs.{' '}
              <a href="mailto:orders@operator.ink" className="retro-link font-semibold">orders@operator.ink</a>
            </p>
          </div>
        </motion.section>

        <SummaryBox
          title="At a Glance"
          items={[
            'Outcome: fewer manual handoffs, clearer acquisition, and sites engineered to convert—not just look sharp.',
            'One engagement rhythm (Brief → Discovery → Build → Launch); validation sprint when scope calls for it.',
            'Full stack lives on the Services page—avoiding a second rerun of every line item here.',
            'Regulated sectors: we treat demos as synthetic-by-default and scope real data carefully.',
          ]}
        />

        {/* About the Operator */}
        <motion.section
          id="about-operator"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="mb-14 lg:mb-16 scroll-mt-24"
          aria-labelledby="about-operator-heading"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--rgb-gradient)' }} />
            <h2 id="about-operator-heading" className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">
              About the Operator
            </h2>
          </div>
          <div className="retro-card rounded-[24px] p-6 lg:p-10 border border-[var(--retro-border)] flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              {!founderImgFailed ? (
                <div
                  className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-[var(--retro-border)] shadow-xl select-none [contain:paint]"
                  style={{ WebkitTouchCallout: 'none' }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={FOUNDER_PHOTO_URL}
                    alt="Francisco Alba, founder of Operator.ink"
                    width={160}
                    height={160}
                    draggable={false}
                    decoding="async"
                    onDragStart={(e) => e.preventDefault()}
                    className="w-full h-full object-cover object-top pointer-events-none select-none"
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      WebkitUserDrag: 'none',
                    }}
                    onError={() => setFounderImgFailed(true)}
                  />
                </div>
              ) : (
                <div
                  className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl flex items-center justify-center text-2xl font-extrabold tracking-tight border border-[var(--retro-border)]"
                  style={{ background: 'linear-gradient(135deg, rgba(255,51,102,0.2), rgba(0,204,255,0.15))' }}
                  aria-hidden
                >
                  FA
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base sm:text-lg text-[var(--retro-text)] leading-relaxed mb-5">
                Founded by <strong>Francisco Alba</strong>, a self-taught AI practitioner since the day ChatGPT launched. 5+ years of sales operations experience at DoWell Dental Products, working with enterprise DSOs like Affordable Dentures and Sevaredent. Now running AI operations, workflow automation, and growth systems across 6 concurrent business lines. Working daily across Claude, Gemini, Cursor, Antigravity, and Composer. Consistently 6–8+ months ahead of mainstream AI adoption.
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-link inline-flex items-center gap-2 font-semibold text-sm"
              >
                <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn — Francisco Alba
              </a>
            </div>
          </div>
        </motion.section>

        {/* Quotation — GEO: KDD '24 ~41% visibility lift for attributed quotes */}
        <blockquote
          className="retro-card rounded-2xl p-6 lg:p-8 mb-14 border-l-4"
          style={{ borderLeftColor: 'var(--retro-border-bright)' }}
          cite={LINKEDIN_URL}
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
            No endless discovery. No scope creep. When scope fits, we validate with a focused sprint—then scale.
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
            Live sample: inventory, orders, and inbox in one operational surface—same stack we use on client builds.
          </p>

          <div className="grid grid-cols-1 gap-6 mb-8" role="list">
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
              <a href="mailto:orders@operator.ink" className="retro-link inline-flex items-center gap-2 px-6 rounded-xl border border-[var(--retro-border)] font-semibold text-sm hover:border-[var(--retro-border-bright)]" style={{ minHeight: '48px' }} title="Business inquiries">
                <Mail className="w-4 h-4 opacity-70" /> Get in touch — orders@operator.ink
              </a>
            </div>
          </div>
          <aside className="lg:col-span-5" aria-labelledby="why-heading">
            <div className="retro-card rounded-2xl p-6">
              <h2 id="why-heading" className="text-base font-bold mb-3">Why Operator.ink</h2>
              <ul className="space-y-2 text-sm text-[var(--retro-text)]">
                {['Client Portal for briefs, files, and notes.', 'Hosting and performance treated as product, not an afterthought.', 'Compliance-aware delivery—demos stay synthetic; prod follows your rules.', 'One partner across web, search, automation, and ads so messaging stays coherent.'].map((item, i) => (
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
                <Link to={createPageUrl('Pilot')} className="retro-link">Pilot program</Link> — scoped operations dashboard sample (details on request).
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

        {/* Ventures / proof of work */}
        <motion.section
          id="ventures"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mb-16 lg:mb-20 scroll-mt-24"
          aria-labelledby="ventures-heading"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--rgb-gradient)' }} />
            <h2 id="ventures-heading" className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Ventures</h2>
          </div>
          <p className="text-sm text-[var(--retro-text-muted)] mb-6 max-w-2xl">
            Live properties and repos shipped on <strong className="text-[var(--retro-text)]">Base44 + Vite + React</strong>, with GitHub CI/CD and Vercel deployment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" role="list">
            {ventures.map((v) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold tracking-tight group-hover:text-[#00ccff] transition-colors">{v.title}</h3>
                    {v.external ? (
                      <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-90 mt-1" aria-hidden />
                    ) : null}
                  </div>
                  <p className="text-sm text-[var(--retro-text-muted)] leading-relaxed m-0">{v.subtitle}</p>
                  <p className="text-xs font-mono text-[var(--retro-text-dim)] mt-3 truncate">{v.href.replace(/^https:\/\//, '')}</p>
                </>
              );
              const cardClass = 'block retro-card rounded-2xl p-5 lg:p-6 border border-[var(--retro-border)] hover:border-[var(--retro-border-bright)] transition-all duration-200 group h-full';
              return (
                <article key={v.title} className="h-full" role="listitem">
                  <a
                    href={v.href}
                    className={cardClass}
                    {...(v.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {inner}
                  </a>
                </article>
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
              <p className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Get in touch</p>
              <a href="mailto:orders@operator.ink" className="retro-link flex items-center gap-2 font-semibold mb-1" style={{ minHeight: '44px' }}>
                <Mail className="w-4 h-4 opacity-60" /> orders@operator.ink
              </a>
              <p className="text-xs text-[var(--retro-text-dim)] mb-4">Business inquiries &amp; project scope</p>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="retro-link flex items-center gap-2 font-semibold" style={{ minHeight: '44px' }}>
                <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                linkedin.com/in/franciscoalbavc
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