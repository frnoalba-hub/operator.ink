/**
 * SummaryBox — TL;DR / executive summary for GEO (Generative Engine Optimization).
 * AI models look for concise, structured summaries to pull into direct answers.
 * Place at the top of content-heavy pages for maximum machine-readability.
 *
 * @param {string} title - Label (e.g. "TL;DR", "Summary", "At a Glance")
 * @param {string[]} items - Bullet points (prefer 3–7 for optimal parsing)
 */
export default function SummaryBox({ title = 'TL;DR', items }) {
  if (!items?.length) return null;

  return (
    <aside
      className="retro-card rounded-2xl p-6 border-l-4 mb-8"
      style={{ borderLeftColor: 'var(--retro-border-bright)' }}
      aria-labelledby="summary-heading"
    >
      <h2 id="summary-heading" className="text-xs uppercase tracking-widest text-[var(--retro-text-dim)] font-bold mb-4">
        {title}
      </h2>
      <ul className="space-y-2 text-sm text-[var(--retro-text)]">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: 'var(--rgb-gradient)' }} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
