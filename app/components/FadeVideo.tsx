'use client'

import type { VideoHTMLAttributes } from 'react'
import { useFadeOnLoad } from './useFadeOnLoad'

interface FadeVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  videoRef?: (el: HTMLVideoElement | null) => void
}

export function FadeVideo({ videoRef, className, ...props }: FadeVideoProps) {
  const { ref, className: fadeClass } = useFadeOnLoad<HTMLVideoElement>()

  return (
    <video
      {...props}
      className={className ? `${className} ${fadeClass}` : fadeClass}
      ref={(el) => {
        ref.current = el
        videoRef?.(el)
      }}
    />
  )
}
