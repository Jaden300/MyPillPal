/*
  Button.

  Radius, focus ring, and colours all come from the tokens in
  docs/conventions.md. The focus ring is inherited from the :focus-visible rule
  in index.css, so it is never removed here.

  Note text-on-primary rather than text-white: in dark mode the primary fill is
  a light teal, which needs dark text on top of it. The token flips, the class
  does not.
*/
export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-button font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0'

  const sizes = {
    md: 'px-5 py-3 text-label',
    lg: 'px-7 py-4 text-label',
  }

  const variants = {
    primary: 'bg-primary text-on-primary shadow-card hover:bg-primary-hover',
    secondary:
      'border border-border-strong bg-surface text-ink hover:bg-primary-tint hover:border-primary',
    subtle: 'bg-primary-tint text-primary hover:bg-primary-soft',
    quiet: 'text-ink-muted hover:text-ink',
  }

  return (
    <button
      type={type}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
