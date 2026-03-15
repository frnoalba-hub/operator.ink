import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, XCircle, BarChart3 } from 'lucide-react';

export default function CensusAnalytics({ cases }) {
  const referrals = cases.filter(c => c.stage !== 'denied').length;
  const admitted = cases.filter(c => c.stage === 'admitted').length;
  const denied = cases.filter(c => c.stage === 'denied').length;
  const occupancy = 84; // mock

  const tiles = [
    { icon: Users, label: 'Referrals', value: referrals, color: 'text-cyan-400' },
    { icon: TrendingUp, label: 'Admitted', value: admitted, color: 'text-green-400' },
    { icon: XCircle, label: 'Denied', value: denied, color: 'text-red-400' },
    { icon: BarChart3, label: 'Occupancy', value: `${occupancy}%`, color: 'text-amber-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {tiles.map((t, i) => (
        <div
          key={t.label}
          className="rounded-xl border border-white/10 bg-black/30 p-4"
        >
          <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
            <t.icon className="w-4 h-4" />
            {t.label}
          </div>
          <div className={`text-2xl font-bold ${t.color}`}>{t.value}</div>
        </div>
      ))}
    </motion.div>
  );
}
