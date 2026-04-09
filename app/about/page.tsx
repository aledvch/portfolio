import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { aboutQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { RichText } from '../components/RichText'
import { Footer } from '../components/Footer'

interface About {
  name?: string
  bio?: unknown[]
  photo?: {
    _type: string
    asset: { _ref: string }
    dimensions?: { width: number; height: number }
  }
  email?: string
  instagram?: string
  linkedin?: string
  substack?: string
}

export default async function AboutPage() {
  const about: About | null = await client.fetch(aboutQuery)

  if (!about) {
    return (
      <>
        <main className="flex-1 px-[20px]">
          <p className="opacity-60">
            Pagina About non ancora configurata. Aggiungila dal pannello Sanity.
          </p>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="flex-1 px-[20px]">
        {about.photo && (
          <Image
            src={urlFor(about.photo).width(800).url()}
            alt={about.name || 'Photo'}
            width={about.photo.dimensions?.width ?? 800}
            height={about.photo.dimensions?.height ?? 600}
            className="w-full max-w-lg h-auto mb-12"
          />
        )}

        {about.name && (
          <p className="mb-6">{about.name}</p>
        )}

        {Array.isArray(about.bio) && about.bio.length > 0 && (
          <div className="mb-10 max-w-full md:max-w-[760px] text-[14px]">
            <RichText value={about.bio} spacedParagraphs={true} />
          </div>
        )}

        <div className="flex flex-col gap-2 text-[14px] items-start">
          {about.email && (
            <a href={`mailto:${about.email}`} className="portfolio-link">
              E-Mail
            </a>
          )}
          {about.instagram && (
            <a href={about.instagram} target="_blank" rel="noopener noreferrer" className="portfolio-link">
              Instagram
            </a>
          )}
          {about.linkedin && (
            <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="portfolio-link">
              LinkedIn
            </a>
          )}
          {about.substack && (
            <a href={about.substack} target="_blank" rel="noopener noreferrer" className="portfolio-link">
              Substack
            </a>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
