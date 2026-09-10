import { getInfection } from '../data/infections.js'
import {
  getRegion,
  getResistanceRates,
  DEFAULT_REGION_ID,
  SOURCE_CAVEAT,
  ESTIMATE_CAVEAT,
} from '../data/regions.js'
import { BOUNDARY_NOTES } from '../data/education.js'
import {
  buildInterpretation,
  buildSourceLine,
  regionInPhrase,
} from '../lib/resistanceSummary.js'
import Button from '../components/Button.jsx'
import BoundaryNote from '../components/BoundaryNote.jsx'
import FactorWeightBar from '../components/FactorWeightBar.jsx'
import ResistanceChart from '../components/ResistanceChart.jsx'
import RiskGauge from '../components/RiskGauge.jsx'
import { Eyebrow } from '../components/Card.jsx'
import { ArrowLeftIcon, PrinterIcon } from '../components/Icons.jsx'

/*
  The printable summary, Sections A to C. This is the page a user brings to an
  appointment.

  Two differences from the results screen, both because paper cannot be clicked:
  every disclosure is rendered open and inline, and Section D is left out, since
  the stewardship tips are for the reader at home rather than for the five
  minutes in the consulting room.

  The gauge and the chart are the same components the results screen uses, so
  there is one implementation of each rather than a copy that drifts. The gauge
  does not animate here: there is no arrival worth playing on a page whose
  purpose is to be printed.

  Printing is handled by the @media print block in src/index.css. The chrome and
  the buttons drop away and this content is what remains.
*/
export default function Summary({ infectionId, regionId, risk, guide, onBack }) {
  const infection = getInfection(infectionId)
  const region = getRegion(regionId)
  const rows = getResistanceRates(regionId, infectionId)
  const interpretation = buildInterpretation(rows[0], region, infection.shortName)

  const isNational = regionId === DEFAULT_REGION_ID
  const baselineRows = isNational ? null : getResistanceRates(DEFAULT_REGION_ID, infectionId)

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 print:hidden">
        <Button variant="primary" size="lg" onClick={() => window.print()}>
          <PrinterIcon width={20} height={20} />
          Print or save as PDF
        </Button>
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeftIcon width={20} height={20} />
          Back to results
        </Button>
      </div>

      <article className="mt-10 print:mt-0">
        <h1 tabIndex={-1} className="text-display text-ink">
          Questions for my appointment
        </h1>

        <p className="mt-3 text-body-lg text-ink-muted">
          {`Prepared with MyPillPal for ${infection.shortName} in ${regionInPhrase(region)}.`}
        </p>

        <BoundaryNote tone="results" className="mt-6" />

        {/* Section A */}
        <section className="mt-10 break-inside-avoid">
          <Eyebrow>My risk level</Eyebrow>

          <div className="mt-5 grid items-start gap-6 sm:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] print:grid-cols-2">
            <div className="rounded-card border border-border p-5">
              <RiskGauge
                score={risk.score}
                tier={risk.tier}
                factorCount={risk.factorCount}
                animate={false}
              />
            </div>

            {risk.contributingFactors.length > 0 ? (
              <div>
                <h2 className="text-h3 text-ink">What contributed</h2>
                <ul className="mt-3 space-y-2.5">
                  {risk.contributingFactors.map((factor) => (
                    <li
                      key={factor.id}
                      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b border-border pb-2.5"
                    >
                      <span className="text-body text-ink">{factor.label}</span>
                      <span className="sr-only">
                        {`adds ${factor.weight} ${factor.weight === 1 ? 'point' : 'points'}`}
                      </span>
                      <FactorWeightBar weight={factor.weight} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        {/* Section B */}
        {rows.length > 0 && (
          <section className="mt-10 break-inside-avoid">
            <Eyebrow>{`Resistance in ${regionInPhrase(region)}`}</Eyebrow>
            <h2 id="summary-resistance-heading" className="sr-only">
              {`Resistance in ${regionInPhrase(region)}`}
            </h2>

            <ResistanceChart
              rows={rows}
              regionName={regionInPhrase(region)}
              infectionLabel={infection.label}
              titleId="summary-resistance-heading"
              baselineRows={baselineRows}
              showBaseline={!isNational}
            />

            {interpretation && (
              <p className="mt-8 max-w-[62ch] text-body text-ink">{interpretation}</p>
            )}

            {/*
              Rendered open rather than behind a Disclosure. A printed page
              cannot be expanded, and the caveats are the honesty requirement.
            */}
            <div className="mt-6 max-w-[62ch] break-inside-avoid rounded-card border border-border p-4">
              <Eyebrow tone="muted">Sources and limits</Eyebrow>
              <p className="mt-2.5 text-body text-ink-muted">{buildSourceLine(region)}</p>
              <p className="mt-2 text-body text-ink-muted">{SOURCE_CAVEAT}</p>
              {region.isEstimate && (
                <p className="mt-2 text-body text-ink-muted">{ESTIMATE_CAVEAT}</p>
              )}
            </div>
          </section>
        )}

        {/* Section C */}
        <section className="mt-10">
          <Eyebrow>Questions I want to ask</Eyebrow>
          <h2 className="sr-only">Questions I want to ask</h2>

          <p className="mt-3 max-w-[62ch] text-body text-ink-muted">
            Starting points, not demands.
          </p>

          <ol className="mt-5 space-y-4">
            {guide.map((entry, index) => (
              <li key={entry.id} className="flex gap-4 break-inside-avoid">
                <span
                  aria-hidden="true"
                  className="tabular flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-label font-semibold text-ink"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="max-w-[62ch] text-body font-semibold text-ink">
                    {entry.question}
                  </p>
                  <p className="mt-1.5 max-w-[62ch] text-body text-ink-muted">
                    {entry.rationale}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/*
          The footer boundary note is part of the shell, which does not print.
          It is repeated here so the printed page never travels without it.
        */}
        <p className="mt-10 hidden max-w-[62ch] border-t border-border pt-4 text-body text-ink-muted print:block">
          {BOUNDARY_NOTES.footer}
        </p>
      </article>
    </div>
  )
}
