import { useEffect, useRef, useState } from 'react'

import { Card } from './Card.jsx'
import PillPal from './PillPal.jsx'
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js'

/*
  Pulls the leading number out of a formatted value so it can be counted up
  while the words around it stay put. "39 million" animates the 39 and leaves
  "million" alone. A value with no leading digits, like "Three", simply does
  not animate, which is the correct outcome rather than a special case.
*/
function splitValue(value) {
  const match = /^(\d[\d,.]*)(.*)$/s.exec(value)
  if (!match) return null

  const numeric = Number(match[1].replace(/,/g, ''))
  if (!Number.isFinite(numeric)) return null

  return { target: numeric, decimals: (match[1].split('.')[1] ?? '').length, rest: match[2] }
}

/*
  A count up that is a real rAF loop rather than a CSS transition, because
  there is no CSS property that interpolates text content.

  That is why it checks the reduced motion query itself: the global rule in
  index.css collapses transitions and animations, and cannot reach this. When
  motion is reduced the final value renders immediately, which is the same
  information without the movement.
*/
function useCountUp(value, enabled) {
  const parts = splitValue(value)
  const reduced = usePrefersReducedMotion()
  const shouldAnimate = enabled && !reduced && parts !== null
  const [display, setDisplay] = useState(() => (shouldAnimate ? 0 : null))
  const frameRef = useRef(0)

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplay(null)
      return undefined
    }

    const duration = 420
    let start = null

    const tick = (now) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      // Matches --ease-out-soft closely enough for a number rolling upward.
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(parts.target * eased)

      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [shouldAnimate, parts?.target])

  if (!shouldAnimate || display === null) return value

  const shown = display.toLocaleString('en-US', {
    minimumFractionDigits: parts.decimals,
    maximumFractionDigits: parts.decimals,
  })

  return `${shown}${parts.rest}`
}

/*
  A single headline figure. The number carries the display face at stat size,
  which is the point: this is the one element on the welcome screen that has to
  land before anyone reads a sentence.
*/
export default function StatTile({
  value,
  label,
  source,
  year,
  icon: Icon,
  tone = 'default',
  animate = true,
  pose,
}) {
  const shown = useCountUp(value, animate)
  const isAccent = tone === 'accent'

  return (
    <Card as="li" pad="md" className="relative isolate flex flex-col gap-3 overflow-hidden">
      {/*
        A large PillPal bleeding off the bottom right corner, well behind the
        figure. Decorative and print hidden: the number is the content, this is
        just what stops the tile reading as an empty box.
      */}
      {pose ? (
        <PillPal
          size={104}
          pose={pose}
          decorative
          className="pointer-events-none absolute -bottom-5 -right-4 -z-10 opacity-[0.12] print:hidden"
        />
      ) : null}

      {Icon ? (
        <span
          className={`flex size-10 items-center justify-center rounded-control ${
            isAccent ? 'bg-accent-soft text-accent' : 'bg-primary-tint text-primary'
          }`}
        >
          <Icon width={20} height={20} />
        </span>
      ) : null}

      <p>
        {/*
          aria-hidden on the animating copy, with the settled value exposed to
          assistive tech. A live region counting from zero to 39 million would
          be unusable.
        */}
        <span
          aria-hidden="true"
          className={`display tabular block text-stat ${
            isAccent ? 'text-accent' : 'text-ink'
          }`}
        >
          {shown}
        </span>
        <span className="sr-only">{value}</span>
        <span className="mt-1.5 block max-w-[34ch] text-body text-ink-muted">{label}</span>
      </p>

      {source ? (
        <p className="mt-auto text-eyebrow uppercase text-ink-muted">{`${source} ${year}`}</p>
      ) : null}
    </Card>
  )
}
