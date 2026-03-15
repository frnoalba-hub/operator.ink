# Demo Project Prompt — Operator.ink Admissions Dashboard

**Project Name:** Operator.ink Admissions & Bed Tracking Dashboard

**Objective:**
Build a modern, interactive web dashboard for managing patient admissions and bed availability in skilled nursing facilities (SNFs). Admissions coordinators track **patient name** and **admission status** through a referral-to-admission workflow.

**How SNF Admissions Work:**
1. **Referral Received** — Patient arrives from hospital/physician. Capture: name, source, initial docs.
2. **Clinical Review** — Assess admission criteria. Checklist: Medication List, PASRR Level 1 (federally required), Face-to-face scheduled, diagnosis.
3. **Bed Offer / Financial** — Verify insurance (Medicare/HMO/Private), prior auth, bed assignment (Building A/B/C).
4. **Admitted** — Agreement signed, patient moved in.
5. **Denied / Discharged** — Rejected or discharged.

**Design Style:**
- Dark command-center aesthetic
- Professional, high-trust layout
- Inspiration: Vercel, Linear
- Grid-based, responsive, minimalistic
- Subtle animations and clean typography

**Technology Stack (preferred):**
- React + Vite
- Tailwind CSS
- Framer Motion (for smooth transitions)
- Lucide icons

**Core Features:**

1. **Admissions Pipeline Board**
   - Five stages: Referral Received, Clinical Review, Bed Offer / Financial, Admitted, Denied / Discharged
   - Drag-and-drop patient cards between stages

2. **Patient Cards** (must show **name** + **payer** + admission context)
   - Required: **Patient Name** (primary identifier)
   - **Payer selection & tracking:** Pick Medicare, HMO, or Private per patient. Display and track on card. In SNFs, payer often changes mid-stay (e.g., Medicare for 20 days, then Private Pay). Add **Payer Switch** or **Benefit Verification** status in checklist.
   - Display: Facility (Building A/B/C), Payer (Medicare/HMO/Private), Task Progress (e.g., 2/4 checklist done)
   - **Status flags:** New, Prior Auth, Urgent, Complete. Mark Complete when finished; clear/discharge patient.
   - Click to open side panel for:
     * Facility assignment
     * Payer selection
     * Stage checklist: Medication List, PASRR Level 1, Face-to-face scheduled, Financial clearance, Benefit Verification / Payer Switch
     * Notes

3. **Analytics Page**
   - Total Referrals
   - Admitted / Denied counts
   - 7-day bed forecast or referral conversion rate

4. **Notifications**
   - Alerts when new referrals arrive, when a patient moves stages, or when items need attention (e.g., prior auth pending)

5. **Agent Activity Log**
   - Auto-scrolling simulated log (e.g., "[AGENT] Verifying HMO Eligibility… Done")

6. **New Referral Input**
   - Quick-add to insert a patient (with **name**) into Referral Received

**Flags on patient cards:**
- New, Prior Auth, Urgent, Complete — status flags to prioritize and track. Mark Complete when finished with a patient; clear/discharge when done.

**User roles & coordinator coordination:**
- **Coordinators (e.g. 10):** Each uses the dashboard for their own pipeline. They can **talk to each other** — see who has beds (Building A/B/C), message to coordinate, share availability.
- **Admin account:** Views all coordinators, all pipelines, and metrics.

**Additional Requirements:**
- **Mobile-first admissions view** — Coordinators often walk the floor. Prioritize mobile experience for on-the-move use.
- Payer selection & tracking — Medicare, HMO, Private per patient, visible on card; support payer switch mid-stay
- Clearer data — filters, drill-down, export
- Fully responsive SPA
- Clean, modular, production-ready code
- Side panel / drawer for managing patient details
- Local state management with option to integrate backend later

**Deliverable:**
Interactive frontend demo showing pipeline, patient cards with names, side panel, and analytics.

> **HIPAA / Security Note:** This demo uses **synthetic/mock data only**. No real PHI. Mentioning security early builds trust with facility stakeholders.

**Phase-0 Scoping (for $3k pilot):**

| Priority | Feature | Severity |
|----------|---------|----------|
| High | Drag-and-drop Pipeline (5 stages) | Structural |
| High | Patient Cards with Payer Tracking | Critical |
| Med | Multi-admin View (Coordinators vs. Admin) | UI/Logic |
| Med | Analytics (Bed Forecast / Referral Counts) | UI |
| Low | Export Functionality | UI |

---

*Ready to send as a demo request to frontend companies or agencies.*
