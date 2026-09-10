import { INFECTIONS } from '../data/infections.js'
import { IMPACT_STATS } from '../data/education.js'
import { Eyebrow } from '../components/Card.jsx'
import StatTile from '../components/StatTile.jsx'
import {
  AlertIcon,
  ArrowRightIcon,
  GlobeIcon,
  InfectionIcon,
  MapPinIcon,
} from '../components/Icons.jsx'
import PillPal from '../components/PillPal.jsx'

const STAT_ICONS = [GlobeIcon, MapPinIcon, AlertIcon]

/*
  Screen 1: welcome and infection selection.

  Selecting a card advances immediately. There is no separate continue button,
  because the choice itself is the intent and an extra click costs time we want
  to spend on the risk factor screen.

  The screen opens with the scale of the problem as three figures rather than a
  paragraph about it. The numbers are the argument, and they land faster than
  prose does.
*/
export default function InfectionSelect({ selectedId, onSelect }) {
  return (
    <div>
      <div className="overflow-hidden rounded-panel border border-primary-soft bg-primary-tint px-6 py-8 sm:px-10 sm:py-12 print:hidden">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Eyebrow>Before your appointment</Eyebrow>
            <h1
              tabIndex={-1}
              className="mt-4 max-w-[15ch] text-hero text-ink"
            >
              Walk in with better questions.
            </h1>
            <p className="mt-5 max-w-[52ch] text-body-lg text-ink">
              Antibiotic resistance means the usual medicine sometimes stops
              working. This turns public resistance data into plain language for
              your next visit.
            </p>
          </div>

          {/*
            The mascot belongs here, at the entry point, and nowhere near the
            boundary note in the footer. See the PRD mascot rule.
          */}
          <PillPal size={96} pose="waving" className="hidden shrink-0 sm:block" />
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 print:hidden">
        {IMPACT_STATS.map((stat, index) => (
          <StatTile
            key={stat.id}
            value={stat.value}
            label={stat.label}
            source={stat.source}
            year={stat.year}
            icon={STAT_ICONS[index]}
            // One coral element per screen, and this is it.
            tone={index === 2 ? 'accent' : 'default'}
          />
        ))}
      </ul>

      <div className="mt-14">
        <Eyebrow>Where to start</Eyebrow>
        <h2 className="mt-2 text-h2 text-ink">
          What are you seeing the doctor about?
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {INFECTIONS.map((infection) => {
            const isSelected = infection.id === selectedId

            return (
              <button
                key={infection.id}
                type="button"
                onClick={() => onSelect(infection.id)}
                aria-pressed={isSelected}
                className={`group flex items-start gap-4 rounded-card border p-5 text-left shadow-card transition-[border-color,background-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:shadow-raised ${
                  isSelected
                    ? 'border-primary bg-primary-soft'
                    : 'border-border-strong bg-surface hover:border-primary'
                }`}
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-control transition-colors duration-[var(--duration-fast)] ${
                    isSelected
                      ? 'bg-primary text-on-primary'
                      : 'bg-primary-tint text-primary'
                  }`}
                >
                  <InfectionIcon name={infection.icon} width={26} height={26} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-h3 text-ink">{infection.label}</span>
                  <span className="mt-1.5 block text-body text-ink-muted">
                    {infection.description}
                  </span>
                </span>

                <ArrowRightIcon
                  width={20}
                  height={20}
                  className="mt-1 shrink-0 text-primary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
