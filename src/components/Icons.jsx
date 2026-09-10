/*
  Inline SVG icons. No icon library, nothing to load.

  Icons here are decorative next to a text label, so they carry aria-hidden.
  The one exception is the risk tier icons, which pair with a label per the
  colour rules in docs/conventions.md: a risk tier is never colour alone.
*/

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function DropletIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.4a5.5 5.5 0 0 1-11 0c0-2.8 2.5-5.8 5.5-9.4z" />
    </svg>
  )
}

export function NoseIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v6.5c0 1.2.6 2 1.6 2.8.9.7 1.2 1.6.6 2.4-.4.6-1.2.8-2.2.8" />
      <path d="M8.5 16.5c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5" />
      <path d="M7 9.5C7 6.5 9.2 4 12 4" />
    </svg>
  )
}

export function LungsIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v9" />
      <path d="M12 9c-1.2-1.5-2.6-2-3.8-1.4C6.6 8.4 6 10.6 6 13.4c0 2 .3 4 .8 5.2.4 1 1.5 1.3 2.4.8l1.6-.9c.7-.4 1.2-1.2 1.2-2V9z" />
      <path d="M12 9c1.2-1.5 2.6-2 3.8-1.4 1.6.8 2.2 3 2.2 5.8 0 2-.3 4-.8 5.2-.4 1-1.5 1.3-2.4.8l-1.6-.9c-.7-.4-1.2-1.2-1.2-2V9z" />
    </svg>
  )
}

export function BandageIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-30 12 12)" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  )
}

export function EarIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 9a5 5 0 0 1 10 0c0 3-2.5 4-3.5 5.5-.7 1-.3 2.2-1.2 3.2-.8.9-2.3 1-3.2.1" />
      <path d="M10.5 9.2a1.7 1.7 0 0 1 3.2.8c0 1.2-1.3 1.6-1.8 2.5" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6.5 9.5 17 4 11.5" />
    </svg>
  )
}

export function ShieldIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5 6.2v5.3c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6.2l-7-2.7z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function AlertIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5 3 19.5h18L12 4.5z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

export function InfoIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  )
}

export function ChevronDownIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="m13 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  )
}

export function ArrowLeftIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M19.5 12h-15" />
      <path d="m11 5.5-6.5 6.5 6.5 6.5" />
    </svg>
  )
}

export function ArrowUpIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19.5v-15" />
      <path d="m5.5 11 6.5-6.5 6.5 6.5" />
    </svg>
  )
}

export function ArrowDownIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5v15" />
      <path d="m5.5 13 6.5 6.5 6.5-6.5" />
    </svg>
  )
}

export function DatabaseIcon(props) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </svg>
  )
}

export function GlobeIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5z" />
    </svg>
  )
}

export function MapPinIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21c4-4.4 6-7.8 6-10.3A6 6 0 0 0 6 10.7C6 13.2 8 16.6 12 21z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </svg>
  )
}

export function PrinterIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 9V3.5h10V9" />
      <path d="M7 17H5.5A1.5 1.5 0 0 1 4 15.5v-5A1.5 1.5 0 0 1 5.5 9h13A1.5 1.5 0 0 1 20 10.5v5a1.5 1.5 0 0 1-1.5 1.5H17" />
      <rect x="7" y="14" width="10" height="6.5" rx="1" />
    </svg>
  )
}

export function LockIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export function ShieldOutlineIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 5 6.2v5.3c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6.2l-7-2.7z" />
    </svg>
  )
}

const INFECTION_ICONS = {
  droplet: DropletIcon,
  nose: NoseIcon,
  lungs: LungsIcon,
  bandage: BandageIcon,
  ear: EarIcon,
}

export function InfectionIcon({ name, ...props }) {
  const Component = INFECTION_ICONS[name] ?? InfoIcon
  return <Component {...props} />
}

/*
  PillPal, the mascot. A friendly capsule.

  Rules from the PRD: PillPal carries warmth, never gives advice, and never
  appears beside a disclaimer, so that friendliness is not mistaken for medical
  reassurance. Uses accent-fill, which is a fill only colour and never text.
*/
const PILLPAL_MOUTHS = {
  // A gentle smile. The default, used wherever no pose is asked for.
  smile: 'M20.5 27.5c1 1.1 2.2 1.6 3.5 1.6s2.5-.5 3.5-1.6',
  // A wider open smile for the welcome screen.
  wave: 'M20 26.8c.9 1.8 2.3 2.7 4 2.7s3.1-.9 4-2.7z',
  // A small flat line, for the empty state where there is nothing to celebrate.
  hold: 'M21 28h6',
}

export function PillPal({ size = 48, pose = 'smile', className = '' }) {
  const mouth = PILLPAL_MOUTHS[pose] ?? PILLPAL_MOUTHS.smile
  const filled = pose === 'wave'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="PillPal, the MyPillPal mascot"
    >
      <g transform="rotate(-35 24 24)">
        <rect
          x="10"
          y="4"
          width="28"
          height="40"
          rx="14"
          className="fill-accent-fill"
        />
        <path
          d="M10 24h28v6c0 7.7-6.3 14-14 14s-14-6.3-14-14v-6z"
          className="fill-primary"
        />
        <rect
          x="10"
          y="4"
          width="28"
          height="40"
          rx="14"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
      </g>
      {/*
        The face is drawn in ink so it stays legible in both themes. It was a
        hardcoded hex, which meant the eyes stayed near black on the dark
        surface and vanished into the capsule.
      */}
      <g className="fill-ink stroke-ink">
        <circle cx="19" cy="21" r="2.1" strokeWidth="0" />
        <circle cx="29" cy="21" r="2.1" strokeWidth="0" />
        <path
          d={mouth}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={filled ? undefined : 'none'}
          fillOpacity={filled ? 1 : 0}
        />
      </g>
    </svg>
  )
}
