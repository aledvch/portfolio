import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { blocksQuery } from '@/sanity/lib/queries'
import { GalleryBlock } from '../components/GalleryBlock'
import { Footer } from '../components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

type Size = 'full' | 'large' | 'medium' | 'small'

const sizeClass: Record<Size, string> = {
  full:   'w-full',
  large:  'w-full md:w-3/4',
  medium: 'w-full md:w-1/2',
  small:  'w-full md:w-1/3',
}

// Displayed width of the image per block size (content area = viewport minus 20px per side),
// mirroring sizeClass above: lets the browser pick the right file from the srcset
const content = 'calc(100vw - 40px)'
const sizesAttr: Record<Size, string> = {
  full:   content,
  large:  `(min-width: 768px) calc(${content} * 0.75), ${content}`,
  medium: `(min-width: 768px) calc(${content} * 0.5), ${content}`,
  small:  `(min-width: 768px) calc(${content} / 3), ${content}`,
}

interface MediaItem {
  _key?: string
  mediaType: 'image' | 'video'
  image?: { asset: { _ref: string }; dimensions?: { width: number; height: number } }
  mobileImage?: { asset: { _ref: string }; dimensions?: { width: number; height: number } }
  videoUrl?: string
  videoRatio?: string
}

interface Block {
  _id: string
  size?: Size
  items?: MediaItem[]
  caption?: unknown[]
}

export default async function HomePage() {
  const blocks: Block[] = await client.fetch(blocksQuery, {}, { next: { revalidate: 0 } })

  return (
    <>
      <main className="fade-in flex-1 px-[20px]">
        {blocks.map((block, index) => (
          <article key={block._id} className="mb-20">
            {block.items && block.items.length > 0 && (
              <GalleryBlock
                items={block.items}
                caption={block.caption}
                priority={index === 0}
                mediaClassName={sizeClass[block.size ?? 'full']}
                sizes={sizesAttr[block.size ?? 'full']}
              />
            )}
          </article>
        ))}

        {blocks.length === 0 && (
          <p className="mt-16">
            Nessun blocco ancora. Aggiungili dal pannello Sanity.
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
