import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Plus, Settings, Pause, Play, Zap } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import UsageSummary from '../components/ops/UsageSummary';
import { SKILL_CATALOG } from '@/data/skillCatalog';
import { base44 } from '@/api/base44Client';

function getSkillMeta(slug) {
  return SKILL_CATALOG.find((s) => s.slug === slug);
}

export default function Dashboard() {
  const navigate = useNavigate();

  const { data: activatedSkills = [], isLoading } = useQuery({
    queryKey: ['activated-skills'],
    queryFn: () => base44.entities.ActivatedSkill?.list?.('-activated_at').catch(() => []) ?? Promise.resolve([]),
  });

  const { data: usageLogs = [] } = useQuery({
    queryKey: ['usage-logs'],
    queryFn: () => base44.entities.UsageLog?.list?.('-timestamp').catch(() => []) ?? Promise.resolve([]),
  });

  const stats = {
    calls: usageLogs.filter((l) => l.event_type === 'call').length,
    messages: usageLogs.filter((l) => l.event_type === 'message').length,
    tasks: usageLogs.filter((l) => l.event_type === 'task').length,
    costCents: usageLogs.reduce((sum, l) => sum + (l.cost_cents || 0), 0),
  };

  if (isLoading) {
    return (
      <div className="min-h-screen retro-theme flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--retro-border-bright)' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen retro-theme antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", background: 'var(--retro-bg)' }}>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      <StickyNav currentPage="dashboard" />

      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--rgb-gradient)' }} />
            <span className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Dashboard</span>
          </div>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">Command Center</h1>
            <button
              onClick={() => navigate('/OpsBoard')}
              className="retro-rgb-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-95 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add Module
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-3">This Month</h2>
          <UsageSummary stats={stats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-3">
            Active Modules ({activatedSkills.length})
          </h2>

          {activatedSkills.length === 0 ? (
            <div className="retro-card rounded-[24px] p-12 text-center">
              <Zap className="w-10 h-10 mx-auto mb-3 text-[var(--retro-text-dim)]" />
              <h3 className="text-lg font-bold mb-1">No modules activated yet</h3>
              <p className="text-sm text-[var(--retro-text-muted)] mb-4">Head to the Ops Board to activate your first AI module.</p>
              <button
                onClick={() => navigate('/OpsBoard')}
                className="retro-rgb-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-95 transition-opacity"
              >
                <Plus className="w-4 h-4" /> Browse Modules
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {activatedSkills.map((activated) => {
                const meta = getSkillMeta(activated.skill_slug);
                if (!meta) return null;
                const c = COLOR_MAP[meta.color] || COLOR_MAP.cyan;
                const Icon = meta.icon;
                const isPaused = activated.status === 'paused';

                return (
                  <motion.div
                    key={activated.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`retro-card rounded-2xl p-5 flex items-center gap-4 ${isPaused ? '' : 'retro-rgb-border'}`}
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
                      <Icon className={`w-6 h-6 ${isPaused ? 'text-[var(--retro-text-dim)]' : ''}`} style={!isPaused ? { color: 'var(--retro-text)' } : {}} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold" style={{ color: 'var(--retro-text)' }}>{meta.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-semibold ${isPaused ? 'text-[var(--retro-text-muted)]' : ''}`} style={isPaused ? { background: 'rgba(255,255,255,0.03)', borderColor: 'var(--retro-border)' } : { background: 'rgba(255,255,255,0.05)', borderColor: 'var(--retro-border-bright)', color: 'var(--retro-text)' }}>
                          {isPaused ? 'Paused' : 'Active'}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--retro-text-muted)] mt-0.5">{meta.tagline} &middot; {meta.priceLabel}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => navigate(`/SkillConfig?skill=${activated.skill_slug}`)}
                        className="retro-link flex items-center justify-center w-9 h-9 rounded-xl border transition-colors"
                        style={{ borderColor: 'var(--retro-border)' }}
                        title="Configure"
                      >
                        <Settings className="w-4 h-4 text-[var(--retro-text-muted)]" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--retro-text-dim)] border-t border-[var(--retro-border)] py-8 mt-12">
          <span>&copy; {new Date().getFullYear()} Operator.ink -- Systems Active.</span>
          <a href="mailto:orders@operator.ink" className="retro-link">orders@operator.ink</a>
        </footer>
      </main>
    </div>
  );
}
