import { useEffect, useRef } from 'react'

import BoundaryNote from './BoundaryNote.jsx'
import PillPal from './PillPal.jsx'

const STEPS = [
  { id: 'infection', label: 'Infection' },
  { id: 'riskFactors', label: 'About you' },
  { id: 'region', label: 'Location' },
  { id: 'results', label: 'Results' },
]

/*
  Page shell: header, step progress, content, persistent footer boundary note.

  PillPal sits in the header and never beside the boundary note, so the friendly
  mascot is never read as medical reassurance.

  The summary is an export view rather than a fifth stage of the assessment, so
  it does not appear in the progress list and the whole nav is hidden there.

  Screens swap without a route change, which gives a screen reader user no
  signal that anything happened. Two things fix that: a polite live region
  naming the new screen, and moving focus to the heading of the screen that just
  arrived. Every screen renders its h1 with tabIndex -1 so it can receive focus
  without joining the tab order.

  The progress rail is a segmented bar rather than a list of words. Four
  segments fill as steps complete, and the current step is named beside them.
  The other labels stay in the DOM as screen reader text: a rail that reads as
  "step 2 of 4, About you" out loud and shows four bars on screen carries the
  same information in both channels without printing four words at four
  different opacities, which is what the old version did.
*/
export default function Layout({ step, children }) {
  const currentIndex = STEPS.findIndex((candidate) => candidate.id === step)
  const isAssessmentStep = currentIndex !== -1
  const mainRef = useRef(null)

  useEffect(() => {
    const heading = mainRef.current?.querySelector('h1')
    heading?.focus()
    // Scroll matters as much as focus here. The results page is long, and
    // arriving at it halfway down would be disorienting.
    window.scrollTo(0, 0)
  }, [step])

  const stepLabel = isAssessmentStep ? STEPS[currentIndex].label : 'Printable summary'

  /*
    The wrapper below carries no background colour. body already paints the
    ground, and the PillPal watermark sits between the two. An opaque bg on
    this full height wrapper covers the watermark for the entire viewport.
  */
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-5xl items-center gap-2.5 px-5 py-3.5 sm:px-8">
          {/* Decorative: the wordmark beside it already says the name. */}
          <PillPal size={30} pose="reassuring" decorative />
          <span className="display text-h3 font-bold tracking-tight text-ink">
            MyPillPal
          </span>
        </div>

        <nav
          aria-label="Progress"
          hidden={!isAssessmentStep}
          className="mx-auto max-w-5xl px-5 pb-3.5 sm:px-8"
        >
          <ol className="flex items-center gap-1.5">
            {STEPS.map((entry, index) => {
              const isCurrent = index === currentIndex
              const isDone = index < currentIndex

              return (
                <li key={entry.id} className="min-w-0 flex-1">
                  <span
                    aria-current={isCurrent ? 'step' : undefined}
                    className="flex flex-col gap-1.5"
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 rounded-full transition-colors duration-[var(--duration-base)] ease-[var(--ease-out-soft)] ${
                        isCurrent || isDone ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                    <span
                      className={
                        isCurrent
                          ? 'truncate text-eyebrow uppercase text-primary'
                          : 'sr-only'
                      }
                    >
                      {isCurrent ? (
                        <>
                          <span className="sr-only">{`Step ${index + 1} of ${STEPS.length}, `}</span>
                          {entry.label}
                        </>
                      ) : (
                        `${entry.label}${isDone ? ', done' : ''}`
                      )}
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>
        </nav>
      </header>

      {/*
        Announces the screen change to a screen reader. Kept out of the visual
        flow, and separate from the heading focus above so the announcement is
        not cut short when focus moves.
      */}
      <p aria-live="polite" className="sr-only">
        {stepLabel}
      </p>

      {/*
        A small print inset rather than px-0. The @page margin positions the
        page, but the chart bars stretch with preserveAspectRatio none and
        would otherwise paint right up to the trimmed edge.
      */}
      <main
        ref={mainRef}
        className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8 sm:py-12 print:max-w-none print:px-1 print:py-0"
      >
        {children}
      </main>

      {/*
        This bg-ground is deliberate, unlike the wrapper's. The footer holds
        BoundaryNote, and PillPal never appears beside a disclaimer. The opaque
        ground keeps the watermark out of the boundary band.
      */}
      <footer className="mt-8 border-t border-border bg-ground print:hidden">
        <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8">
          <BoundaryNote tone="footer" />
        </div>
      </footer>
    </div>
  )
}
