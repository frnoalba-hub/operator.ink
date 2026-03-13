import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Zap, Building2, Users } from 'lucide-react';
import StickyNav from '../components/StickyNav';

const PLANS = [
  {
    id: 'solo',
    name: 'Solo',
    price: '$49',
    period: '/mo',
    description: 'For solopreneurs and small shops.',
    icon: Zap,
    color: 'cyan',
    features: [
      '1 AI module',
      '50 calls or 200 messages/mo',
      'Custom persona',
      'Telegram notifications',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    id: 'smb',
    name: 'SMB',
    price: '$149',
    period: '/mo',
    description: 'For growing businesses with multiple channels.',
    icon: Building2,
    color: 'violet',
    features: [
      'Up to 3 AI modules',
      '200 calls or 1,000 messages/mo',
      'Custom personas per module',
      'Telegram + email notifications',
      'Google Workspace integration',
      'Priority support',
      'Usage analytics dashboard',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '$499',
    period: '/mo',
    description: 'For agencies managing multiple clients.',
    icon: Users,
    color: 'rose',
    features: [
      'Unlimited modules',
      '1,000 calls or 5,000 messages/mo',
      'White-label option',
      'Multi-tenant management',
      'All integrations',
      'Dedicated support',
      'Custom agent development',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  function handleSelect(planId) {
    if (planId === 'agency') {
      window.location.href = 'mailto:orders@operator.ink?subject=Agency%20Plan%20Inquiry';
    } else {
      navigate('/OpsBoard');
    }
  }

  return (
    <div className="min-h-screen retro-theme antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", background: 'var(--retro-bg)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <StickyNav currentPage="pricing" />

      <main className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--rgb-gradient)' }} />
            <span className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Pricing</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Simple, transparent pricing.
          </h1>
          <p className="text-[var(--retro-text-muted)] max-w-lg mx-auto">
            Start with a free trial. Scale as you grow. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.08, duration: 0.5 }}
                className={`retro-card rounded-[28px] p-7 relative flex flex-col ${plan.popular ? 'retro-rgb-border' : ''}`}
              >
                {plan.popular && (
                  <span className="retro-rgb-border absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ background: 'var(--retro-bg-elevated)', color: 'var(--retro-text)' }}>
                    Most Popular
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--retro-text)' }} />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-[var(--retro-text-dim)] text-sm">{plan.period}</span>
                </div>

                <p className="text-sm text-[var(--retro-text-muted)] mb-6">{plan.description}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--retro-text)' }} />
                      <span className="text-[var(--retro-text-muted)]">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelect(plan.id)}
                  className="retro-rgb-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold hover:opacity-95 transition-opacity"
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-[var(--retro-text-muted)]"
        >
          All plans include a 10-call free trial. No credit card required to start.
          <br />
          Need custom volume? <a href="mailto:orders@operator.ink" className="retro-link">Contact us</a>.
        </motion.div>

        <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--retro-text-dim)] border-t border-[var(--retro-border)] py-8 mt-12">
          <span>&copy; {new Date().getFullYear()} Operator.ink -- Systems Active.</span>
          <a href="mailto:orders@operator.ink" className="retro-link">orders@operator.ink</a>
        </footer>
      </main>
    </div>
  );
}
