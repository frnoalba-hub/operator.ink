# Admissions Dashboard — Technical Implementation Plan

**Stack:** React + Vite, Tailwind CSS, Framer Motion, Lucide icons  
**Scope:** Phase-0 Pilot ($3k) — Interactive frontend demo, synthetic data only.

---

## Architecture Overview

```
src/
├── components/
│   ├── pipeline/
│   │   ├── PipelineBoard.jsx      # 5-column drag-and-drop container
│   │   ├── PipelineColumn.jsx     # Single stage column
│   │   └── PatientCard.jsx       # Card with name, payer, flags
│   ├── patient/
│   │   ├── PatientSidePanel.jsx   # Drawer/sheet for details
│   │   └── PayerSelect.jsx        # Medicare/HMO/Private + switch
│   ├── analytics/
│   │   └── AnalyticsCards.jsx     # Referrals, admitted, forecast
│   └── admin/
│       └── AdminViewToggle.jsx    # Coordinator vs Admin view
├── pages/
│   ├── AdmissionsDashboard.jsx    # Main dashboard page
│   └── MobileAdmissionsView.jsx   # Mobile-first alternate (or responsive breakpoint)
├── lib/
│   ├── mockData.js                # Synthetic patients, no PHI
│   └── store.js                   # Zustand or React state
└── styles/
    └── command-center.css        # Dark theme, #0B0F14, Cyber Blue accents
```

---

## Implementation Phases

### Phase 1: Foundation (Days 1–2)

| Task | Detail |
|------|--------|
| Vite + React scaffold | `npm create vite@latest` |
| Tailwind + Framer Motion | Install, config dark theme |
| Command-center theme | `#0B0F14` bg, `#00D4FF` accent, grain overlay |
| State store | Zustand or `useReducer` for patients, stages, user role |
| Mock data | 5 stages, 8–12 synthetic patients, payer + flag fields |

### Phase 2: Pipeline (Days 3–4) — **High Priority**

| Task | Detail |
|------|--------|
| PipelineBoard | 5 columns, `@hello-pangea/dnd` or `react-beautiful-dnd` |
| PipelineColumn | Empty state, drop target, stage label |
| PatientCard | Name, payer badge, flag (New/Prior Auth/Urgent/Complete) |
| Drag logic | Update patient `stageId` on drop; persist in store |

### Phase 3: Patient Details (Days 5–6)

| Task | Detail |
|------|--------|
| Side panel | Radix Sheet or custom drawer; open on card click |
| Payer select | Dropdown: Medicare, HMO, Private; support multiple (payer switch) |
| Stage checklist | 4–5 items: Med List, PASRR, Face-to-face, Financial, Benefit Verification |
| Notes field | Textarea, local state |

### Phase 4: Roles & Coordination (Day 7)

| Task | Detail |
|------|--------|
| Role toggle | Coordinator (my pipeline) vs Admin (all + metrics) |
| Coordinator filter | Filter patients by `assignedTo` (coordinator ID) |
| Admin view | Show all coordinators’ pipelines; aggregate metrics |
| Bed availability | Simple "Building A: 3 beds" — coordinators see who has capacity |

### Phase 5: Analytics & Polish (Days 8–9)

| Task | Detail |
|------|--------|
| Analytics cards | Total Referrals, Admitted, Denied, 7-day bed forecast |
| Notifications | Simulated badge or toast for "new referral" |
| Agent log | Auto-scroll div with mock `[AGENT] Verifying...` lines |
| Export (Low) | CSV export of pipeline data — optional for Phase-0 |

### Phase 6: Mobile-First (Day 10)

| Task | Detail |
|------|--------|
| Responsive pipeline | Horizontal scroll columns or tab-per-stage on mobile |
| Touch-friendly cards | Larger tap targets, swipe gestures if using DnD |
| Mobile admissions view | Prioritized layout for coordinators on the floor |

---

## Data Model (Mock)

```ts
interface Patient {
  id: string;
  name: string;
  stageId: 'referral' | 'clinical' | 'bed' | 'admitted' | 'denied';
  payer: 'Medicare' | 'HMO' | 'Private';
  payerHistory?: { payer: string; fromDate: string }[]; // Payer switch
  flag: 'New' | 'Prior Auth' | 'Urgent' | 'Complete';
  facility?: 'A' | 'B' | 'C';
  assignedTo?: string; // coordinator ID
  checklist: { id: string; label: string; done: boolean }[];
}
```

---

## Security / HIPAA

- **Demo only:** All data synthetic. No PHI. Add disclaimer in app footer.
- **Production path:** Backend auth, encryption, audit logs — out of Phase-0 scope.

---

## Estimated Timeline

| Phase | Days | Cumulative |
|-------|------|------------|
| 1. Foundation | 2 | 2 |
| 2. Pipeline | 2 | 4 |
| 3. Patient Details | 2 | 6 |
| 4. Roles | 1 | 7 |
| 5. Analytics | 2 | 9 |
| 6. Mobile | 1 | 10 |

**Total:** ~10 working days for Phase-0 demo.

---

*For Operator.ink Admissions Dashboard — Phase-0 Pilot.*
