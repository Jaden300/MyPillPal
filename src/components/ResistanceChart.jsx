/*
  The resistance rate chart for Section B.

  Horizontal bars, one per antibiotic, drawn as inline SVG so nothing has to be
  loaded and so the bars survive a print. Each row is its own small fixed height
  SVG inside a normal flow list rather than one tall chart, which means the
  labels stay real text at body size and the whole thing reflows at 320px
  instead of scrolling sideways. Keep that: it is what makes the chart work on a
  phone and in a screen reader.

  Colour rule from docs/conventions.md: a three step ramp keyed to magnitude, at
  full opacity. The old version varied opacity, which encoded the same thing the
  bar length already said and printed badly. Risk colours stay reserved for risk
  tiers and for the top resistance band, which carries the same meaning.

  Nothing here relies on a fill alone. Every row states its percentage as text,
  gridlines and the baseline are strokes rather than tints, and the baseline
  carries a text label as well as a tick, so the chart survives a print with
  background graphics switched off.
*/

// Bars sit on a 0 to 100 scale, so a 34 percent rate fills roughly a third of
// the track. Anything else would overstate a small number.
const TRACK_WIDTH = 100
const BAR_HEIGHT = 16
const TICKS = [0, 25, 50, 75, 100]

function formatPercent(rate) {
  return `${Math.round(rate * 100)}%`
}

// Three bands rather than a gradient. At 40 percent and above, roughly two in
// five samples not responding is the thing a reader should notice first.
function barClassForRate(rate) {
  if (rate >= 0.4) return 'fill-risk-elevated'
  if (rate >= 0.2) return 'fill-primary'
  return 'fill-primary-mid'
}

export default function ResistanceChart({
  rows,
  regionName,
  infectionLabel,
  titleId,
  baselineRows,
  showBaseline = true,
}) {
  if (!rows || rows.length === 0) return null

  const baselineFor = (antibiotic) => {
    if (!showBaseline || !baselineRows) return null
    return baselineRows.find((row) => row.antibiotic === antibiotic) ?? null
  }

  const description = rows
    .map((row) => {
      const baseline = baselineFor(row.antibiotic)
      const covers = row.alsoCovers?.length
        ? `, which also applies to ${row.alsoCovers.join(' and ')}`
        : ''
      const against = baseline
        ? `, compared with ${formatPercent(baseline.rate)} for the United States national average`
        : ''
      return `${row.antibiotic}${covers}, ${formatPercent(row.rate)} resistant${against}`
    })
    .join('. ')

  return (
    <figure className="mt-5" role="group" aria-labelledby={titleId}>
      {/*
        One axis above the list rather than one per row. Every row shares the
        same 0 to 100 scale, so repeating it would be noise.
      */}
      <div aria-hidden="true" className="mb-4">
        <svg
          viewBox={`0 0 ${TRACK_WIDTH} 4`}
          preserveAspectRatio="none"
          className="h-1 w-full"
        >
          {TICKS.map((tick) => (
            <line
              key={tick}
              x1={tick}
              y1="0"
              x2={tick}
              y2="4"
              className="stroke-border-strong"
              strokeWidth="0.4"
            />
          ))}
        </svg>
        <div className="mt-1 flex justify-between">
          {TICKS.map((tick) => (
            <span key={tick} className="tabular text-eyebrow text-ink-muted">
              {tick}%
            </span>
          ))}
        </div>
      </div>

      <ul className="space-y-6">
        {rows.map((row, index) => {
          const baseline = baselineFor(row.antibiotic)
          // The tick sits exactly on the value. Its label is clamped inward so
          // a baseline near either end does not overflow the container.
          const labelPosition = baseline
            ? Math.min(Math.max(baseline.rate * 100, 6), 94)
            : 0

          return (
            <li key={`${row.pathogen}-${row.antibiotic}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="text-body text-ink">{row.antibiotic}</span>
                <span className="tabular text-h3 text-ink">{formatPercent(row.rate)}</span>
              </div>

              <div className="relative mt-2">
                <svg
                  viewBox={`0 0 ${TRACK_WIDTH} ${BAR_HEIGHT}`}
                  preserveAspectRatio="none"
                  className="h-5 w-full"
                  aria-hidden="true"
                >
                  <rect
                    x="0"
                    y="0"
                    width={TRACK_WIDTH}
                    height={BAR_HEIGHT}
                    rx="2"
                    className="fill-surface-sunken stroke-border"
                    strokeWidth="0.5"
                  />

                  {TICKS.slice(1, -1).map((tick) => (
                    <line
                      key={tick}
                      x1={tick}
                      y1="0"
                      x2={tick}
                      y2={BAR_HEIGHT}
                      className="stroke-border"
                      strokeWidth="0.4"
                    />
                  ))}

                  <rect
                    x="0"
                    y="0"
                    width={Math.max(row.rate * TRACK_WIDTH, 0.8)}
                    height={BAR_HEIGHT}
                    rx="2"
                    className={`${barClassForRate(row.rate)} origin-left animate-[grow-bar_var(--duration-slow)_var(--ease-out-soft)_both]`}
                    style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
                  />

                  {baseline ? (
                    <line
                      x1={baseline.rate * TRACK_WIDTH}
                      y1="0"
                      x2={baseline.rate * TRACK_WIDTH}
                      y2={BAR_HEIGHT}
                      className="stroke-accent"
                      strokeWidth="1"
                      strokeDasharray="2 1.5"
                    />
                  ) : null}
                </svg>
              </div>

              <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-4">
                <p className="text-body text-ink-muted">
                  Found in {row.pathogen}
                  {row.alsoCovers?.length ? (
                    <span className="block">
                      {`Also applies to ${row.alsoCovers.join(' and ')}`}
                    </span>
                  ) : null}
                </p>
                {baseline ? (
                  <p aria-hidden="true" className="tabular text-eyebrow uppercase text-accent">
                    {`US avg ${formatPercent(baseline.rate)}`}
                  </p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>

      {/*
        The bars are aria-hidden decoration. This is what a screen reader gets
        instead, so the data arrives without anyone having to parse geometry.
      */}
      <figcaption className="sr-only">
        Resistance rates for {infectionLabel} in {regionName}. {description}.
      </figcaption>
    </figure>
  )
}
