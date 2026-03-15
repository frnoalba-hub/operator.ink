import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Zap, BarChart2, ArrowRight, Check, Mail, Shield, Lock, FileCheck } from 'lucide-react';
import { createPageUrl } from '@/utils';
import StickyNav from '../components/StickyNav';

const LINKEDIN_URL = "https://www.linkedin.com/in/francisco-albavc/";

const services = [
  {
    id: 'web-design',
    icon: Globe,
    title: 'Web Design & Operations',
    tagline: 'Conversion-first websites built to perform, scale, and operate.',
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
];

export default function Services() {
  return (
    <div className="min-h-screen retro-theme antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}>

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <StickyNav currentPage="services" />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-16">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:mb-20 max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--rgb-gradient)' }} />
            <span className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Core Services</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
            What We<br /><span className="retro-link-accent">Deploy.</span>
          </h1>
          <p className="text-lg text-[var(--retro-text-muted)] leading-relaxed max-w-2xl">
            Four integrated service lines engineered to capture demand, automate operations, and grow revenue. Built for businesses that are serious about scalable, systematic growth. <strong className="text-[var(--retro-text)]">Compliance-aware and safe for healthcare.</strong>
          </p>
        </motion.div>

        {/* Compliance & Security — safe to use */}
        <motion.div
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
        </motion.div>

        {/* Service Cards */}
        <div className="space-y-8">
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

                {/* Description */}
                <p className="text-[var(--retro-text-muted)] leading-relaxed mb-10 max-w-3xl text-base lg:text-lg">{svc.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Process */}
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-5">Process</h3>
                    <div className="space-y-5">
                      {svc.process.map((p) => (
                        <div key={p.step} className="flex gap-4">
                          <span className="text-xs font-bold mt-1 w-6 flex-shrink-0" style={{ color: 'var(--retro-text)' }}>{p.step}</span>
                          <div>
                            <p className="font-bold text-sm mb-1" style={{ color: 'var(--retro-text)' }}>{p.label}</p>
                            <p className="text-sm text-[var(--retro-text-muted)] leading-relaxed">{p.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Offerings */}
                  <div>
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
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">Ready to Deploy?</h2>
          <p className="text-[var(--retro-text-muted)] mb-8 max-w-xl mx-auto">Tell us your scope and we'll return a custom deployment plan with timeline and pricing.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${createPageUrl('Home')}#intake`}
              className="retro-rgb-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-extrabold text-base hover:opacity-95 transition-opacity"
            >
              Initialize Project <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:orders@operator.ink"
              className="retro-link inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border font-semibold text-base transition-colors"
              style={{ borderColor: 'var(--retro-border)' }}
            >
              <Mail className="w-4 h-4 opacity-70" /> orders@operator.ink
            </a>
          </div>
        </motion.div>

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
  );
}