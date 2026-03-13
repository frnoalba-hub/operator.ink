import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import StickyNav from '../components/StickyNav';
import SkillConfigForm from '../components/ops/SkillConfigForm';
import { getSkillBySlug } from '@/data/skillCatalog';
import { base44 } from '@/api/base44Client';

export default function SkillConfig() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const slug = searchParams.get('skill');
  const skill = useMemo(() => getSkillBySlug(slug), [slug]);

  const { data: activatedSkills = [] } = useQuery({
    queryKey: ['activated-skills'],
    queryFn: () => base44.entities.ActivatedSkill?.list?.('-activated_at').catch(() => []) ?? Promise.resolve([]),
  });

  const existing = activatedSkills.find((s) => s.skill_slug === slug);

  const saveMutation = useMutation({
    mutationFn: async (configData) => {
      try {
        const configVal = typeof configData === 'string' ? configData : JSON.stringify(configData);
        const payload = {
          config: configVal,
          status: 'active',
          activated_at: new Date().toISOString(),
        };
        if (existing) {
          return await base44.entities.ActivatedSkill.update(existing.id, payload);
        }
        return await base44.entities.ActivatedSkill.create({
          name: skill.name,
          skill_slug: slug,
          ...payload,
        });
      } catch (err) {
        const msg =
          err?.message ||
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.data?.message ||
          err?.data?.error ||
          (err?.response?.data && JSON.stringify(err.response.data)) ||
          String(err);
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activated-skills'] });
    },
  });

  if (!skill) {
    return (
      <div className="min-h-screen retro-theme flex items-center justify-center" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Skill not found</h2>
          <p className="text-[var(--retro-text-muted)] mb-4">The requested module does not exist.</p>
          <button
            onClick={() => navigate('/OpsBoard')}
            className="retro-rgb-btn px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-95 transition-opacity"
          >
            Back to Ops Board
          </button>
        </div>
      </div>
    );
  }

  let parsedConfig = {};
  if (existing?.config) {
    if (typeof existing.config === 'string') {
      try { parsedConfig = JSON.parse(existing.config); } catch { /* ignore */ }
    } else {
      parsedConfig = existing.config;
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

      <StickyNav currentPage="ops-board" />

      <main className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <SkillConfigForm
          skill={skill}
          existingConfig={parsedConfig}
          onSave={(data) => saveMutation.mutateAsync(data)}
          onBack={() => navigate('/OpsBoard')}
          saving={saveMutation.isPending}
        />
      </main>
    </div>
  );
}