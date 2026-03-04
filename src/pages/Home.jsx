import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail, Linkedin, ArrowRight, Search, Zap, BarChart2, Globe } from 'lucide-react';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a891df439583825e4f7f0e/d4d1a3a71_Untitled3.png";
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
  const [formData, setFormData] = useState({ clientName: '', clientEmail: '', clientNeeds: '' });
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      clientName: localStorage.getItem('clientName') || '',
      clientEmail: localStorage.getItem('clientEmail') || '',
      clientNeeds: localStorage.getItem('clientNeeds') || '',
    });
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    localStorage.setItem(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    localStorage.setItem('backup_lead', JSON.stringify({ payload: formData, ts: Date.now() }));
    setFormData({ clientName: '', clientEmail: '', clientNeeds: '' });
    ['clientName', 'clientEmail', 'clientNeeds'].forEach(k => localStorage.removeItem(k));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif" }}>

      {/* Tech grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-6 right-6 z-50"
            role="status"
            aria-live="polite"
          >
            <div className="bg-white text-black px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              Request received — we'll be in touch.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip link */}
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-3 py-2 rounded-md z-50">
        Skip to content
      </a>

      <main id="main" className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-16">

        {/* NAV */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-end mb-6"
        >
          <div className="flex items-center gap-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-zinc-800 hover:border-zinc-500 transition-colors"
            >
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="#intake"
              className="hidden sm:inline-flex items-center justify-center px-5 h-11 rounded-full bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors"
            >
              Initialize Project
            </a>
          </div>
        </motion.nav>

        {/* LOGO — full-width hero display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-12 lg:mb-16"
        >
          <img
            src={LOGO_URL}
            alt="Operator.ink"
            className="h-auto object-contain"
            style={{ width: '420px', maxWidth: '90vw' }}
          />
        </motion.div>

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
              <span className="text-cyan-400">&amp; Growth Systems.</span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed">
              We design operational websites, engineer GEO/AEO search dominance, build workflow automation, and deploy custom AI agents that scale your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#intake"
                className="inline-flex items-center justify-center gap-2 px-8 rounded-2xl bg-white text-black font-extrabold text-base hover:bg-zinc-200 transition-colors"
                style={{ minHeight: '56px' }}
              >
                Deploy Request <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:orders@operator.ink"
                className="inline-flex items-center justify-center gap-2 px-8 rounded-2xl border border-zinc-800 text-white font-semibold text-base hover:border-zinc-500 transition-colors"
                style={{ minHeight: '56px' }}
              >
                <Mail className="w-4 h-4 text-zinc-400" /> orders@operator.ink
              </a>
            </div>
          </div>

          {/* Value Panel */}
          <div className="lg:col-span-5">
            <div
              className="rounded-[32px] border border-zinc-800 p-7 lg:p-8"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0))' }}
            >
              <h3 className="text-xl font-bold mb-4">Why Operator.ink</h3>
              <ul className="space-y-3 text-sm text-zinc-400">
                {[
                  "Conversion-focused operational websites.",
                  "Localized GEO + AEO strategies for high-intent traffic.",
                  "Custom agents and workflows to remove manual work.",
                  "Precision ad campaigns for scalable acquisition."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#intake"
                className="mt-6 inline-flex items-center justify-center w-full rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors"
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
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <h2 id="capabilities-heading" className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Core Capabilities</h2>
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
                  className={`rounded-[32px] border border-zinc-800 p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-[0_18px_40px_rgba(6,182,212,0.05)] ${cap.wide ? 'md:col-span-2' : ''}`}
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))' }}
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight">{cap.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{cap.description}</p>
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-t border-zinc-900 pt-14 pb-14"
          aria-labelledby="intake-heading"
        >
          <div>
            <h2 id="intake-heading" className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">System Initialization.</h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Describe your scope and we'll return a custom deployment plan with timeline and next steps.
            </p>
            <div
              className="rounded-[28px] border border-zinc-800 p-6"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))' }}
            >
              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Direct Contact</p>
              <a href="mailto:orders@operator.ink" className="flex items-center gap-2 text-white font-semibold hover:text-cyan-400 transition-colors mb-3" style={{ minHeight: '44px' }}>
                <Mail className="w-4 h-4 text-zinc-500" /> orders@operator.ink
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-semibold hover:text-cyan-400 transition-colors" style={{ minHeight: '44px' }}>
                <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                linkedin.com/in/francisco-albavc
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-label="Initialize Project Form"
            className="rounded-[36px] border border-zinc-800 p-7 lg:p-8 flex flex-col gap-5"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))' }}
          >
            {[
              { id: 'clientName', label: 'Name', type: 'text', placeholder: 'Full name' },
              { id: 'clientEmail', label: 'Email', type: 'email', placeholder: 'name@company.com' }
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col gap-2">
                <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-zinc-500">{label}</label>
                <input
                  type={type}
                  id={id}
                  required
                  value={formData[id]}
                  onChange={(e) => handleChange(id, e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-5 py-3 rounded-2xl bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
                  style={{ minHeight: '52px' }}
                />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label htmlFor="clientNeeds" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Scope</label>
              <textarea
                id="clientNeeds"
                rows={5}
                required
                value={formData.clientNeeds}
                onChange={(e) => handleChange('clientNeeds', e.target.value)}
                placeholder="Brief description of your project..."
                className="w-full px-5 py-4 rounded-2xl bg-black border border-zinc-800 text-white placeholder-zinc-600 resize-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black font-extrabold text-base hover:bg-zinc-200 disabled:opacity-50 transition-colors mt-1"
              style={{ minHeight: '56px' }}
            >
              {submitting ? 'Sending…' : 'Execute Request'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.section>

        {/* FOOTER */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-zinc-600 border-t border-zinc-900 py-8"
        >
          <span>© {new Date().getFullYear()} Operator.ink — Systems Active.</span>
          <div className="flex items-center gap-4">
            <a href="mailto:orders@operator.ink" className="hover:text-zinc-400 transition-colors">orders@operator.ink</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
          </div>
        </motion.footer>

      </main>
    </div>
  );
}