'use client'

import { useState } from 'react'
import { urlFor } from '@/sanity/lib/image'
import { RichText } from './RichText'

interface SanityImage {
  _key?: string
  _type: string
  asset: { _ref: string }
  dimensions?: { width: number; height: number }
}

interface GalleryBlockProps {
  images: SanityImage[]
  caption?: unknown[]
}

export function GalleryBlock({ images, caption }: GalleryBlockProps) {
  const [current, setCurrent] = useState(0)
  const isGallery = images.length > 1

  const goNext = () => setCurrent((current + 1) % images.length)
  const goPrev = () => setCurrent((current - 1 + images.length) % images.length)

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img._key ?? i}
            src={urlFor(img).width(1600).url()}
            alt=""
            style={{
              display: i === current ? 'block' : 'none',
              width: '100%',
              height: 'auto',
            }}
          />
        ))}
        {isGallery && (
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

      {Array.isArray(caption) && caption.length > 0 && (
        <div className="mt-3 text-[14px]">
          <RichText value={caption} />
        </div>
      )}
    </div>
  )
}
