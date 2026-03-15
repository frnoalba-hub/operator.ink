import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import CaseCard from './CaseCard';
import { STAGES } from '@/data/censusMockData';

export default function CensusPipeline({ cases, onCaseClick, onAddReferral }) {
  const casesByStage = STAGES.reduce((acc, s) => {
    acc[s.id] = cases.filter(c => c.stage === s.id);
    return acc;
  }, {});

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[320px]">
      {STAGES.map(stage => (
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0 w-64 rounded-xl border border-white/10 bg-black/30 p-3"
        >
          <div
            className="text-xs font-bold uppercase tracking-wider mb-3 pb-2 border-b"
            style={{ borderColor: stage.color, color: stage.color }}
          >
            {stage.label}
          </div>
          <div className="space-y-2">
            {casesByStage[stage.id]?.map(c => (
              <CaseCard key={c.id} caseItem={c} onClick={onCaseClick} />
            ))}
          </div>
          {stage.id === 'referral' && (
            <button
              onClick={onAddReferral}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/20 text-white/60 text-xs hover:border-white/40 hover:text-white/80 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add referral
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
}
