import { getInfection } from '../data/infections.js'
import {
  getRegion,
  getResistanceRates,
  DEFAULT_REGION_ID,
  SOURCE_CAVEAT,
  ESTIMATE_CAVEAT,
} from '../data/regions.js'
import { STEWARDSHIP_TIPS, RISK_TIER_COPY } from '../data/education.js'
import {
  buildInterpretation,
  regionInPhrase,
  sourceScope,
} from '../lib/resistanceSummary.js'
import Button from '../components/Button.jsx'
import Disclosure from '../components/Disclosure.jsx'
import BoundaryNote from '../components/BoundaryNote.jsx'
import FactorWeightBar from '../components/FactorWeightBar.jsx'
import ResistanceChart from '../components/ResistanceChart.jsx'
import RiskGauge from '../components/RiskGauge.jsx'
import SourceChip from '../components/SourceChip.jsx'
import { Card, Eyebrow, Section } from '../components/Card.jsx'
import { CheckIcon, PrinterIcon } from '../components/Icons.jsx'
import PillPal from '../components/PillPal.jsx'

/*
  Decorative poses for the stewardship tiles. Neutral and encouraging ones
  only: nothing celebratory anywhere on this screen, since a cheering mascot
  beside a risk profile reads as a verdict on it.
*/
const TIP_POSES = ['holdingClipboard', 'reading', 'pointing', 'walking', 'sitting', 'thinking']

/*
  Screen 4, the payoff. Four sections, in the order the PRD sets out:

    A  Your risk level
    B  Resistance in your area
    C  Your doctor conversation guide
    D  What you can do

  The scope guard lives here as much as anywhere: the boundary note sits above
  the risk output, the guide is framed as questions rather than instructions,
  and no figure appears without its source and year.

  PillPal sits in the header block, well clear of the boundary note below it.
  The mascot carries warmth and must never be read as medical reassurance.
*/
export default function Results({
  infectionId,
  regionId,
  risk,
  guide,
  onExport,
  onBack,
  onRestart,
}) {
  const infection = getInfection(infectionId)
  const region = getRegion(regionId)
  const rows = getResistanceRates(regionId, infectionId)
  const interpretation = buildInterpretation(rows[0], region, infection.shortName)
  const tierCopy = RISK_TIER_COPY[risk.tier]

  // The national figures behind the comparison markers. Comparing the national
  // average to itself would be noise, so it is left off in that case.
  const isNational = regionId === DEFAULT_REGION_ID
  const baselineRows = isNational ? null : getResistanceRates(DEFAULT_REGION_ID, infectionId)

  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <Eyebrow>Your profile</Eyebrow>
          <h1 tabIndex={-1} className="mt-3 text-display text-ink">
            Your resistance risk profile
          </h1>
          <p className="mt-3 max-w-[52ch] text-body-lg text-ink-muted">
            {`For ${infection.shortName} in ${regionInPhrase(region)}.`}
          </p>
        </div>
        {/*
          A neutral presenting pose, not a celebratory one. This heading block
          sits directly above the boundary note, and a cheering mascot beside a
          set of results would read as reassurance about them.
        */}
        <PillPal
          size={76}
          pose="presentingChart"
          className="hidden shrink-0 sm:block print:hidden"
        />
      </div>

      <BoundaryNote tone="results" className="mt-6" />

      <Section eyebrow="Section A" title="Your risk level">
        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <Card tone="surface" pad="lg" className="min-w-0">
            <RiskGauge
              score={risk.score}
              tier={risk.tier}
              factorCount={risk.factorCount}
            />
          </Card>

          <div className="min-w-0">
            <h3 className="text-h3 text-ink">{tierCopy.headline}</h3>
            <p className="mt-2 max-w-[62ch] text-body text-ink-muted">{tierCopy.body}</p>

            {risk.contributingFactors.length === 0 ? (
              <Card tone="tint" pad="md" className="mt-5 flex items-center gap-4">
                <PillPal size={52} pose="reassuring" className="shrink-0" />
                <p className="text-body text-ink">
                  No risk factors ticked. Regional resistance still matters, so
                  section B is worth a read.
                </p>
              </Card>
            ) : (
              <div className="mt-6">
                <Eyebrow tone="muted">What contributed</Eyebrow>
                <ul className="mt-3 space-y-3">
                  {risk.contributingFactors.map((factor) => (
                    <Card as="li" key={factor.id} pad="sm" shadow={false}>
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        <span className="text-body text-ink">{factor.label}</span>
                        <span className="sr-only">
                          {`adds ${factor.weight} ${factor.weight === 1 ? 'point' : 'points'}`}
                        </span>
                        <FactorWeightBar weight={factor.weight} />
                      </div>
                      <Disclosure>{factor.evidence}</Disclosure>
                    </Card>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/*
        Section A gets no mascot. It sits directly under the BoundaryNote, and
        PillPal never appears beside a disclaimer. B onward are far enough down
        the page to be clear of it.
      */}
      <Section
        eyebrow="Section B"
        title={`Resistance in ${regionInPhrase(region)}`}
        titleId="resistance-heading"
        pose="magnifying"
      >
        {rows.length === 0 ? (
          <p className="mt-4 max-w-[62ch] text-body text-ink-muted">
            We do not have resistance figures for this combination of infection
            and region. The questions below are still worth asking.
          </p>
        ) : (
          <Card tone="surface" pad="lg" className="mt-5">
            <p className="max-w-[62ch] text-body text-ink">
              {`How often the bacteria behind ${infection.shortName} did not respond to each antibiotic. Read this as background, not as a menu to choose from.`}
            </p>

            <ResistanceChart
              rows={rows}
              regionName={regionInPhrase(region)}
              infectionLabel={infection.label}
              titleId="resistance-heading"
              baselineRows={baselineRows}
              showBaseline={!isNational}
            />

            {interpretation ? (
              <p className="mt-8 max-w-[62ch] border-l-2 border-primary-soft pl-4 text-body text-ink">
                {interpretation}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SourceChip
                source={region.source}
                year={region.year}
                scope={sourceScope(region)}
              />
              <Disclosure label="How to read these numbers">
                <p>{SOURCE_CAVEAT}</p>
                {region.isEstimate ? <p className="mt-3">{ESTIMATE_CAVEAT}</p> : null}
              </Disclosure>
            </div>
          </Card>
        )}
      </Section>

      <Section eyebrow="Section C" title="Your doctor conversation guide" pose="talking">
        {/*
          The framing that used to sit here as a grey paragraph. It is a real
          point, not boilerplate: these are starting points, and a doctor who
          says no to an antibiotic is usually right. Kept short and attached to
          the heading rather than floating above the list.
        */}
        <p className="mt-3 max-w-[62ch] text-body text-ink-muted">
          Starting points, not demands. If your doctor explains why an antibiotic
          is not needed, that is usually the right call.
        </p>

        <ol className="mt-5 space-y-3">
          {guide.map((entry, index) => (
            <Card as="li" key={entry.id} pad="md">
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="tabular flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-label font-semibold text-primary"
                >
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-body font-semibold text-ink">{entry.question}</p>
                  <p className="mt-1.5 max-w-[62ch] text-body text-ink-muted">
                    {entry.rationale}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Section D" title="What you can do" pose="thumbsUp">
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEWARDSHIP_TIPS.map((tip, index) => (
            <Card as="li" key={tip.id} pad="md" className="relative isolate overflow-hidden">
              <PillPal
                size={88}
                pose={TIP_POSES[index % TIP_POSES.length]}
                decorative
                className="pointer-events-none absolute -bottom-4 -right-3 -z-10 opacity-[0.12] print:hidden"
              />
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-tint text-primary">
                <CheckIcon width={18} height={18} />
              </span>
              <h3 className="mt-3 text-h3 text-ink">{tip.title}</h3>
              <p className="mt-1.5 text-body text-ink-muted">{tip.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Button variant="primary" size="lg" onClick={onExport}>
          <PrinterIcon width={20} height={20} />
          Get printable summary
        </Button>
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="quiet" onClick={onRestart}>
          Start over
        </Button>
      </div>
    </div>
  )
}
