import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/*
  Reports whether the reader has asked for reduced motion, and keeps reporting
  it if they change the setting mid session.

  Almost nothing should need this. The global rule in index.css collapses every
  CSS transition and animation, which covers the whole app. This exists for the
  handful of things CSS cannot reach, namely a value being interpolated in
  JavaScript. If you find yourself reaching for this hook, first check whether
  the animation could be a CSS transition instead, because then it is handled
  for free.
*/
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia?.(QUERY).matches ?? false,
  )

  useEffect(() => {
    const query = window.matchMedia?.(QUERY)
    if (!query) return undefined

    const onChange = (event) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
