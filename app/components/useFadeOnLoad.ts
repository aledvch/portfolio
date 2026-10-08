import { useEffect, useRef } from 'react'

// Fades an image in once it has loaded. The server HTML keeps it visible (a hidden
// image would never count as painted); after hydration, an image that is still
// loading is hidden and revealed by the .fade-img transition when it arrives.
// Images already loaded at that point simply stay as they are.
export function useFadeOnLoad() {
  const ref = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || el.complete) return

    const show = () => el.removeAttribute('data-fade')
    el.setAttribute('data-fade', 'hidden')
    el.addEventListener('load', show, { once: true })
    el.addEventListener('error', show, { once: true })

    return () => {
      el.removeEventListener('load', show)
      el.removeEventListener('error', show)
      el.removeAttribute('data-fade')
    }
  }, [])

  return { ref, className: 'fade-img' }
}
