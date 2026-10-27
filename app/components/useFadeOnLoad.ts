import { useEffect, useRef } from 'react'

// Fades an image or a video in once it has loaded. The server HTML keeps it visible (a
// hidden element would never count as painted); after hydration, one that is still
// loading is hidden and revealed by the .fade-img transition when it arrives.
// Media already loaded at that point simply stay as they are.
export function useFadeOnLoad<T extends HTMLImageElement | HTMLVideoElement = HTMLImageElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isVideo = el instanceof HTMLVideoElement
    const loaded = isVideo ? el.readyState >= 2 : (el as HTMLImageElement).complete
    if (loaded) return

    const loadEvent = isVideo ? 'loadeddata' : 'load'
    const show = () => el.removeAttribute('data-fade')
    el.setAttribute('data-fade', 'hidden')
    el.addEventListener(loadEvent, show, { once: true })
    el.addEventListener('error', show, { once: true })

    return () => {
      el.removeEventListener(loadEvent, show)
      el.removeEventListener('error', show)
      el.removeAttribute('data-fade')
    }
  }, [])

  return { ref, className: 'fade-img' }
}
