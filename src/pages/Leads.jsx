import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Building2, Clock, DollarSign, FileText,
  Download, Eye, ChevronDown, ChevronUp, Paperclip, User
} from 'lucide-react';
import { usePageSEO } from '@/hooks/usePageSEO';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import moment from 'moment';

const SERVICE_LABELS = {
  'web-design': 'Web Design & Operations',
  'seo': 'GEO, AEO & SEO',
  'workflows': 'Workflows & AI Agents',
  'ads': 'Ads & Brand Identity',
  'multiple': 'Multiple Services',
};

const BUDGET_LABELS = {
  'under-5k': 'Under $5k',
  '5k-15k': '$5k – $15k',
  '15k-50k': '$15k – $50k',
  '50k-plus': '$50k+',
  'not-sure': 'Not Sure',
};

const TIMELINE_LABELS = {
  'asap': 'ASAP',
  '1-month': 'Within 1 Month',
  '1-3-months': '1–3 Months',
  '3-plus': '3+ Months',
  'flexible': 'Flexible',
};

const LEADS_TITLE = 'Leads — Intake & CRM | Operator.ink';
const LEADS_DESC = 'Operator.ink leads: Intake forms, CRM, lead management. Web design, GEO/AEO/SEO, AI workflows, ads inquiries. Track status, budget, timeline.';

const STATUS_CONFIG = {
  'new':        { color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40', dot: 'bg-cyan-400' },
  'reviewed':   { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40', dot: 'bg-yellow-400' },
  'in-progress':{ color: 'bg-violet-500/20 text-violet-400 border-violet-500/40', dot: 'bg-violet-400' },
  'closed':     { color: 'bg-zinc-700/50 text-zinc-400 border-zinc-600/40', dot: 'bg-zinc-500' },
};

function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url);
}

function getFileName(url) {
  try {
    const parts = new URL(url).pathname.split('/');
    return decodeURIComponent(parts[parts.length - 1]) || 'attachment';
  } catch {
    return 'attachment';
  }
}

function AttachmentPreview({ url, index }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const img = isImage(url);
  const name = getFileName(url);

  return (
    <>
      <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 overflow-hidden">
        {img ? (
          <img
            src={url}
            alt={name}
            className="w-14 h-14 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setPreviewOpen(true)}
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-zinc-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-zinc-400 truncate">{name}</p>
          <p className="text-xs text-zinc-600 mt-0.5">File {index + 1}</p>
        </div>
        <div className="flex flex-col gap-1">
          {img && (
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 transition-colors"
            >
              <Eye className="w-3 h-3" /> View
            </button>
          )}
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-xs text-cyan-400 border border-cyan-500/20 transition-colors"
          >
            <Download className="w-3 h-3" /> Download
          </a>
        </div>
      </div>

      {/* Full-screen image preview */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setPreviewOpen(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={url}
              alt={name}
              className="max-w-full max-h-full rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white text-2xl font-bold"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Leads() {
  usePageSEO(LEADS_TITLE, LEADS_DESC);
  const [expandedId, setExpandedId] = useState(null);
  const queryClient = useQueryClient();

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: () => base44.entities.LeadSubmission.list('-created_date'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.LeadSubmission.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['leads'] }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Dashboard</span>
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Lead Submissions</h1>
          <span className="text-sm text-zinc-500">{leads.length} total</span>
        </div>

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 p-12 text-center text-zinc-500">
            No submissions yet.
          </div>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => {
              const expanded = expandedId === lead.id;
              const sc = STATUS_CONFIG[lead.status] || STATUS_CONFIG['new'];
              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-zinc-800 overflow-hidden"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0))' }}
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedId(expanded ? null : lead.id)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.025] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white">{lead.client_name}</span>
                        {lead.company && <span className="text-zinc-500 text-sm">· {lead.company}</span>}
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-semibold ${sc.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {lead.status || 'new'}
                        </span>
                        {lead.file_urls?.length > 0 && (
                          <span className="flex items-center gap-1 text-xs text-zinc-500">
                            <Paperclip className="w-3 h-3" />{lead.file_urls.length}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 flex-wrap">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.client_email}</span>
                        {lead.service && <span>{SERVICE_LABELS[lead.service] || lead.service}</span>}
                        <span>{moment(lead.created_date).fromNow()}</span>
                      </div>
                    </div>
                    {expanded ? <ChevronUp className="w-5 h-5 text-zinc-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />}
                  </button>

                  {/* Expanded */}
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-zinc-800 p-5 space-y-5">

                          {/* Key Info Pills */}
                          <div className="flex flex-wrap gap-2">
                            {lead.budget && (
                              <Pill icon={DollarSign} label={BUDGET_LABELS[lead.budget] || lead.budget} />
                            )}
                            {lead.timeline && (
                              <Pill icon={Clock} label={TIMELINE_LABELS[lead.timeline] || lead.timeline} />
                            )}
                            {lead.service && (
                              <Pill icon={FileText} label={SERVICE_LABELS[lead.service] || lead.service} />
                            )}
                          </div>

                          {/* Follow-up Answer */}
                          {lead.conditional_answer && (
                            <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Follow-up Answer</p>
                              <p className="text-sm text-zinc-200">{lead.conditional_answer}</p>
                            </div>
                          )}

                          {/* Scope */}
                          <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4">
                            <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Project Scope</p>
                            <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">{lead.scope}</p>
                          </div>

                          {/* Attachments */}
                          {lead.file_urls?.length > 0 && (
                            <div>
                              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3">
                                Attachments ({lead.file_urls.length})
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {lead.file_urls.map((url, i) => (
                                  <AttachmentPreview key={i} url={url} index={i} />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Status + Date */}
                          <div className="flex items-center justify-between pt-2 border-t border-zinc-800 flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Status:</span>
                              <Select
                                value={lead.status || 'new'}
                                onValueChange={(val) => updateMutation.mutate({ id: lead.id, data: { status: val } })}
                              >
                                <SelectTrigger className="w-40 bg-black border-zinc-800 text-white h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="reviewed">Reviewed</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <span className="text-xs text-zinc-600">
                              Submitted {moment(lead.created_date).format('MMM D, YYYY [at] h:mm A')}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
      <Icon className="w-3 h-3 text-zinc-500" />
      {label}
    </span>
  );
}