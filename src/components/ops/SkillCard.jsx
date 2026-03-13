import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export default function SkillCard({ skill, isActive = false, onActivate, onConfigure, delay = 0 }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="retro-card rounded-[28px] p-6 lg:p-7 overflow-hidden"
    >
      <div className="retro-label-strip" />
      <div className="flex items-start justify-between mb-5 mt-2">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
          <Icon className="w-6 h-6" style={{ color: 'var(--retro-text)' }} />
        </div>
        {isActive && (
          <span className="retro-rgb-border inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--retro-text)' }}>
            <Check className="w-3 h-3" /> Active
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold mb-1 tracking-tight">{skill.name}</h3>
      <p className="text-sm font-medium mb-3 text-[var(--retro-text-muted)]">{skill.tagline}</p>
      <p className="text-sm text-[var(--retro-text-muted)] leading-relaxed mb-5">{skill.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {skill.features.slice(0, 4).map((f, i) => (
          <span key={i} className="px-2.5 py-1 rounded-full text-xs text-[var(--retro-text-muted)]" style={{ background: 'var(--retro-bg-elevated)', border: '1px solid var(--retro-border)' }}>
            {f}
          </span>
        ))}
        {skill.features.length > 4 && (
          <span className="px-2.5 py-1 rounded-full text-xs text-[var(--retro-text-dim)]" style={{ background: 'var(--retro-bg-elevated)', border: '1px solid var(--retro-border)' }}>
            +{skill.features.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold" style={{ color: 'var(--retro-text)' }}>{skill.priceLabel}</span>
        {isActive ? (
          <button
            onClick={() => onConfigure?.(skill.slug)}
            className="retro-link inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-colors"
            style={{ borderColor: 'var(--retro-border)' }}
          >
            Configure <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onActivate?.(skill.slug)}
            className="retro-rgb-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-95 transition-opacity"
          >
            Activate <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
