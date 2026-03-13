import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Save, ArrowLeft, Check, AlertCircle, Phone } from 'lucide-react';
import { PERSONA_PRESETS } from '@/data/skillCatalog';

export default function SkillConfigForm({ skill, existingConfig = {}, onSave, onBack, saving = false }) {
  const Icon = skill.icon;

  const [config, setConfig] = useState(() => {
    const initial = {};
    [...skill.requiredKeys, ...skill.optionalKeys].forEach((k) => {
      initial[k.key] = existingConfig[k.key] || '';
    });
    if (skill.hasPersona) {
      initial._persona = existingConfig._persona || '';
    }
    return initial;
  });

  const [revealedKeys, setRevealedKeys] = useState({});
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);

  function toggleReveal(key) {
    setRevealedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function validate() {
    const errs = {};
    skill.requiredKeys.forEach((k) => {
      if (!config[k.key]?.trim()) {
        errs[k.key] = 'Required';
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaveError(null);
    if (!validate()) return;
    try {
      await onSave?.(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setSaveError(err?.message || String(err));
      console.error('[SkillConfigForm] Save failed:', err);
    }
  }

  function renderKeyField(keyDef, required) {
    const val = config[keyDef.key] || '';
    const isSecret = keyDef.secret;
    const revealed = revealedKeys[keyDef.key];
    const hasError = errors[keyDef.key];

    return (
      <div key={keyDef.key} className="space-y-1.5">
        <label className="flex items-center gap-2 text-sm font-medium text-[var(--retro-text-muted)]">
          {keyDef.label}
          {required && <span className="text-xs text-rose-400">*</span>}
        </label>
        <div className="relative">
          <input
            type={isSecret && !revealed ? 'password' : 'text'}
            value={val}
            onChange={(e) => {
              setConfig((prev) => ({ ...prev, [keyDef.key]: e.target.value }));
              if (errors[keyDef.key]) setErrors((prev) => ({ ...prev, [keyDef.key]: undefined }));
            }}
            placeholder={keyDef.placeholder}
            className={`w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${isSecret ? 'pr-12' : ''}`}
            style={{
              background: 'var(--retro-bg-card)',
              border: `1px solid ${hasError ? '#f43f5e' : 'var(--retro-border)'}`,
              color: 'var(--retro-text)',
            }}
          />
          {isSecret && (
            <button
              type="button"
              onClick={() => toggleReveal(keyDef.key)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--retro-text-dim)] hover:text-[var(--retro-text-muted)] transition-colors"
            >
              {revealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {hasError && (
          <p className="flex items-center gap-1 text-xs text-rose-400">
            <AlertCircle className="w-3 h-3" /> {hasError}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-4 mb-2">
        <button
          type="button"
          onClick={onBack}
          className="retro-link flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center retro-rgb-border" style={{ background: 'var(--retro-bg-elevated)' }}>
          <Icon className="w-7 h-7" style={{ color: 'var(--retro-text)' }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{skill.name}</h2>
          <p className="text-sm text-[var(--retro-text-muted)]">{skill.tagline}</p>
        </div>
      </div>

      {skill.slug === 'ai-receptionist' && (
        <div className="retro-card rounded-[24px] p-4 space-y-1" style={{ borderColor: 'var(--retro-rgb, rgba(6,182,212,0.3))', borderWidth: 1 }}>
          <p className="text-sm text-[var(--retro-text-muted)]">
            <strong className="text-[var(--retro-text)]">Quick test:</strong> Click <strong>Use Outright Demo (888)</strong> below to pre-fill the demo number and persona. Save, then call the 888 number to test (Twilio SID/Auth optional).
          </p>
        </div>
      )}

      {skill.requiredKeys.length > 0 && (
        <div className="retro-card rounded-[24px] p-6 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Required API Keys</h3>
          {skill.requiredKeys.map((k) => renderKeyField(k, true))}
        </div>
      )}

      {skill.optionalKeys.length > 0 && (
        <div className="retro-card rounded-[24px] p-6 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Optional Integrations</h3>
          {skill.optionalKeys.map((k) => renderKeyField(k, false))}
        </div>
      )}

      {skill.hasPersona && (
        <div className="retro-card rounded-[24px] p-6 space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Agent Persona</h3>
          <p className="text-sm text-[var(--retro-text-muted)]">Define how your AI agent speaks and behaves.</p>
          {skill.slug === 'ai-receptionist' && Object.keys(PERSONA_PRESETS).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {Object.entries(PERSONA_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setConfig((prev) =>
                      preset.config ? { ...prev, ...preset.config } : { ...prev, _persona: preset.persona }
                    )
                  }
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                  style={{ borderColor: 'var(--retro-border)', color: 'var(--retro-text)' }}
                >
                  Use {preset.label}
                </button>
              ))}
            </div>
          )}
          <textarea
            value={config._persona || ''}
            onChange={(e) => setConfig((prev) => ({ ...prev, _persona: e.target.value }))}
            placeholder={skill.personaPlaceholder}
            rows={8}
            className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-y"
            style={{
              background: 'var(--retro-bg-card)',
              border: '1px solid var(--retro-border)',
              color: 'var(--retro-text)',
            }}
          />
        </div>
      )}

      {skill.slug === 'ai-receptionist' && config.twilio_phone_number?.trim() && (
        <div
          className="retro-card rounded-[24px] p-6 space-y-3"
          style={{ borderColor: 'var(--retro-rgb, rgba(6,182,212,0.4))', borderWidth: 1 }}
        >
          <h3 className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold flex items-center gap-2">
            <Phone className="w-4 h-4" /> Test Your Receptionist
          </h3>
          <p className="text-sm text-[var(--retro-text-muted)]">
            Call this number to test the AI. Ensure Twilio voice webhook points to your deployed webhook URL (base44 or Cloudflare).
          </p>
          <a
            href={`tel:${config.twilio_phone_number.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold transition-colors"
            style={{
              background: 'var(--retro-bg-elevated)',
              border: '1px solid var(--retro-border)',
              color: 'var(--retro-text)',
            }}
          >
            <Phone className="w-5 h-5" />
            {config.twilio_phone_number}
          </a>
        </div>
      )}

      {saveError && (
        <div className="rounded-xl p-4 flex items-start gap-2" style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.4)' }}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#f43f5e' }} />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm" style={{ color: '#f43f5e' }}>Save failed</p>
            <p className="text-sm text-[var(--retro-text-muted)] mt-0.5 break-words max-h-24 overflow-y-auto">{saveError}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="retro-rgb-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold hover:opacity-95 transition-opacity disabled:opacity-50 disabled:hover:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? 'Saved' : saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </motion.form>
  );
}
