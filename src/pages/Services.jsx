import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Zap, BarChart2, ArrowRight, Check, Mail, Shield, Lock, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import SEO from '@/components/SEO';
import StickyNav from '../components/StickyNav';
import SummaryBox from '../components/SummaryBox';
import { ORGANIZATION_SCHEMA, SERVICE_SCHEMAS, FAQ_SCHEMA_SERVICES, GEO_CITATION_URLS } from '@/schemas/geo-schemas';
import GridOverlay from '../components/GridOverlay';

const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";
const SERVICES_TITLE = 'Services — Web Design, GEO, AEO & SEO, AI Workflows, Ads | Operator.ink';
const SERVICES_DESC = 'Web design, GEO/AEO/SEO search optimization, AI workflows, ads & brand identity. Conversion-focused websites, generative engine optimization, answer engine optimization, local SEO, technical SEO.';

const services = [
  {
    id: 'web-design',
    icon: Globe,
    title: 'Web Design & Operations',
    tagline: 'Conversion-first websites built to perform, scale, and operate.',
    problem: 'Websites that look nice but don\'t convert waste traffic and budget. Generic templates fail to capture leads and confuse visitors.',
    solution: 'We build operational systems: conversion architecture, speed-first design, and analytics from day one. Every page engineered for action.',
    uniqueInsight: 'Operator.ink sites ship with GEO-ready structure and compliance-aware design — no retrofits later.',
    color: 'text-cyan-400',
    border: 'border-cyan-400/20',
    glow: 'hover:shadow-[0_18px_60px_rgba(6,182,212,0.08)]',
    description:
      'We don\'t build websites — we build operational systems that generate leads and revenue. Every pixel is engineered for speed, clarity, and conversion. From landing pages to full-scale web platforms, we deploy sites that work as hard as you do.',
    process: [
      { step: '01', label: 'Discovery & Strategy', detail: 'We audit your market, competitors, and goals to map out a conversion architecture before writing a single line of code.' },
      { step: '02', label: 'Design & Build', detail: 'Clean, fast, mobile-first design using modern frameworks. Accessible, SEO-ready, and optimized for Core Web Vitals.' },
      { step: '03', label: 'Launch & Iterate', detail: 'Staged rollout with A/B testing infrastructure built in. We monitor performance and iterate based on real user data.' },
    ],
    offerings: [
      'Conversion-optimized landing pages',
      'Full business websites & portfolios',
      'Service & product showcase pages',
      'Speed & performance audits',
      'CMS integration (Webflow, WordPress, custom)',
      'Ongoing maintenance & operations',
    ],
  },
  {
    id: 'seo',
    icon: Search,
    title: 'GEO, AEO & SEO Search',
    tagline: 'Dominate search in every format — classic, local, and AI-generated.',
    problem: 'Traditional SEO misses AI-generated summaries (ChatGPT, Perplexity). Sites optimized only for Google lose visibility when users ask AI.',
    solution: 'GEO + AEO + SEO: structured content, schema markup, E-E-A-T signals that satisfy both crawlers and AI summarizers. One strategy, every surface.',
    uniqueInsight: 'Operator.ink runs GEO on its own site. We use what we sell — and iterate on real ranking data.',
    color: 'text-violet-400',
    border: 'border-violet-400/20',
    glow: 'hover:shadow-[0_18px_60px_rgba(139,92,246,0.08)]',
    description:
      'Search is evolving fast. Beyond traditional SEO, we engineer content and site architecture to capture Generative Engine Optimization (GEO) results — appearing in AI-generated summaries — and Answer Engine Optimization (AEO) to own featured snippets and voice search. We cover the full spectrum so you capture demand wherever it surfaces.',
    process: [
      { step: '01', label: 'Keyword & Intent Mapping', detail: 'Deep research into high-intent keywords, local modifiers, and the question-based queries that AI engines surface.' },
      { step: '02', label: 'Content Engineering', detail: 'Structured content with schema markup, topical authority clusters, and E-E-A-T signals that satisfy both crawlers and AI summarizers.' },
      { step: '03', label: 'Authority & Link Building', detail: 'Targeted outreach and digital PR to build backlink equity and establish domain authority in your niche.' },
    ],
    offerings: [
      'Technical SEO audits & fixes',
      'Local & Geo-targeted SEO',
      'GEO (Generative Engine Optimization)',
      'AEO (Answer Engine Optimization)',
      'Content strategy & creation',
      'Monthly ranking reports',
    ],
  },
  {
    id: 'workflows',
    icon: Zap,
    title: 'Workflows & AI Agents',
    tagline: 'Eliminate manual work with intelligent automation and custom AI.',
    problem: 'Manual tasks (follow-ups, data entry, reporting) eat hours. Hiring more people doesn\'t scale; automation that breaks every month wastes time.',
    solution: 'Custom AI agents and no-code workflows (Make, n8n, Zapier) that run 24/7. We document your operations first, then automate the bottlenecks.',
    uniqueInsight: 'Compliance-aware by default. Demos use synthetic data only — safe for healthcare and regulated industries.',
    color: 'text-yellow-400',
    border: 'border-yellow-400/20',
    glow: 'hover:shadow-[0_18px_60px_rgba(234,179,8,0.08)]',
    description:
      'Your team\'s time is your most valuable asset. We map your operations, identify bottleneck tasks, and deploy custom AI agents and automated workflows that handle them automatically — 24/7, without errors. From lead nurturing to internal reporting, we build systems that free your people to focus on high-value work.',
    process: [
      { step: '01', label: 'Operations Audit', detail: 'We document your current workflows, identify manual tasks, and calculate the time and cost drain of each.' },
      { step: '02', label: 'Agent & Automation Design', detail: 'Custom AI agents and no-code/low-code workflows designed for your exact stack (Make, n8n, Zapier, custom APIs).' },
      { step: '03', label: 'Deploy & Monitor', detail: 'Live deployment with monitoring dashboards so you can see exactly what your agents are doing and the hours they\'re saving.' },
    ],
    offerings: [
      'Lead capture & CRM automation',
      'AI customer support agents',
      'Internal reporting & data pipelines',
      'Email & follow-up sequences',
      'Document processing & summarization',
      'Custom API integrations',
    ],
  },
  {
    id: 'ads',
    icon: BarChart2,
    title: 'Ads & Brand Identity',
    tagline: 'Cohesive brand systems paired with precision paid acquisition.',
    problem: 'Weak brands and generic ad creative leak CAC. Inconsistent messaging across channels confuses buyers and burns budget.',
    solution: 'Cohesive visual identity + ICP-focused copy + multi-channel campaigns (Meta, Google, LinkedIn). Weekly optimization to scale winners.',
    uniqueInsight: 'We align ads with your GEO/SEO content so paid and organic reinforce the same story.',
    color: 'text-rose-400',
    border: 'border-rose-400/20',
    glow: 'hover:shadow-[0_18px_60px_rgba(251,113,133,0.08)]',
    description:
      'A great product with a weak brand leaks revenue. We build cohesive visual identities that communicate trust and authority, then back them with data-driven ad campaigns that acquire customers at scale. Every creative asset, every ad dollar, optimized toward a single goal: profitable growth.',
    process: [
      { step: '01', label: 'Brand Foundation', detail: 'Logo, color system, typography, and messaging that positions you clearly against competitors and resonates with your target buyer.' },
      { step: '02', label: 'Creative & Copy', detail: 'Ad creatives, landing page copy, and offer framing built around your ICP\'s specific pain points and decision triggers.' },
      { step: '03', label: 'Campaign Launch & Optimization', detail: 'Multi-channel launch (Meta, Google, LinkedIn) with weekly optimization cycles to reduce CAC and scale winning creatives.' },
    ],
    offerings: [
      'Logo & visual identity design',
      'Brand guidelines & asset kits',
      'Google Ads (Search & Display)',
      'Meta Ads (Facebook & Instagram)',
      'LinkedIn Ads for B2B',
      'Monthly performance reporting',
    ],
  },
  {
    id: 'base44',
    icon: Globe,
    title: 'Base44 Setup & Consultation',
    tagline: 'Get your own high-converting platform running on Base44.',
    problem: 'New platforms are overwhelming. Wrong architecture from day one leads to rework and wasted time.',
    solution: 'Guided architecture and 1-on-1 consultation. We structure your Base44 environment so operations scale cleanly.',
    uniqueInsight: 'Operator.ink runs on Base44. We\'re not reselling a tool we don\'t use — we advise from real experience.',
    color: 'text-[#00E5FF]',
    border: 'border-[#00E5FF]/20',
    glow: 'hover:shadow-[0_18px_60px_rgba(0,229,255,0.08)]',
    description:
      'We build our ventures on Base44 because it provides the speed, reliability, and tools needed for scalable operations. While you can sign up on your own, setting up a new operational system correctly from day one saves countless hours later.',
    process: [
      { step: '01', label: 'Platform Selection', detail: 'We recommend Base44 for its robust infrastructure. You can explore it yourself using our referral link.' },
      { step: '02', label: 'Architecture Planning', detail: 'If you need help, we offer strategic consulting to structure your environment, workflows, and integrations.' },
      { step: '03', label: 'Guided Setup', detail: 'A dedicated consultation to ensure your domain, DNS, and baseline operations are configured perfectly.' },
    ],
    offerings: [
      'Base44 environment architecture',
      'Operational workflow design',
      'System integration planning',
      '1-on-1 setup consultation',
    ],
    // Custom action buttons for this specific service card
    actions: [
      {
        label: 'Explore Base44',
        href: 'https://base44.pxf.io/c/6842739/2049275/25619?trafcat=base',
        primary: false,
      },
      {
        label: 'Book Setup Call',
        href: 'https://cal.com/francisco-alba-4b06or/15min',
        primary: true,
      }
    ]
  },
];

export default function Services() {
  return (
    <>
      <SEO
        title={SERVICES_TITLE}
        description={SERVICES_DESC}
        canonicalUrl="https://operator.ink/Services"
        schema={[ORGANIZATION_SCHEMA, ...SERVICE_SCHEMAS, FAQ_SCHEMA_SERVICES]}
      />
      <div className="min-h-screen retro-theme antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }} role="document">

      <GridOverlay />

      <StickyNav currentPage="services" />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16">

        {/* Page Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20 max-w-3xl"
          aria-label="Services overview"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--rgb-gradient)' }} />
            <span className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Core Services</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            What We<br /><span className="retro-link-accent">Deploy.</span>
          </h1>
          <p className="text-lg text-[var(--retro-text-muted)] leading-relaxed max-w-2xl">
            Five core service lines engineered to capture demand, automate operations, and grow revenue: Web Design, GEO/AEO/SEO Search, Workflows &amp; AI Agents, Ads &amp; Brand Identity, and Base44 Setup. Phase-0 Pilot: $3,999 to validate before full engagement. Built for businesses serious about scalable growth. <strong className="text-[var(--retro-text)]">Compliance-aware and safe for healthcare.</strong>
          </p>
        </motion.header>

        <SummaryBox
          title="Services Summary"
          items={[
            '5 core service lines. Phase-0 Pilot: $3,999 to validate before full build.',
            'Web Design & Operations — conversion-first websites that generate leads.',
            'GEO, AEO & SEO — appear in AI summaries (ChatGPT, Perplexity), featured snippets, and traditional search.',
            'Workflows & AI Agents — automate manual tasks 24/7 (Make, n8n, Zapier, custom APIs).',
            'Ads & Brand Identity — cohesive brand + precision campaigns (Meta, Google, LinkedIn).',
            'Base44 Setup — guided architecture and 1-on-1 consultation.',
          ]}
        />

        {/* Glossary — Cite Sources (KDD '24): link technical terms to authoritative sources */}
        <motion.section
          id="glossary"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="mb-16"
          aria-labelledby="glossary-heading"
        >
          <h2 id="glossary-heading" className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">Term Definitions</h2>
          <dl className="retro-card rounded-2xl p-6 lg:p-8 space-y-4 text-sm">
            <div>
              <dt className="font-bold text-[var(--retro-text)] mb-1">
                <a href={GEO_CITATION_URLS.kddPaper} target="_blank" rel="noopener noreferrer" className="retro-link underline underline-offset-2">GEO (Generative Engine Optimization)</a>
              </dt>
              <dd className="text-[var(--retro-text-muted)] leading-relaxed m-0">
                Optimizing web content so AI systems (ChatGPT, Perplexity, Google AI Overviews) select, cite, and quote your content in synthesized answers. Defined in the KDD &apos;24 paper by Aggarwal et al.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[var(--retro-text)] mb-1">AEO (Answer Engine Optimization)</dt>
              <dd className="text-[var(--retro-text-muted)] leading-relaxed m-0">
                Optimizing content to capture featured snippets and voice search. Extends traditional SEO for answer engines and smart assistants.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-[var(--retro-text)] mb-1">
                <a href={GEO_CITATION_URLS.googleEeat} target="_blank" rel="noopener noreferrer" className="retro-link underline underline-offset-2">E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)</a>
              </dt>
              <dd className="text-[var(--retro-text-muted)] leading-relaxed m-0">
                Google&apos;s quality framework for evaluating content. We engineer E-E-A-T signals (author attribution, citations, factual statements) so both crawlers and AI summarizers recognize authority.
              </dd>
            </div>
          </dl>
        </motion.section>

        {/* Compliance & Security — safe to use */}
        <motion.section
          id="compliance"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5" style={{ color: 'var(--retro-border-bright)' }} />
            <h2 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Compliance &amp; Security</h2>
          </div>
          <div className="retro-card rounded-2xl p-6 lg:p-8 space-y-6">
            <p className="text-sm text-[var(--retro-text-muted)] leading-relaxed max-w-3xl">
              <strong className="text-[var(--retro-text)]">Safe for healthcare and regulated industries.</strong> Here&apos;s how we keep your data and operations secure:
            </p>
            <ul className="space-y-4 text-sm text-[var(--retro-text-muted)]">
              <li className="flex gap-3">
                <Lock className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--retro-border-bright)' }} />
                <div>
                  <strong className="text-[var(--retro-text)]">Demos &amp; pilots use synthetic data only.</strong> No real PHI, no real patient names, no sensitive information. You can evaluate our work with zero risk to your data.
                </div>
              </li>
              <li className="flex gap-3">
                <FileCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--retro-border-bright)' }} />
                <div>
                  <strong className="text-[var(--retro-text)]">Client data is handled with care.</strong> When you provide data for build or integration: encrypted in transit and at rest, access-controlled, and only used for the agreed scope.
                </div>
              </li>
              <li className="flex gap-3">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--retro-border-bright)' }} />
                <div>
                  <strong className="text-[var(--retro-text)]">HIPAA-aware workflows.</strong> For healthcare clients: we design for HIPAA considerations from the start. Phase-0 pilots stay in synthetic data; production deployments follow your BAA and security requirements.
                </div>
              </li>
            </ul>
            <p className="text-xs text-[var(--retro-text-dim)] pt-2 border-t border-[var(--retro-border)]">
              <strong>Bottom line:</strong> You can safely try our demos and pilots. When you&apos;re ready to deploy with real data, we work within your compliance framework.
            </p>
          </div>
        </motion.section>

        {/* Service Cards */}
        <div className="space-y-8" role="list">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.section
                key={svc.id}
                id={svc.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + idx * 0.1 }}
                className={`rounded-[32px] border ${svc.border} p-8 lg:p-12 transition-all duration-300 ${svc.glow}`}
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))' }}
              >
                {/* Header */}
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
                    <Icon className="w-7 h-7" style={{ color: 'var(--retro-text)' }} />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-1">{svc.title}</h2>
                    <p className="text-sm font-semibold text-[var(--retro-text-muted)]">{svc.tagline}</p>
                  </div>
                </div>

                {/* Problem → Solution → Unique Insight (GEO-friendly structure) */}
                {svc.problem && svc.solution && svc.uniqueInsight && (
                  <dl className="space-y-4 mb-10 text-sm max-w-3xl">
                    <div>
                      <dt className="font-bold text-[var(--retro-text)] mb-1">Problem</dt>
                      <dd className="text-[var(--retro-text-muted)] leading-relaxed">{svc.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-[var(--retro-text)] mb-1">Expert Solution</dt>
                      <dd className="text-[var(--retro-text-muted)] leading-relaxed">{svc.solution}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-[var(--retro-text)] mb-1">Operator.ink Angle</dt>
                      <dd className="text-[var(--retro-text-muted)] leading-relaxed">{svc.uniqueInsight}</dd>
                    </div>
                  </dl>
                )}

                {/* Description */}
                <p className="text-[var(--retro-text-muted)] leading-relaxed mb-10 max-w-3xl text-base lg:text-lg">{svc.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Process — dl/dt/dd for GEO AI extraction */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-5">Process</h3>
                    <dl className="space-y-5">
                      {svc.process.map((p) => (
                        <div key={p.step} className="flex gap-4">
                          <span className="text-xs font-bold mt-1 w-6 flex-shrink-0" style={{ color: 'var(--retro-text)' }} aria-hidden>{p.step}</span>
                          <div>
                            <dt className="font-bold text-sm mb-1" style={{ color: 'var(--retro-text)' }}>{p.label}</dt>
                            <dd className="text-sm text-[var(--retro-text-muted)] leading-relaxed m-0">{p.detail}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Offerings */}
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <h3 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-5">Specific Offerings</h3>
                      <ul className="space-y-3">
                        {svc.offerings.map((o) => (
                          <li key={o} className="flex items-center gap-3 text-sm text-[var(--retro-text-muted)]">
                            <Check className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--retro-text)' }} />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Custom Actions (if any) */}
                    {svc.actions && (
                      <div className="mt-8 pt-8 border-t border-[var(--retro-border)] flex flex-col sm:flex-row gap-3">
                        {svc.actions.map((action, actionIdx) => (
                           <a
                             key={actionIdx}
                             href={action.href}
                             target={action.href.startsWith("http") ? "_blank" : undefined}
                             rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                             className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                               action.primary
                                 ? "text-white bg-white/10 hover:bg-white/20 border border-white/10"
                                 : "text-[#00E5FF] bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/20"
                             }`}
                           >
                             {action.label} {action.href.startsWith("http") && <ArrowRight className="w-4 h-4" />}
                           </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
          aria-labelledby="cta-heading"
        >
          <h2 id="cta-heading" className="text-3xl lg:text-4xl font-extrabold mb-4">Ready to Deploy?</h2>
          <p className="text-[var(--retro-text-muted)] mb-8 max-w-xl mx-auto">Submit your scope and receive a custom deployment plan with timeline and pricing.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`${createPageUrl('Home')}#intake`}
              className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-extrabold text-base hover:opacity-95 transition-opacity"
            >
              Initialize Project <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:orders@operator.ink"
              className="retro-link inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border font-semibold text-base transition-colors"
              style={{ borderColor: 'var(--retro-border)' }}
            >
              <Mail className="w-4 h-4 opacity-70" /> orders@operator.ink
            </a>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--retro-text-dim)] border-t border-[var(--retro-border)] py-8 mt-16">
          <span>© {new Date().getFullYear()} Operator.ink — Systems Active.</span>
          <div className="flex items-center gap-4">
            <a href="mailto:orders@operator.ink" className="retro-link">orders@operator.ink</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="retro-link">LinkedIn</a>
          </div>
        </footer>

      </main>
    </div>
    </>
  );
}