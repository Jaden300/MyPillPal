/*
  A checkbox or radio drawn as a full width card.

  The input is a real <input> with sr-only, kept in the DOM rather than
  replaced. That buys native semantics, native announcement, native form
  behaviour, and native arrow key navigation within a radio group, all for
  free. Never hand roll roving focus for radios when name grouping already does
  it correctly.

  The visual box is an aria-hidden sibling driven entirely by peer-checked, so
  no JavaScript touches the appearance. The focus ring is moved onto the card
  with peer-focus-visible, since the input itself is invisible.
*/
export default function ChoiceCard({
  type = 'checkbox',
  checked,
  onChange,
  name,
  value,
  label,
  weight,
  children,
}) {
  const isRadio = type === 'radio'

  return (
    <div className="group/choice rounded-card border border-border-strong bg-surface shadow-card transition-colors duration-[var(--duration-fast)] has-[:checked]:border-primary has-[:checked]:bg-primary-soft has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
      <label className="flex min-h-16 cursor-pointer items-start gap-3.5 p-4">
        <input
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={(event) =>
            isRadio ? onChange(value) : onChange(event.target.checked)
          }
          className="peer sr-only"
        />

        <span
          aria-hidden="true"
          className={`mt-0.5 flex size-6 shrink-0 items-center justify-center border-2 border-border-strong bg-surface text-on-primary transition-[background-color,border-color] duration-[var(--duration-fast)] group-has-[:checked]/choice:border-primary group-has-[:checked]/choice:bg-primary ${
            isRadio ? 'rounded-full' : 'rounded-[6px]'
          }`}
        >
          {/*
            The mark scales in from the checked state on the wrapper, not from
            peer-checked. A peer variant only reaches siblings of the input,
            and this sits one level deeper.
          */}
          {isRadio ? (
            <span className="size-2.5 scale-0 rounded-full bg-on-primary transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] group-has-[:checked]/choice:scale-100" />
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="scale-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] group-has-[:checked]/choice:scale-100"
            >
              <path d="M20 6.5 9.5 17 4 11.5" />
            </svg>
          )}
        </span>

        <span className="min-w-0 flex-1 text-body text-ink">{label}</span>

        {weight ? (
          <span className="tabular shrink-0 rounded-full bg-primary-tint px-2.5 py-1 text-eyebrow uppercase text-primary">
            {`+${weight}`}
          </span>
        ) : null}
      </label>

      {children ? <div className="px-4 pb-4">{children}</div> : null}
    </div>
  )
}
