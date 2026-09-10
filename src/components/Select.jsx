import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

import { CheckIcon, ChevronDownIcon } from './Icons.jsx'

/*
  A dropdown built to look like the rest of the app rather than like the
  operating system.

  Pattern: ARIA 1.2 collapsible listbox, not combobox. There is no text input
  here, and listbox is the pattern with the widest correct screen reader
  support for a select like control.

  The load bearing decision is the focus model: DOM focus never leaves the
  trigger button. The active option is tracked with aria-activedescendant only.
  That means the trigger's onKeyDown is the single key handler, there is no
  focus trap to write, and closing the popover needs no focus restoration,
  because focus never went anywhere.

  Groups are a nested ul[role=group] inside a li[role=presentation], with the
  visible header aria-hidden because aria-labelledby already exposes it. The
  header must never be role=option: if it were, arrow keys would land on it and
  a screen reader would announce "United States, option 2 of 18", which is
  false. Options are flattened for navigation so arrows skip headers entirely.
*/

// Flattens groups into a single ordered list of options for keyboard movement.
function flatten(options) {
  return options.flatMap((entry) =>
    entry.groupLabel ? entry.options : [entry],
  )
}

export default function Select({
  value,
  onChange,
  options,
  label,
  id,
  placeholder = 'Select an option',
  className = '',
}) {
  const generatedId = useId()
  const baseId = id ?? generatedId

  const [open, setOpen] = useState(false)
  const [activeValue, setActiveValue] = useState(value)
  const [dropUp, setDropUp] = useState(false)

  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const typeaheadRef = useRef({ buffer: '', timer: 0 })

  const flat = flatten(options)
  const selected = flat.find((option) => option.value === value)
  const activeIndex = flat.findIndex((option) => option.value === activeValue)

  const optionId = (optionValue) => `${baseId}-opt-${optionValue}`

  const openList = (nextActive = value) => {
    setActiveValue(nextActive)
    setOpen(true)
  }

  // Commit is the only path that calls onChange. Escape and outside clicks
  // deliberately do not, so a dropdown can be browsed and abandoned.
  const commit = (optionValue) => {
    if (optionValue !== undefined && optionValue !== value) onChange(optionValue)
    setOpen(false)
  }

  const moveActive = (nextIndex) => {
    const clamped = Math.max(0, Math.min(nextIndex, flat.length - 1))
    const next = flat[clamped]
    if (next) setActiveValue(next.value)
  }

  /*
    Typeahead. Repeated presses of the same letter cycle through the matches
    for that letter, which is what a native select does: pressing "t" three
    times steps Texas, then the next t match, rather than searching for "ttt".
  */
  const runTypeahead = (char) => {
    const state = typeaheadRef.current
    window.clearTimeout(state.timer)
    state.buffer += char.toLowerCase()
    state.timer = window.setTimeout(() => {
      state.buffer = ''
    }, 500)

    const buffer = state.buffer
    const isRepeat = buffer.length > 1 && [...buffer].every((c) => c === buffer[0])
    const needle = isRepeat ? buffer[0] : buffer

    // Start after the current option so repeats advance instead of sticking.
    const from = isRepeat || buffer.length === 1 ? activeIndex + 1 : activeIndex
    for (let step = 0; step < flat.length; step += 1) {
      const candidate = flat[(from + step + flat.length) % flat.length]
      if (candidate.label.toLowerCase().startsWith(needle)) {
        setActiveValue(candidate.value)
        return
      }
    }
  }

  const onKeyDown = (event) => {
    const { key, altKey } = event

    if (key === 'Escape' && open) {
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
      setActiveValue(value)
      return
    }

    if (key === 'Tab') {
      // Tab commits and gets out of the way. Never preventDefault here, or the
      // user is trapped in a control that looks like it should be leavable.
      if (open) commit(activeValue)
      return
    }

    if (!open) {
      if (
        key === 'Enter' ||
        key === ' ' ||
        key === 'ArrowDown' ||
        key === 'ArrowUp'
      ) {
        event.preventDefault()
        openList()
        return
      }
      if (key === 'Home' || key === 'End') {
        event.preventDefault()
        openList(flat[key === 'Home' ? 0 : flat.length - 1]?.value)
        return
      }
      if (key.length === 1 && !altKey && !event.ctrlKey && !event.metaKey) {
        event.preventDefault()
        setOpen(true)
        runTypeahead(key)
      }
      return
    }

    switch (key) {
      case 'ArrowDown':
        event.preventDefault()
        if (altKey) commit(activeValue)
        else moveActive(activeIndex + 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (altKey) commit(activeValue)
        else moveActive(activeIndex - 1)
        break
      case 'Home':
        event.preventDefault()
        moveActive(0)
        break
      case 'End':
        event.preventDefault()
        moveActive(flat.length - 1)
        break
      case 'PageDown':
        event.preventDefault()
        moveActive(activeIndex + 10)
        break
      case 'PageUp':
        event.preventDefault()
        moveActive(activeIndex - 10)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        commit(activeValue)
        break
      default:
        if (key.length === 1 && !altKey && !event.ctrlKey && !event.metaKey) {
          event.preventDefault()
          runTypeahead(key)
        }
    }
  }

  // Outside pointerdown closes without committing. No scroll to close: it
  // fights touch scrolling inside the option list itself.
  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false)
        setActiveValue(value)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, value])

  // Flip above the trigger when there is not room below. Measured once on open,
  // which is enough at this list size and avoids a positioning library.
  useLayoutEffect(() => {
    if (!open) return
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) setDropUp(window.innerHeight - rect.bottom < 320 && rect.top > 320)
  }, [open])

  // block: nearest, never center. Centering makes the list lurch on every
  // arrow press instead of scrolling only when it has to.
  useEffect(() => {
    if (!open || !activeValue) return
    document.getElementById(optionId(activeValue))?.scrollIntoView({ block: 'nearest' })
  }, [open, activeValue])

  const renderOption = (option) => {
    const isSelected = option.value === value
    const isActive = option.value === activeValue

    return (
      <li
        key={option.value}
        id={optionId(option.value)}
        role="option"
        aria-selected={isSelected}
        /*
          onMouseMove rather than onMouseEnter. The popover often renders
          underneath a stationary cursor, and mouseenter fires on that alone,
          which would steal the active option away from the keyboard the
          instant the list opens. Requiring actual movement means the pointer
          only takes over when it is really being used.
        */
        onMouseMove={() => setActiveValue(option.value)}
        onClick={() => commit(option.value)}
        className={`relative flex min-h-12 cursor-pointer items-center gap-3 border-l-[3px] py-2.5 pl-4 pr-3 ${
          isActive
            ? 'border-l-primary bg-primary-tint text-ink'
            : 'border-l-transparent text-ink'
        }`}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-body">{option.label}</span>
          {option.hint ? (
            <span className="mt-0.5 block text-body text-ink-muted">{option.hint}</span>
          ) : null}
        </span>
        {isSelected ? (
          <CheckIcon width={18} height={18} className="shrink-0 text-primary" />
        ) : null}
      </li>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <span id={`${baseId}-label`} className="block text-label font-medium text-ink">
        {label}
      </span>

      <button
        ref={triggerRef}
        type="button"
        id={`${baseId}-trigger`}
        disabled={flat.length === 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${baseId}-label ${baseId}-trigger`}
        aria-controls={open ? `${baseId}-listbox` : undefined}
        onClick={() => (open ? (setOpen(false), setActiveValue(value)) : openList())}
        onKeyDown={onKeyDown}
        className={`mt-2 flex min-h-14 w-full items-center justify-between gap-3 rounded-control border bg-surface px-4 py-3 text-left transition-colors duration-[var(--duration-fast)] disabled:opacity-50 ${
          open ? 'border-2 border-primary' : 'border-border-strong hover:border-primary'
        }`}
      >
        <span className={`truncate text-body ${selected ? 'text-ink' : 'text-ink-muted'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDownIcon
          width={20}
          height={20}
          className={`shrink-0 text-ink-muted transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          role="listbox"
          id={`${baseId}-listbox`}
          aria-labelledby={`${baseId}-label`}
          aria-activedescendant={activeValue ? optionId(activeValue) : undefined}
          tabIndex={-1}
          className={`absolute z-40 max-h-80 w-full overflow-y-auto overscroll-contain rounded-card border border-border bg-surface py-1.5 shadow-popover ${
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {options.map((entry, index) => {
            if (!entry.groupLabel) return renderOption(entry)

            const groupId = `${baseId}-grp-${index}`
            return (
              <li key={groupId} role="presentation">
                <span
                  id={groupId}
                  role="presentation"
                  aria-hidden="true"
                  className={`block px-4 pb-1.5 pt-3 text-eyebrow uppercase text-ink-muted ${
                    index > 0 ? 'mt-1.5 border-t border-border pt-3' : ''
                  }`}
                >
                  {entry.groupLabel}
                </span>
                <ul role="group" aria-labelledby={groupId}>
                  {entry.options.map(renderOption)}
                </ul>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
