import { useId, useState } from 'react'

/*
  The expandable used for "why this matters" notes and for source attribution.

  This component exists because of a rule in docs/conventions.md: no micro
  caption text. Explanatory copy never gets set in small grey type underneath
  the thing it explains. It goes in here, at body size, behind a real button.
*/
export default function Disclosure({ label = 'Why this matters', children }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex items-center gap-1.5 rounded-button text-label font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          aria-hidden="true"
          className={`transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] ${open ? 'rotate-90' : ''}`}
        >
          <path
            d="M5 3l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {label}
      </button>

      {open && (
        <div
          id={panelId}
          className="mt-2.5 max-w-[62ch] rounded-control bg-primary-tint px-4 py-3 text-body text-ink-muted"
        >
          {children}
        </div>
      )}
    </div>
  )
}
