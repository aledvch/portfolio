'use client'

import { useEffect, useRef, useState } from 'react'
import { urlFor } from '@/sanity/lib/image'
import { FadeImg } from './FadeImg'
import { RichText } from './RichText'

interface SanityImage {
  asset: { _ref: string }
  dimensions?: { width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

interface MediaItem {
  _key?: string
  mediaType: 'image' | 'video'
  image?: SanityImage
  mobileImage?: SanityImage
  videoUrl?: string
  videoRatio?: string
}

interface GalleryBlockProps {
  items: MediaItem[]
  caption?: unknown[]
  mediaClassName?: string
  priority?: boolean
}

function getEmbedUrl(url: string): string {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?autoplay=1&loop=1&mute=1&playlist=${youtube[1]}&controls=0`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?background=1&autoplay=1&loop=1&muted=1`
  return url
}

// Size of the image as served (crop applied): lets the browser reserve its space before it loads
function sizeAttrs(image: SanityImage) {
  const d = image.dimensions
  if (!d) return {}
  const c = image.crop
  return {
    width: Math.round(d.width * (1 - (c?.left ?? 0) - (c?.right ?? 0))),
    height: Math.round(d.height * (1 - (c?.top ?? 0) - (c?.bottom ?? 0))),
  }
}

// Items kept loaded around the one being shown: the next two and the previous one
function neighbours(i: number, n: number) {
  return [i, (i + 1) % n, (i + 2) % n, (i - 1 + n) % n]
}

export function GalleryBlock({ items, caption, mediaClassName, priority = false }: GalleryBlockProps) {
  const n = items.length
  const isGallery = n > 1

  const [current, setCurrent] = useState(0) // what is on screen
  const [target, setTarget] = useState(0) // what the user asked for
  const [near, setNear] = useState(false) // gallery is close to the viewport
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]))

  const rootRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  // Start loading the neighbouring images only once the gallery is about to be seen
  useEffect(() => {
    const el = rootRef.current
    if (!isGallery || near || !el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [isGallery, near])

  // Swap to the requested item only once its image is decoded, so the old one stays
  // on screen until the new one can be painted: never an empty frame in between
  useEffect(() => {
    if (target === current) return
    const el = imgRefs.current[target]
    const needsImage = items[target].mediaType === 'image' && items[target].image
    if (needsImage && !el) return
    let cancelled = false
    ;(async () => {
      try {
        await el?.decode()
      } catch {}
      if (!cancelled) setCurrent(target)
    })()
    return () => {
      cancelled = true
    }
  }, [target, current, items])

  const goTo = (t: number) => {
    setTarget(t)
    setSeen((prev) => new Set([...prev, ...neighbours(target, n), ...neighbours(t, n)]))
  }
  const goNext = () => goTo((target + 1) % n)
  const goPrev = () => goTo((target - 1 + n) % n)

  // Images in the DOM: the ones already visited, plus the neighbours of the requested one
  const mounted = new Set(seen)
  mounted.add(target)
  if (near) neighbours(target, n).forEach((i) => mounted.add(i))

  return (
    <div ref={rootRef}>
      <div className={mediaClassName} style={{ position: 'relative' }}>
        {items.map((it, i) => (
          <div key={it._key ?? i} style={{ display: i === current ? 'block' : 'none' }}>
            {it.mediaType === 'video' && it.videoUrl ? (
              <div style={{ position: 'relative', width: '100%', aspectRatio: it.videoRatio ?? '4/5' }}>
                <iframe
                  src={getEmbedUrl(it.videoUrl)}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Video"
                />
              </div>
            ) : it.image && mounted.has(i) ? (
              <picture>
                {it.mobileImage && (
                  <source
                    media="(max-width: 767px)"
                    srcSet={urlFor(it.mobileImage).width(1000).url()}
                    {...sizeAttrs(it.mobileImage)}
                  />
                )}
                <FadeImg
                  imgRef={(el) => {
                    imgRefs.current[i] = el
                  }}
                  src={urlFor(it.image).width(1600).url()}
                  alt=""
                  {...sizeAttrs(it.image)}
                  loading={i === 0 && !priority ? 'lazy' : undefined}
                  fetchPriority={i === 0 && priority ? 'high' : undefined}
                  style={{ width: '100%', height: 'auto' }}
                />
              </picture>
            ) : null}
          </div>
        ))}

        {isGallery && (
          <>
            <div
              style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', cursor: 'w-resize', zIndex: 10 }}
              onClick={goPrev}
            />
            <div
              style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', cursor: 'e-resize', zIndex: 10 }}
              onClick={goNext}
            />
          </>
        )}
      </div>

      {Array.isArray(caption) && caption.length > 0 && (
        <div className="mt-[8px] md:max-w-[70%]">
          <RichText value={caption} />
        </div>
      )}
    </div>
  )
}
