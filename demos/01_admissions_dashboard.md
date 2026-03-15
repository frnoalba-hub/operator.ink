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

2. **Patient Cards** (must show **name** + admission context)
   - Required: **Patient Name** (primary identifier)
   - Display: Facility (Building A/B/C), Payer (Medicare/HMO/Private), Task Progress (e.g., 2/4 checklist done)
   - Click to open side panel for:
     * Facility assignment
     * Payer selection
     * Stage checklist: Medication List, PASRR Level 1, Face-to-face scheduled, Financial clearance
     * Notes

3. **Analytics Page**
   - Total Referrals
   - Admitted / Denied counts
   - 7-day bed forecast or referral conversion rate

4. **Agent Activity Log**
   - Auto-scrolling simulated log (e.g., "[AGENT] Verifying HMO Eligibility… Done")

5. **New Referral Input**
   - Quick-add to insert a patient (with **name**) into Referral Received

**Additional Requirements:**
- Fully responsive SPA
- Clean, modular, production-ready code
- Side panel / drawer for managing patient details
- Local state management with option to integrate backend later

**Deliverable:**
Interactive frontend demo showing pipeline, patient cards with names, side panel, and analytics.

---

*Ready to send as a demo request to frontend companies or agencies.*
