import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Phone, ChevronDown, ChevronUp } from 'lucide-react';
import StickyNav from '../components/StickyNav';
import { base44 } from '@/api/base44Client';
import moment from 'moment';

export default function Calls() {
  const [expandedId, setExpandedId] = useState(null);

  const { data: calls = [], isLoading, error } = useQuery({
    queryKey: ['call-logs'],
    queryFn: async () => {
      if (!base44.entities.CallLog) return [];
      return base44.entities.CallLog.list('-updated_at').catch(() => []);
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen retro-theme flex items-center justify-center" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}>
        <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--retro-border-bright)' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen retro-theme antialiased" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif", background: 'var(--retro-bg)' }}>
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
      />

      <StickyNav currentPage="calls" />

      <main className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--rgb-gradient)' }} />
          <span className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">Dashboard</span>
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Call Logs</h1>
          <span className="text-sm text-[var(--retro-text-muted)]">{calls.length} calls</span>
        </div>

        {error ? (
          <div className="retro-card rounded-2xl p-8 text-center">
            <Phone className="w-10 h-10 mx-auto mb-3 text-[var(--retro-text-dim)]" />
            <h3 className="text-lg font-bold mb-1">CallLog setup required</h3>
            <p className="text-sm text-[var(--retro-text-muted)] mb-2">
              Add the <strong>CallLog</strong> entity in base44 Dashboard → Data → Entities. See CALLLOG_SETUP.md for field definitions.
            </p>
          </div>
        ) : calls.length === 0 ? (
          <div className="retro-card rounded-2xl p-12 text-center">
            <Phone className="w-10 h-10 mx-auto mb-3 text-[var(--retro-text-dim)]" />
            <h3 className="text-lg font-bold mb-1">No calls yet</h3>
            <p className="text-sm text-[var(--retro-text-muted)]">Call your AI Receptionist number to see transcripts here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {calls.map((call) => {
              const expanded = expandedId === call.id;
              return (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="retro-card rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expanded ? null : call.id)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.025] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--retro-bg-elevated)', border: '1px solid var(--retro-border)' }}>
                      <Phone className="w-5 h-5 text-[var(--retro-text-muted)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-sm" style={{ color: 'var(--retro-text)' }}>
                          {call.from_number || 'Unknown'} → {call.to_number || '—'}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--retro-text-muted)] mt-0.5">
                        {moment(call.updated_at || call.created_at).fromNow()}
                        {call.duration_seconds != null && ` · ${call.duration_seconds}s`}
                      </div>
                    </div>
                    {expanded ? <ChevronUp className="w-5 h-5 text-[var(--retro-text-muted)] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[var(--retro-text-muted)] flex-shrink-0" />}
                  </button>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--retro-border)] p-5">
                          <p className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-2">Transcript</p>
                          <pre className="text-sm text-[var(--retro-text-muted)] whitespace-pre-wrap font-sans leading-relaxed bg-black/20 rounded-xl p-4 max-h-64 overflow-y-auto">
                            {call.transcript || 'No transcript'}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
