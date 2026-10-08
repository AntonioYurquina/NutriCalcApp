import { useEffect, useState } from 'react'

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  )

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!query) return undefined
    const onChange = (e) => setReduced(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export const useDebouncedValue = (value, delay = 600) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

export const useElementInView = (id) => {
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return inView
}
