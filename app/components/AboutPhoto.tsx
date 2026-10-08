'use client'

import Image, { type ImageProps } from 'next/image'
import { useFadeOnLoad } from './useFadeOnLoad'

export function AboutPhoto({ alt, className, ...props }: ImageProps) {
  const { ref, className: fadeClass } = useFadeOnLoad()

  return <Image {...props} alt={alt} ref={ref} className={className ? `${className} ${fadeClass}` : fadeClass} />
}
