/*
  Card, Section, and Eyebrow. Layout primitives so the screens stop repeating
  the same class string a dozen times and vertical rhythm is defined once.
*/

const CARD_TONES = {
  surface: 'bg-surface border-border',
  sunken: 'bg-surface-sunken border-border',
  tint: 'bg-primary-tint border-primary-soft',
  accent: 'bg-accent-soft border-accent-soft',
}

const CARD_PADDING = {
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6 sm:p-7',
}

export function Card({
  as: Tag = 'div',
  tone = 'surface',
  pad = 'md',
  shadow = true,
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`rounded-card border ${CARD_TONES[tone]} ${CARD_PADDING[pad]} ${
        shadow ? 'shadow-card' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

/*
  An uppercase kicker with a short rule to its left. Set at the eyebrow size,
  which is the one place 15px is allowed: two or three words, heavy weight,
  wide tracking. It is a designed label, never a paragraph.
*/
export function Eyebrow({ tone = 'primary', className = '', children }) {
  const colour = tone === 'muted' ? 'text-ink-muted' : 'text-primary'
  const rule = tone === 'muted' ? 'bg-border-strong' : 'bg-primary'

  return (
    <p className={`flex items-center gap-2.5 ${colour} ${className}`}>
      <span aria-hidden="true" className={`h-px w-6 shrink-0 ${rule}`} />
      <span className="text-eyebrow uppercase">{children}</span>
    </p>
  )
}

/*
  A results section: eyebrow, h2, then content. Owning the top margin here is
  what keeps the spacing between sections consistent across screens.
*/
export function Section({
  eyebrow,
  title,
  titleId,
  className = '',
  children,
  ...props
}) {
  return (
    <section className={`mt-12 first:mt-0 ${className}`} {...props}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {title ? (
        <h2 id={titleId} className="mt-2 text-h2 text-ink">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  )
}
