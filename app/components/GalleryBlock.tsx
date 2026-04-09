'use client'

import Image from 'next/image'
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
  const img = images[current]

  return (
    <div>
      <div
        className={isGallery ? 'cursor-pointer' : undefined}
        onClick={
          isGallery ? () => setCurrent((current + 1) % images.length) : undefined
        }
      >
        <Image
          src={urlFor(img).width(1600).url()}
          alt=""
          width={img.dimensions?.width ?? 1600}
          height={img.dimensions?.height ?? 900}
          className="w-full h-auto"
          priority={false}
        />
      </div>

      {isGallery && (
        <div className="flex gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1 h-1 rounded-full transition-colors ${
                i === current ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Immagine ${i + 1}`}
            />
          ))}
        </div>
      )}

      {Array.isArray(caption) && caption.length > 0 && (
        <div className="mt-3 opacity-60 text-[14px]">
          <RichText value={caption} />
        </div>
      )}
    </div>
  )
}
