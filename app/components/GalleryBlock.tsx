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
}

interface GalleryBlockProps {
  items: MediaItem[]
  caption?: unknown[]
}

function getEmbedUrl(url: string): string {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
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
              <div className="relative w-full aspect-video">
                <iframe
                  src={getEmbedUrl(it.videoUrl)}
                  className="absolute inset-0 w-full h-full"
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

        {isGallery && item.mediaType !== 'video' && (
          <>
            <div
              style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', cursor: 'w-resize' }}
              onClick={goPrev}
            />
            <div
              style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', cursor: 'e-resize' }}
              onClick={goNext}
            />
          </>
        )}
      </div>

      {isGallery && item.mediaType === 'video' && (
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button onClick={goPrev} style={{ cursor: 'pointer' }}>←</button>
          <button onClick={goNext} style={{ cursor: 'pointer' }}>→</button>
        </div>
      )}

      {Array.isArray(caption) && caption.length > 0 && (
        <div className="mt-3 text-[14px]">
          <RichText value={caption} />
        </div>
      )}
    </div>
  )
}
