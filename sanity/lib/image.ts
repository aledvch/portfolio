import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

// Quality-first URL for photos: fit=max never enlarges the original (a 1080px image
// asked at 1600px would be upscaled and blurry), q90 instead of Sanity's default 75, and
// WebP: at q90 it is closer to the original than JPEG q90 and much lighter. Fixed on purpose
// (auto=format may serve AVIF, which compresses harder at the same quality number)
export const imageUrl = (source: SanityImageSource, width: number) => {
  return urlFor(source).width(width).fit('max').quality(90).format('webp').url()
}
