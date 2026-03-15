import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BarChart3, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { usePageSEO } from '@/hooks/usePageSEO';
import StickyNav from '../components/StickyNav';
import GridOverlay from '../components/GridOverlay';
import BackToHome from '../components/BackToHome';
import CensusPipeline from '../components/census/CensusPipeline';
import CensusAnalytics from '../components/census/CensusAnalytics';
import CensusAdminView from '../components/census/CensusAdminView';
import CaseDrawer from '../components/census/CaseDrawer';
import { MOCK_CASES } from '@/data/censusMockData';

const CENSUS_TITLE = 'CensusBoard — SNF Referral & Bed Tracking | Skilled Nursing Admissions | Operator.ink';
const CENSUS_DESC = 'CensusBoard demo: Non-PHI skilled nursing facility census, referral pipeline, bed tracking. Room + referral code only. Admissions coordinators, executive analytics, main admin.';

const VIEWS = [
  { id: 'coordinator', label: 'My Pipeline', icon: LayoutDashboard },
  { id: 'executive', label: 'Executive', icon: BarChart3 },
  { id: 'admin', label: 'Main Admin', icon: Shield },
];

export default function CensusBoard() {
  const [view, setView] = useState('coordinator');
  const [cases, setCases] = useState(MOCK_CASES);
  const [selectedCase, setSelectedCase] = useState(null);

  usePageSEO(CENSUS_TITLE, CENSUS_DESC);

  const handleCaseClick = (c) => setSelectedCase(c);
  const handleCloseDrawer = () => setSelectedCase(null);

  const handleUpdateCase = (caseId, updates) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, ...updates } : c));
    setSelectedCase(prev => prev?.id === caseId ? { ...prev, ...updates } : prev);
  };

  const handleAddReferral = () => {
    const n = cases.length + 1;
    const newCase = {
      id: String(n + 10),
      room: '—',
      code: `REF-${String(n).padStart(3, '0')}`,
      stage: 'referral',
      payer: 'Medicare',
      flag: 'New',
      facility: null,
      coordinatorId: null,
      notes: [],
      checklist: { medList: false, pasrr: false, faceToFace: false, financial: false },
    };
    setCases(prev => [...prev, newCase]);
    toast({ title: 'Referral added', description: `${newCase.code} added to pipeline` });
  };

  return (
    <div
      className="retro-theme min-h-screen antialiased overflow-x-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif", background: 'var(--retro-bg)' }}
    >
      <GridOverlay />
      <StickyNav currentPage="censusboard" />
      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16">
        <BackToHome />

        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">CensusBoard</h1>
            <p className="text-sm text-[var(--retro-text-dim)] mt-1">
              SNF referral pipeline • Room + code only. No PHI. Look up codes in your EHR.
            </p>
          </div>
          <nav className="flex rounded-xl border border-white/10 p-1 bg-black/30" aria-label="View tabs">
            {VIEWS.map(v => {
              const Icon = v.icon;
              const isActive = view === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${v.id}`}
                  aria-controls={`panel-${v.id}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {v.label}
                </button>
              );
            })}
          </nav>
        </motion.header>

        {view === 'coordinator' && (
          <motion.section
            key="pipeline"
            id="panel-coordinator"
            role="tabpanel"
            aria-labelledby="tab-coordinator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="retro-card rounded-2xl p-6"
          >
            <CensusPipeline
              cases={cases}
              onCaseClick={handleCaseClick}
              onAddReferral={handleAddReferral}
            />
          </motion.section>
        )}
        {view === 'executive' && (
          <motion.section
            key="analytics"
            id="panel-executive"
            role="tabpanel"
            aria-labelledby="tab-executive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="retro-card rounded-2xl p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Executive Overview
              </h2>
              <CensusAnalytics cases={cases} />
            </div>
          </motion.section>
        )}
        {view === 'admin' && (
          <motion.section
            key="admin"
            id="panel-admin"
            role="tabpanel"
            aria-labelledby="tab-admin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CensusAdminView cases={cases} />
          </motion.section>
        )}

        <p className="mt-6 text-xs text-white/40">
          Demo uses synthetic data. Skilled nursing facility census • Room + referral code only — no PHI.
        </p>
      </main>

      {selectedCase && (
        <CaseDrawer
          caseItem={selectedCase}
          onClose={handleCloseDrawer}
          onUpdateCase={handleUpdateCase}
          toast={toast}
        />
      )}
    </div>
  );
}
