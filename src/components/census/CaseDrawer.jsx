import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bed, Check, Circle, MessageSquare, Send } from 'lucide-react';
import { FACILITIES } from '@/data/censusMockData';

const CHECKLIST_ITEMS = [
  { key: 'medList', label: 'Medication List' },
  { key: 'pasrr', label: 'PASRR Level 1' },
  { key: 'faceToFace', label: 'Face-to-face scheduled' },
  { key: 'financial', label: 'Financial clearance' },
];

export default function CaseDrawer({ caseItem, onClose, onUpdateCase, toast }) {
  const [noteInput, setNoteInput] = useState('');

  if (!caseItem) return null;

  const handleChecklistToggle = (key) => {
    const next = { ...caseItem.checklist, [key]: !caseItem.checklist[key] };
    onUpdateCase?.(caseItem.id, { checklist: next });
    toast?.({ title: 'Updated', description: `${CHECKLIST_ITEMS.find(c => c.key === key).label} ${next[key] ? 'done' : 'pending'}` });
  };

  const handleAddNote = (e) => {
    e?.preventDefault();
    const text = noteInput.trim();
    if (!text || !onUpdateCase) return;
    const notes = [...(caseItem.notes || []), { text, at: new Date().toISOString().slice(0, 16) }];
    onUpdateCase(caseItem.id, { notes });
    setNoteInput('');
    toast?.({ title: 'Note added', description: 'Case note saved.' });
  };

  const facilityName = caseItem.facility ? (FACILITIES[caseItem.facility]?.name ?? caseItem.facility) : null;

  return (
    <AnimatePresence>
      <React.Fragment key="drawer">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60"
          onClick={onClose}
        />
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-xl"
        >
          <div className="p-6 overflow-y-auto h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">{caseItem.code}</h3>
                <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
                  <Bed className="w-4 h-4 flex-shrink-0" />
                  <span>{caseItem.room} {facilityName && `• ${facilityName}`}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 text-white/60"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 flex-1">
              <div>
                <label className="text-xs text-white/50 uppercase">Payer</label>
                <p className="text-cyan-400 font-semibold">{caseItem.payer}</p>
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase">Stage checklist</label>
                <ul className="mt-2 space-y-2">
                  {CHECKLIST_ITEMS.map(({ key, label }) => (
                    <li key={key} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleChecklistToggle(key)}
                        className="focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded"
                      >
                        {caseItem.checklist[key] ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-white/30 hover:text-white/50" />
                        )}
                      </button>
                      <span className={caseItem.checklist[key] ? 'text-white' : 'text-white/60'}>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="text-xs text-white/50 uppercase flex items-center gap-1.5 mb-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Case notes
                </label>
                <ul className="space-y-2 mb-3 max-h-24 overflow-y-auto">
                  {(caseItem.notes || []).map((n, i) => (
                    <li key={i} className="text-sm text-white/80 pl-3 border-l-2 border-cyan-500/40">
                      {n.text}
                      {n.at && <span className="block text-[10px] text-white/40 mt-0.5">{n.at.replace('T', ' ')}</span>}
                    </li>
                  ))}
                  {(!caseItem.notes || caseItem.notes.length === 0) && (
                    <li className="text-sm text-white/40 italic">No notes yet. Add one below.</li>
                  )}
                </ul>
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add a note (no PHI)"
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!noteInput.trim()}
                    className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Add note"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-[10px] text-white/40 mt-1">No PHI — use codes and status only.</p>
              </div>
            </div>
          </div>
        </motion.aside>
      </React.Fragment>
    </AnimatePresence>
  );
}
