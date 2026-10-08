import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { aboutUpdatedQuery, lastUpdatedQuery } from '@/sanity/lib/queries'
import { SITE_URL } from './site'

// Read on each request so lastModified follows what is published in Sanity
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [siteUpdated, aboutUpdated] = await Promise.all([
    client.fetch(lastUpdatedQuery),
    client.fetch(aboutUpdatedQuery),
  ])

  return [
    { url: `${SITE_URL}/`, lastModified: siteUpdated ?? undefined },
    { url: `${SITE_URL}/about`, lastModified: aboutUpdated ?? siteUpdated ?? undefined },
  ]
}
