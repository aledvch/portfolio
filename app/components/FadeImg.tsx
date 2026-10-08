'use client'

import type { ImgHTMLAttributes } from 'react'
import { useFadeOnLoad } from './useFadeOnLoad'

interface FadeImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  imgRef?: (el: HTMLImageElement | null) => void
}

export function FadeImg({ imgRef, alt, className, ...props }: FadeImgProps) {
  const { ref, className: fadeClass } = useFadeOnLoad()

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      className={className ? `${className} ${fadeClass}` : fadeClass}
      ref={(el) => {
        ref.current = el
        imgRef?.(el)
      }}
    />
  )
}
