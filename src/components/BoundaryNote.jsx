import { ShieldOutlineIcon } from './Icons.jsx'
import { BOUNDARY_NOTES } from '../data/education.js'

/*
  The scope boundary, as a designed element rather than fine print.

  This is the one piece of standing copy that survives on screen. It is set at
  body size in ink, not muted, inside a bordered band with an icon, because a
  boundary a reader skims past is not a boundary. The old treatment was a grey
  paragraph under the content, which is exactly the fine print this redesign
  removed everywhere else.

  Per the PRD, PillPal never appears beside this. The mascot carries warmth and
  must not be read as medical reassurance.
*/
export default function BoundaryNote({ tone = 'footer', className = '' }) {
  return (
    <p
      className={`flex items-start gap-3 rounded-card border border-border border-l-[3px] border-l-border-strong bg-surface px-4 py-3.5 text-body text-ink ${className}`}
    >
      <ShieldOutlineIcon
        width={20}
        height={20}
        className="mt-0.5 shrink-0 text-primary"
      />
      <span className="max-w-[62ch]">{BOUNDARY_NOTES[tone]}</span>
    </p>
  )
}
