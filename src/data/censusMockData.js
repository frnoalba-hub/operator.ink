/**
 * CensusBoard — Mock data (non-PHI: room + referral code only)
 * No names, DOB, SSN. Facility maps code → patient in their EHR.
 * Locations: skilled nursing facilities for SNF census, bed tracking, admissions.
 */

export const STAGES = [
  { id: 'referral', label: 'Referral Received', color: '#3b82f6' },
  { id: 'clinical', label: 'Clinical Review', color: '#f59e0b' },
  { id: 'bed', label: 'Bed Offer', color: '#8b5cf6' },
  { id: 'admitted', label: 'Admitted', color: '#22c55e' },
  { id: 'denied', label: 'Denied / Discharged', color: '#ef4444' },
];

export const PAYERS = ['Medicare', 'HMO', 'Private'];

export const FLAGS = [
  'New',
  'Prior Auth',
  'Missing Docs',
  'Financial Hold',
  'PASRR Pending',
  'Urgent',
  'Complete',
];

export const FACILITIES = {
  A: { name: 'Sunrise Care Center', short: 'Sunrise' },
  B: { name: 'Maple Grove SNF', short: 'Maple Grove' },
  C: { name: 'Riverside Skilled Nursing', short: 'Riverside' },
};

export const MOCK_CASES = [
  { id: '1', room: '204-A', code: 'REF-001', stage: 'referral', payer: 'Medicare', flag: 'New', facility: 'A', coordinatorId: 'k-smith', notes: [], checklist: { medList: false, pasrr: false, faceToFace: false, financial: false } },
  { id: '2', room: '112-B', code: 'REF-002', stage: 'clinical', payer: 'HMO', flag: 'Prior Auth', facility: 'B', coordinatorId: 'j-lee', notes: ['Waiting for MCO callback'], checklist: { medList: true, pasrr: false, faceToFace: true, financial: false } },
  { id: '3', room: '305-A', code: 'REF-003', stage: 'bed', payer: 'Private', flag: 'Urgent', facility: 'A', coordinatorId: 'k-smith', notes: ['Bed hold until Friday'], checklist: { medList: true, pasrr: true, faceToFace: true, financial: false } },
  { id: '4', room: '208-B', code: 'REF-004', stage: 'admitted', payer: 'Medicare', flag: 'Complete', facility: 'B', coordinatorId: 'm-chen', notes: [], checklist: { medList: true, pasrr: true, faceToFace: true, financial: true } },
  { id: '5', room: '—', code: 'REF-005', stage: 'referral', payer: 'HMO', flag: 'Missing Docs', facility: null, coordinatorId: 'j-lee', notes: ['Need face sheet from hospital'], checklist: { medList: false, pasrr: false, faceToFace: false, financial: false } },
  { id: '6', room: '401-B', code: 'REF-006', stage: 'clinical', payer: 'Medicare', flag: 'Financial Hold', facility: 'B', coordinatorId: 'm-chen', notes: [], checklist: { medList: true, pasrr: true, faceToFace: false, financial: false } },
  { id: '7', room: '103-A', code: 'REF-007', stage: 'referral', payer: 'Private', flag: 'New', facility: 'A', coordinatorId: 'k-smith', notes: [], checklist: { medList: false, pasrr: false, faceToFace: false, financial: false } },
  { id: '8', room: '—', code: 'REF-008', stage: 'denied', payer: 'HMO', flag: 'Complete', facility: null, coordinatorId: 'j-lee', notes: ['Family chose another facility'], checklist: { medList: true, pasrr: true, faceToFace: true, financial: false } },
  { id: '9', room: '210-B', code: 'REF-009', stage: 'bed', payer: 'Medicare', flag: 'PASRR Pending', facility: 'B', coordinatorId: 'm-chen', notes: ['Level 2 screen submitted'], checklist: { medList: true, pasrr: false, faceToFace: true, financial: true } },
  { id: '10', room: '302-A', code: 'REF-010', stage: 'admitted', payer: 'Medicare', flag: 'Complete', facility: 'A', coordinatorId: 'k-smith', notes: [], checklist: { medList: true, pasrr: true, faceToFace: true, financial: true } },
];

export const MOCK_COORDINATORS = [
  { id: 'k-smith', name: 'K. Smith', facility: 'Sunrise Care Center', referrals: 2, admitted: 1, denied: 0, inProgress: 1 },
  { id: 'j-lee', name: 'J. Lee', facility: 'Maple Grove SNF', referrals: 2, admitted: 0, denied: 1, inProgress: 2 },
  { id: 'm-chen', name: 'M. Chen', facility: 'Maple Grove SNF', referrals: 1, admitted: 1, denied: 0, inProgress: 0 },
  { id: 'r-davis', name: 'R. Davis', facility: 'Sunrise Care Center', referrals: 0, admitted: 0, denied: 0, inProgress: 0 },
  { id: 't-park', name: 'T. Park', facility: 'Riverside Skilled Nursing', referrals: 0, admitted: 0, denied: 0, inProgress: 0 },
];
