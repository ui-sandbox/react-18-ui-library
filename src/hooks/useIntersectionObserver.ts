import { useState, useEffect, useRef, RefObject } from 'react'

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const { freezeOnceVisible = false, ...observerOptions } = options
  const ref = useRef<T>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  const isVisible = entry?.isIntersecting ?? false
  const frozen = isVisible && freezeOnceVisible

  useEffect(() => {
    const el = ref.current
    if (!el || frozen) return

    const observer = new IntersectionObserver(([e]) => setEntry(e), observerOptions)
    observer.observe(el)
    return () => observer.disconnect()
  }, [frozen, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold])

  return [ref, isVisible, entry]
}
