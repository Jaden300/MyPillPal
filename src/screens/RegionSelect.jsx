import {
  US_STATE_REGIONS,
  WHO_REGIONS,
  DEFAULT_REGION_ID,
  getRegion,
  getResistanceRates,
} from '../data/regions.js'
import { getInfection } from '../data/infections.js'
import { sourceScope } from '../lib/resistanceSummary.js'
import Button from '../components/Button.jsx'
import Select from '../components/Select.jsx'
import SourceChip from '../components/SourceChip.jsx'
import { Card, Eyebrow } from '../components/Card.jsx'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from '../components/Icons.jsx'

/*
  Screen 3: region selection.

  "I would rather not say" is a first class option, not a fallback buried at the
  bottom, because location can be identifying and this tool asks for nothing it
  does not need. What that choice means is attached to the option itself as a
  hint, rather than explained in a paragraph below the control.

  The comparison panel is the point of this screen. Picking a region used to
  change a hidden variable and nothing visible, which made the control feel
  inconsequential. Now the choice immediately shows how that place compares to
  the national picture, using the figure with the widest spread in the data.
*/
function buildOptions() {
  return [
    {
      value: DEFAULT_REGION_ID,
      label: 'I am not sure, or I would rather not say',
      hint: 'Shows United States national averages',
    },
    {
      groupLabel: 'United States',
      options: US_STATE_REGIONS.map((region) => ({
        value: region.id,
        label: region.name,
      })),
    },
    {
      groupLabel: 'World regions',
      options: WHO_REGIONS.map((region) => ({
        value: region.id,
        label: region.name,
      })),
    },
  ]
}

function ComparisonBar({ label, rate, tone }) {
  const percent = Math.round(rate * 100)

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className={`text-body ${tone === 'muted' ? 'text-ink-muted' : 'text-ink'}`}>
          {label}
        </span>
        <span
          className={`tabular text-h3 ${tone === 'muted' ? 'text-ink-muted' : 'text-ink'}`}
        >
          {percent}%
        </span>
      </div>
      <svg
        viewBox="0 0 100 16"
        preserveAspectRatio="none"
        className="mt-1.5 h-5 w-full"
        aria-hidden="true"
      >
        <rect
          x="0"
          y="0"
          width="100"
          height="16"
          rx="2"
          className="fill-surface-sunken stroke-border"
          strokeWidth="0.5"
        />
        <rect
          x="0"
          y="0"
          width={Math.max(rate * 100, 0.8)}
          height="16"
          rx="2"
          className={tone === 'muted' ? 'fill-border-strong' : 'fill-primary'}
        />
      </svg>
    </div>
  )
}

export default function RegionSelect({
  regionId,
  infectionId,
  onChange,
  onBack,
  onContinue,
}) {
  const region = getRegion(regionId)
  const infection = getInfection(infectionId)
  const isNational = regionId === DEFAULT_REGION_ID

  // The region's highest figure, and the national number for the same drug.
  const top = getResistanceRates(regionId, infectionId)[0]
  const nationalRow = top
    ? getResistanceRates(DEFAULT_REGION_ID, infectionId).find(
        (row) => row.antibiotic === top.antibiotic,
      )
    : null

  const difference = top && nationalRow
    ? Math.round(top.rate * 100) - Math.round(nationalRow.rate * 100)
    : null

  const DiffIcon = difference > 0 ? ArrowUpIcon : ArrowDownIcon

  return (
    <div>
      <Eyebrow>Location</Eyebrow>
      <h1 tabIndex={-1} className="mt-3 text-display text-ink">
        Where are you?
      </h1>
      <p className="mt-4 max-w-[62ch] text-body-lg text-ink">
        Resistance patterns vary a lot from place to place. A drug that still
        works well in one region may be a poor first choice in another.
      </p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <Select
          label="Your location"
          value={regionId}
          onChange={onChange}
          options={buildOptions()}
        />

        {top ? (
          <Card tone="surface" pad="lg">
            <Eyebrow>{isNational ? 'The national picture' : `How ${region.name} compares`}</Eyebrow>

            <h2 className="mt-2 text-h3 text-ink">
              {`${top.pathogen} resistance to ${top.antibiotic}, ${infection.shortName}`}
            </h2>

            <div className="mt-5 space-y-4">
              <ComparisonBar
                label={isNational ? 'United States national average' : region.name}
                rate={top.rate}
              />
              {!isNational && nationalRow ? (
                <ComparisonBar
                  label="United States national average"
                  rate={nationalRow.rate}
                  tone="muted"
                />
              ) : null}
            </div>

            {/*
              Never colour alone: the comparison is stated in words, with the
              arrow and the tint as reinforcement.
            */}
            {isNational ? (
              <p className="mt-5 max-w-[52ch] text-body text-ink-muted">
                You are looking at the national picture. Pick a state or a world
                region to compare it against.
              </p>
            ) : difference === 0 ? (
              <p className="mt-5 text-body text-ink-muted">
                About the same as the United States average.
              </p>
            ) : (
              <p
                className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${
                  difference > 0
                    ? 'bg-accent-soft text-accent'
                    : 'bg-primary-tint text-primary'
                }`}
              >
                <DiffIcon width={18} height={18} className="shrink-0" />
                <span className="text-body">
                  {`${Math.abs(difference)} points ${
                    difference > 0 ? 'above' : 'below'
                  } the United States average`}
                </span>
              </p>
            )}

            <SourceChip
              source={region.source}
              year={region.year}
              scope={sourceScope(region)}
              className="mt-5"
            />
          </Card>
        ) : null}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button variant="primary" size="lg" onClick={onContinue}>
          See my results
          <ArrowRightIcon width={20} height={20} />
        </Button>
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  )
}
