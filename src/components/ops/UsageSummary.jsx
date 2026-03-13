import React from 'react';
import { Phone, MessageCircle, Cpu, DollarSign } from 'lucide-react';

export default function UsageSummary({ stats = {} }) {
  const items = [
    { icon: Phone, label: 'Calls', value: stats.calls ?? 0 },
    { icon: MessageCircle, label: 'Messages', value: stats.messages ?? 0 },
    { icon: Cpu, label: 'Tasks', value: stats.tasks ?? 0 },
    { icon: DollarSign, label: 'Cost', value: `$${((stats.costCents ?? 0) / 100).toFixed(2)}` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="retro-card rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4" style={{ color: 'var(--retro-text)' }} />
            <span className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold">{label}</span>
          </div>
          <span className="text-2xl font-bold" style={{ color: 'var(--retro-text)' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}
