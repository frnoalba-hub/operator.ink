import React from 'react';
import { motion } from 'framer-motion';
import { Bed } from 'lucide-react';
import { FACILITIES } from '@/data/censusMockData';

const FLAG_COLORS = {
  New: 'bg-white/10 text-white/80',
  'Prior Auth': 'bg-amber-500/20 text-amber-400',
  'Missing Docs': 'bg-orange-500/20 text-orange-400',
  'Financial Hold': 'bg-rose-500/20 text-rose-400',
  'PASRR Pending': 'bg-violet-500/20 text-violet-400',
  Urgent: 'bg-red-500/20 text-red-400',
  Complete: 'bg-green-500/20 text-green-400',
};

export default function CaseCard({ caseItem, onClick }) {
  const tasksDone = Object.values(caseItem.checklist).filter(Boolean).length;
  const tasksTotal = Object.keys(caseItem.checklist).length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/10 bg-black/40 p-3 cursor-pointer hover:border-white/20 transition-colors"
      onClick={() => onClick?.(caseItem)}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="font-mono text-sm font-bold text-white">{caseItem.code}</span>
        {caseItem.flag && (
          <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${FLAG_COLORS[caseItem.flag] || 'bg-white/10'}`}>
            {caseItem.flag}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
        <Bed className="w-3 h-3" />
        <span>{caseItem.room}</span>
        {caseItem.facility && <span className="text-white/40">• {FACILITIES[caseItem.facility]?.short ?? caseItem.facility}</span>}
      </div>
      <div className="text-xs font-semibold text-cyan-400/90">{caseItem.payer}</div>
      <div className="flex items-center gap-1 mt-2 text-[10px] text-white/50">
        <span>{tasksDone}/{tasksTotal} tasks</span>
      </div>
    </motion.div>
  );
}
