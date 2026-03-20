/** @param {number} n */
export function fmt(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(Math.round(n));
}

export function gradeStyle(grade) {
  if (grade === 'A') return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
  if (grade === 'B') return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
  return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
}

/** Human-friendly label for the grade badge. */
export const GRADE_LABEL = /** @type {const} */ ({
  A: 'Great fit',
  B: 'Solid',
  C: 'Crowded',
});

export function gradeFromRatio(ratio) {
  if (ratio >= 200) return 'A';
  if (ratio >= 80) return 'B';
  return 'C';
}

/** Scale illustrative hourly shape to match current live viewer total (until snapshot store exists). */
export function scaleMockToLive(templateRows, liveViewerTotal) {
  if (!templateRows?.length || !liveViewerTotal || liveViewerTotal < 1) {
    return templateRows;
  }
  const peak = Math.max(...templateRows.map((r) => r.ccv), 1);
  const scale = liveViewerTotal / peak;
  return templateRows.map((r) => ({
    ...r,
    ccv: Math.max(0, Math.round(r.ccv * scale)),
    viewerHoursK: Math.round(r.viewerHoursK * scale * 10) / 10,
  }));
}

export const chartAxisStyle = { fontSize: 11, fill: 'rgba(255,255,255,0.45)', fontWeight: 500 };
export const chartTooltipStyle = {
  backgroundColor: 'rgba(10,10,14,0.96)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '14px',
  fontSize: 12,
  padding: '10px 14px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
};
