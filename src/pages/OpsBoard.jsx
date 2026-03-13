import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Zap } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import SkillCard from '../components/ops/SkillCard';
import { SKILL_CATALOG } from '@/data/skillCatalog';
import { base44 } from '@/api/base44Client';

export default function OpsBoard() {
  const navigate = useNavigate();

  const { data: activatedSkills = [] } = useQuery({
    queryKey: ['activated-skills'],
    queryFn: () => base44.entities.ActivatedSkill?.list?.('-activated_at').catch(() => []) ?? Promise.resolve([]),
  });

  const activeSet = new Set(activatedSkills.map((s) => s.skill_slug));

  function handleActivate(slug) {
    navigate(`/SkillConfig?skill=${slug}`);
  }

  function handleConfigure(slug) {
    navigate(`/SkillConfig?skill=${slug}`);
  }

  return (
    <div className="min-h-screen retro-theme antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", background: 'var(--retro-bg)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <StickyNav currentPage="ops-board" />

      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--rgb-gradient)' }} />
            <span className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Ops Board</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              AI Modules.
            </h1>
            {activatedSkills.length > 0 && (
              <span className="retro-rgb-border flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--retro-text)' }}>
                <Zap className="w-3 h-3" /> {activatedSkills.length} active
              </span>
            )}
          </div>

          <p className="text-[var(--retro-text-muted)] mb-10 max-w-2xl leading-relaxed">
            Select the AI capabilities your business needs. Connect your APIs, set your persona, and activate. Each module runs independently -- pick what you need, pay for what you use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATALOG.map((skill, idx) => (
            <SkillCard
              key={skill.slug}
              skill={skill}
              isActive={activeSet.has(skill.slug)}
              onActivate={handleActivate}
              onConfigure={handleConfigure}
              delay={0.1 + idx * 0.06}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="retro-card mt-16 rounded-[28px] p-8 text-center"
        >
          <h3 className="text-xl font-bold mb-2">Need something custom?</h3>
          <p className="text-sm text-[var(--retro-text-muted)] mb-4">
            We build bespoke AI agents tailored to your exact workflow. Reach out and we'll scope it together.
          </p>
          <a
            href="mailto:orders@operator.ink"
            className="retro-link inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--retro-border)] text-sm font-semibold hover:border-[var(--retro-border-bright)] transition-colors"
          >
            Contact Us
          </a>
        </motion.div>

        <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--retro-text-dim)] border-t border-[var(--retro-border)] py-8 mt-12">
          <span>&copy; {new Date().getFullYear()} Operator.ink -- Systems Active.</span>
          <a href="mailto:orders@operator.ink" className="retro-link">orders@operator.ink</a>
        </footer>
      </main>
    </div>
  );
}
