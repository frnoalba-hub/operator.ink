import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Mail, Building2, Clock, DollarSign, FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import moment from 'moment';

const SERVICE_LABELS = {
  'web-design': 'Web Design & Operations',
  'seo': 'GEO, AEO & SEO',
  'workflows': 'Workflows & AI Agents',
  'ads': 'Ads & Brand Identity',
  'multiple': 'Multiple Services',
};

const STATUS_COLORS = {
  'new': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'reviewed': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'in-progress': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'closed': 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

export default function Leads() {
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
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Dashboard</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">Lead Submissions</h1>

        {leads.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 p-12 text-center text-zinc-500">
            No submissions yet.
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => {
              const expanded = expandedId === lead.id;
              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-zinc-800 overflow-hidden"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))' }}
                >
                  {/* Header Row */}
                  <button
                    onClick={() => setExpandedId(expanded ? null : lead.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-white truncate">{lead.client_name}</span>
                        <Badge className={`text-xs border ${STATUS_COLORS[lead.status] || STATUS_COLORS['new']}`}>
                          {lead.status}
                        </Badge>
                        <span className="text-xs text-zinc-500">{moment(lead.created_date).fromNow()}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-zinc-400">
                        <span className="flex items-center gap-1 truncate"><Mail className="w-3 h-3" /> {lead.client_email}</span>
                        {lead.service && <span className="hidden sm:inline">{SERVICE_LABELS[lead.service] || lead.service}</span>}
                      </div>
                    </div>
                    {expanded ? <ChevronUp className="w-5 h-5 text-zinc-500 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-zinc-500 flex-shrink-0" />}
                  </button>

                  {/* Expanded Detail */}
                  {expanded && (
                    <div className="border-t border-zinc-800 p-5 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {lead.company && (
                          <DetailItem icon={Building2} label="Company" value={lead.company} />
                        )}
                        <DetailItem icon={FileText} label="Service" value={SERVICE_LABELS[lead.service] || lead.service} />
                        {lead.budget && (
                          <DetailItem icon={DollarSign} label="Budget" value={lead.budget} />
                        )}
                        {lead.timeline && (
                          <DetailItem icon={Clock} label="Timeline" value={lead.timeline} />
                        )}
                      </div>

                      {lead.conditional_answer && (
                        <div>
                          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Follow-up Answer</p>
                          <p className="text-sm text-zinc-300">{lead.conditional_answer}</p>
                        </div>
                      )}

                      <div>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-1">Project Scope</p>
                        <p className="text-sm text-zinc-300 whitespace-pre-wrap">{lead.scope}</p>
                      </div>

                      {lead.file_urls?.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Attachments</p>
                          <div className="flex flex-wrap gap-2">
                            {lead.file_urls.map((url, i) => (
                              <a
                                key={i}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-cyan-400 hover:border-cyan-500/30 transition-colors"
                              >
                                <FileText className="w-4 h-4" /> File {i + 1} <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Status Update */}
                      <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
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
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-sm text-zinc-300">{value}</p>
      </div>
    </div>
  );
}