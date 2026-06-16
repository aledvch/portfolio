import { client } from '@/sanity/lib/client'
import { blocksQuery } from '@/sanity/lib/queries'
import { GalleryBlock } from '../components/GalleryBlock'
import { Footer } from '../components/Footer'

type Size = 'full' | 'large' | 'medium' | 'small'

const sizeClass: Record<Size, string> = {
  full:   'w-full',
  large:  'w-full md:w-3/4',
  medium: 'w-full md:w-1/2',
  small:  'w-full md:w-1/3',
}

interface MediaItem {
  _key?: string
  mediaType: 'image' | 'video'
  image?: { asset: { _ref: string }; dimensions?: { width: number; height: number } }
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
      <main className="flex-1 px-[20px]">
        {blocks.map((block) => (
          <article key={block._id} className="mb-20">
            <div className={sizeClass[block.size ?? 'full']}>
              {block.items && block.items.length > 0 && (
                <GalleryBlock items={block.items} caption={block.caption} />
              )}
            </div>
          </article>
        ))}

        {blocks.length === 0 && (
          <p className="mt-16 opacity-60">
            Nessun blocco ancora. Aggiungili dal pannello Sanity.
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
