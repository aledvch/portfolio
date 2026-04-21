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

  return (
    <div>
      <div
        className={isGallery ? 'cursor-pointer' : undefined}
        onClick={
          isGallery ? () => setCurrent((current + 1) % images.length) : undefined
        }
      >
        {images.map((img, i) => (
          <div key={img._key ?? i} style={{ display: i === current ? 'block' : 'none' }}>
            <Image
              src={urlFor(img).width(1600).url()}
              alt=""
              width={img.dimensions?.width ?? 1600}
              height={img.dimensions?.height ?? 900}
              className="w-full h-auto"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {Array.isArray(caption) && caption.length > 0 && (
        <div className="mt-3 text-[14px]">
          <RichText value={caption} />
        </div>
      )}
    </div>
  )
}
