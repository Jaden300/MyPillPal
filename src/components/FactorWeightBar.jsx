/*
  A factor's weight as filled segments rather than the words "adds 3 points".

  Segments, not a continuous bar, because the values are integers from 1 to 3.
  Three discrete blocks read instantly at that scale, where a bar filled to
  66 percent does not read as "2 of 3" at all.

  The segments are aria-hidden. The surrounding list item already says "adds 3
  points" in text, so a screen reader gets the number without a decorative
  count of spans.
*/
export default function FactorWeightBar({ weight, max = 3 }) {
  return (
    <span className="flex shrink-0 items-center gap-2">
      <span aria-hidden="true" className="flex gap-1">
        {Array.from({ length: max }, (unused, index) => (
          <span
            key={index}
            className={`h-2.5 w-5 rounded-[3px] border ${
              index < weight
                ? 'border-primary bg-primary'
                : 'border-border-strong bg-transparent'
            }`}
          />
        ))}
      </span>
      <span className="tabular text-label font-semibold text-primary">
        {`+${weight}`}
      </span>
    </span>
  )
}
