import { useEffect, useRef, useState } from 'react'

import { RISK_TIERS, MAX_RISK_SCORE } from '../lib/scoreRisk.js'
import { AlertIcon, InfoIcon, ShieldIcon } from './Icons.jsx'

const TIER_ICON = { low: ShieldIcon, moderate: InfoIcon, elevated: AlertIcon }

const TIER_STROKE = {
  low: 'stroke-risk-low',
  moderate: 'stroke-risk-moderate',
  elevated: 'stroke-risk-elevated',
}

const TIER_TEXT = {
  low: 'text-risk-low',
  moderate: 'text-risk-moderate',
  elevated: 'text-risk-elevated',
}

const ZONES = [
  { id: 'low', label: 'Lower', range: '0 to 2' },
  { id: 'moderate', label: 'Moderate', range: '3 to 5' },
  { id: 'elevated', label: 'Elevated', range: '6+' },
]

/*
  Geometry. A 240 degree arc opening downward, from 150 degrees round to 30.
  Drawn as two paths sharing the same geometry: a track, and a value arc
  revealed with stroke-dasharray.
*/
const RADIUS = 42
const CENTRE = 50
const START_ANGLE = 150
const SWEEP = 240

function pointOnArc(angleDegrees, radius = RADIUS) {
  const radians = (angleDegrees * Math.PI) / 180
  return {
    x: CENTRE + radius * Math.cos(radians),
    y: CENTRE + radius * Math.sin(radians),
  }
}

const ARC_PATH = (() => {
  const start = pointOnArc(START_ANGLE)
  const end = pointOnArc(START_ANGLE + SWEEP)
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 1 1 ${end.x} ${end.y}`
})()

const ARC_LENGTH = (SWEEP / 360) * 2 * Math.PI * RADIUS

/*
  The risk score as a gauge.

  Colour is never the only signal here. The arc length, the number, the zone
  label, the tier name, and the tier icon all carry the same message, which is
  the rule for risk tiers in docs/conventions.md.

  The arc is filled with a CSS transition on stroke-dashoffset rather than a JS
  interpolation loop, deliberately: the global prefers-reduced-motion rule in
  index.css can then switch it off without this component knowing anything
  about the query.
*/
export default function RiskGauge({
  score,
  maxScore = MAX_RISK_SCORE,
  tier,
  size = 'lg',
  factorCount,
  announce = false,
  animate = true,
}) {
  const isLarge = size === 'lg'
  const tierMeta = RISK_TIERS[tier]
  const Icon = TIER_ICON[tier]

  const fraction = maxScore > 0 ? Math.min(score / maxScore, 1) : 0
  // Start empty so the first paint has something to animate from.
  const [drawn, setDrawn] = useState(animate ? 0 : fraction)

  useEffect(() => {
    if (!animate) {
      setDrawn(fraction)
      return undefined
    }
    const frame = requestAnimationFrame(() => setDrawn(fraction))
    return () => cancelAnimationFrame(frame)
  }, [fraction, animate])

  /*
    Announce the tier, and only when it changes. A live region that fires on
    every checkbox tick reads the whole gauge aloud nine times while someone
    fills in the form, which is worse than silence.
  */
  const previousTier = useRef(tier)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (!announce) return
    if (previousTier.current !== tier) {
      previousTier.current = tier
      setAnnouncement(`${RISK_TIERS[tier].label}, ${score} of ${maxScore} points`)
    }
  }, [announce, tier, score, maxScore])

  const valueText = `${score} of ${maxScore} points, ${tierMeta.label}`

  return (
    <div className="flex flex-col items-center">
      <div
        role="meter"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={maxScore}
        aria-valuetext={valueText}
        aria-label="Your resistance risk score"
        className={`relative ${isLarge ? 'w-full max-w-[248px]' : 'w-full max-w-[176px]'}`}
      >
        <svg viewBox="0 0 100 92" className="w-full" aria-hidden="true">
          <path
            d={ARC_PATH}
            fill="none"
            className="stroke-border-strong"
            strokeWidth={isLarge ? 11 : 8}
            strokeLinecap="round"
          />

          {/* Tier thresholds, so the zone boundaries are visible on the dial. */}
          {[3, 6].map((threshold) => {
            const angle = START_ANGLE + (threshold / maxScore) * SWEEP
            const inner = pointOnArc(angle, RADIUS - (isLarge ? 7 : 5))
            const outer = pointOnArc(angle, RADIUS + (isLarge ? 7 : 5))
            return (
              <line
                key={threshold}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                className="stroke-surface"
                strokeWidth="2.5"
              />
            )
          })}

          <path
            d={ARC_PATH}
            fill="none"
            className={`${TIER_STROKE[tier]} transition-[stroke-dashoffset,stroke] ease-[var(--ease-out-soft)]`}
            style={{
              strokeDasharray: ARC_LENGTH,
              strokeDashoffset: ARC_LENGTH * (1 - drawn),
              transitionDuration: isLarge
                ? 'var(--duration-slow)'
                : 'var(--duration-base)',
            }}
            strokeWidth={isLarge ? 11 : 8}
            strokeLinecap="round"
          />
        </svg>

        <div className="pointer-events-none absolute inset-x-0 top-[26%] flex flex-col items-center">
          <span
            aria-hidden="true"
            className={`display tabular ${isLarge ? 'text-stat' : 'text-h2'} ${TIER_TEXT[tier]}`}
          >
            {score}
          </span>
          <span aria-hidden="true" className="tabular text-label text-ink-muted">
            {`of ${maxScore}`}
          </span>
        </div>
      </div>

      <ul className="-mt-1 flex w-full min-w-0 items-start justify-between gap-1">
        {ZONES.map((zone) => {
          const isCurrent = zone.id === tier
          return (
            <li key={zone.id} className="text-center">
              <span
                className={`block text-eyebrow uppercase ${
                  isCurrent ? TIER_TEXT[zone.id] : 'text-ink-muted'
                }`}
              >
                {zone.label}
              </span>
              <span className="tabular block text-eyebrow text-ink-muted">
                {zone.range}
              </span>
            </li>
          )
        })}
      </ul>

      <p className={`mt-4 flex items-center gap-2 ${TIER_TEXT[tier]}`}>
        <Icon width={20} height={20} className="shrink-0" />
        <span className="text-h3">{tierMeta.label}</span>
      </p>

      {factorCount !== undefined ? (
        <p className="mt-1 text-body text-ink-muted">
          {factorCount === 0
            ? 'No factors ticked yet'
            : `${factorCount} ${factorCount === 1 ? 'factor' : 'factors'} ticked`}
        </p>
      ) : null}

      {announce ? (
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      ) : null}
    </div>
  )
}
