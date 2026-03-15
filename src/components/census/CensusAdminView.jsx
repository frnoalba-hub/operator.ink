import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Building2 } from 'lucide-react';
import CensusAnalytics from './CensusAnalytics';
import { MOCK_COORDINATORS } from '@/data/censusMockData';

export default function CensusAdminView({ cases }) {
  const coordinators = MOCK_COORDINATORS;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Analytics Summary */}
      <div className="retro-card rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" /> Enterprise Analytics
        </h2>
        <CensusAnalytics cases={cases} />
      </div>

      {/* Administrators / Coordinators Overview */}
      <div className="retro-card rounded-2xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" /> All Administrators
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-white/50">
                <th className="py-3 pr-4 font-semibold">Coordinator</th>
                <th className="py-3 pr-4 font-semibold">Facility</th>
                <th className="py-3 pr-4 font-semibold text-center">Referrals</th>
                <th className="py-3 pr-4 font-semibold text-center">Admitted</th>
                <th className="py-3 pr-4 font-semibold text-center">Denied</th>
                <th className="py-3 font-semibold text-center">In Progress</th>
              </tr>
            </thead>
            <tbody>
              {coordinators.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-3 pr-4 font-semibold text-white">{c.name}</td>
                  <td className="py-3 pr-4 text-white/70 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" /> {c.facility}
                  </td>
                  <td className="py-3 pr-4 text-center text-cyan-400">{c.referrals}</td>
                  <td className="py-3 pr-4 text-center text-green-400">{c.admitted}</td>
                  <td className="py-3 pr-4 text-center text-red-400">{c.denied}</td>
                  <td className="py-3 text-center text-amber-400">{c.inProgress}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/40 mt-4">
          Main admin sees all coordinators and facility performance. Click a row to drill down (coming soon).
        </p>
      </div>
    </motion.div>
  );
}
