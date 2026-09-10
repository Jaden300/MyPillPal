import { DatabaseIcon } from './Icons.jsx'

/*
  Source attribution as a chip.

  Every statistic in this app shows its source, its year, and its geographic
  scope. That is an honesty requirement from the PRD, not optional polish, and
  it is the reason this component exists: the grey caveat paragraphs that used
  to carry it are gone, and the requirement had to land somewhere that does not
  read as fine print.

  A chip is a different object class from a paragraph. It sits at the eyebrow
  size, uppercase and heavy, which is legible at 15px in a way a 13.5px
  sentence never was.

  An estimate is styled louder than a measurement, not quieter. When a figure
  is a national stand in rather than local data, the chip switches to the
  accent tone so the weakest data is the most flagged thing on the panel.
*/
export default function SourceChip({ source, year, scope, className = '' }) {
  const isEstimate = scope === 'estimate'

  const scopeLabel = {
    local: 'local antibiogram',
    national: 'national average',
    estimate: 'national estimate, not local data',
  }[scope]

  const tone = isEstimate
    ? 'border-accent bg-accent-soft text-accent'
    : 'border-border bg-surface-sunken text-ink-muted'

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-button border px-3 py-1.5 ${tone} ${className}`}
    >
      <DatabaseIcon width={16} height={16} className="shrink-0" />
      <span className="text-eyebrow uppercase">
        {isEstimate ? scopeLabel : `${source} ${year}, ${scopeLabel}`}
      </span>
    </p>
  )
}
