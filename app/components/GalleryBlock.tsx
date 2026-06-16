'use client'

import { useState } from 'react'
import { urlFor } from '@/sanity/lib/image'
import { RichText } from './RichText'

interface SanityImage {
  asset: { _ref: string }
  dimensions?: { width: number; height: number }
}

interface MediaItem {
  _key?: string
  mediaType: 'image' | 'video'
  image?: SanityImage
  videoUrl?: string
  videoRatio?: string
}

interface GalleryBlockProps {
  items: MediaItem[]
  caption?: unknown[]
}

function getEmbedUrl(url: string): string {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?autoplay=1&loop=1&mute=1&playlist=${youtube[1]}&controls=0`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?background=1&autoplay=1&loop=1&muted=1`
  return url
}

export function GalleryBlock({ items, caption }: GalleryBlockProps) {
  const [current, setCurrent] = useState(0)
  const isGallery = items.length > 1

  const goNext = () => setCurrent((current + 1) % items.length)
  const goPrev = () => setCurrent((current - 1 + items.length) % items.length)

  const item = items[current]

  return (
    <div>
      <div style={{ position: 'relative' }}>
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
            ) : it.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(it.image).width(1600).url()}
                alt=""
                style={{ width: '100%', height: 'auto' }}
              />
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
        <div className="mt-3 text-[14px]">
          <RichText value={caption} />
        </div>
      )}
    </div>
  )
}
