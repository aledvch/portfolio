import { client } from '@/sanity/lib/client'
import { blocksQuery } from '@/sanity/lib/queries'
import { GalleryBlock } from './components/GalleryBlock'
import { RichText } from './components/RichText'
import { Footer } from './components/Footer'

function getEmbedUrl(url: string): string {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return url
}

type Size = 'full' | 'large' | 'medium' | 'small'

const sizeClass: Record<Size, string> = {
  full:   'w-full',
  large:  'w-full md:w-3/4',
  medium: 'w-full md:w-1/2',
  small:  'w-full md:w-1/3',
}

interface SanityImage {
  _key?: string
  _type: string
  asset: { _ref: string }
  dimensions?: { width: number; height: number }
}

interface Block {
  _id: string
  mediaType: 'images' | 'video'
  size?: Size
  images?: SanityImage[]
  videoUrl?: string
  caption?: unknown
}

export default async function HomePage() {
  const blocks: Block[] = await client.fetch(blocksQuery, {}, { next: { revalidate: 0 } })

  return (
    <>
      <main className="flex-1 px-[20px]">
        {blocks.map((block) => (
          <article key={block._id} className="mb-20">
            <div className={sizeClass[block.size ?? 'full']}>
              {block.mediaType === 'images' && block.images && block.images.length > 0 ? (
                <GalleryBlock images={block.images} caption={block.caption} />
              ) : block.mediaType === 'video' && block.videoUrl ? (
                <div>
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={getEmbedUrl(block.videoUrl)}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title="Video"
                    />
                  </div>
                  {block.caption && (
                    <div className="mt-3 opacity-60 text-[14px]">
                      <RichText value={block.caption} />
                    </div>
                  )}
                </div>
              ) : null}
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
