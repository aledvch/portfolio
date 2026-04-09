import { client } from '@/sanity/lib/client'
import { lastUpdatedQuery, settingsQuery } from '@/sanity/lib/queries'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = date.toLocaleDateString('en-US', { month: 'long' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export async function Footer() {
  const [lastUpdated, settings] = await Promise.all([
    client.fetch(lastUpdatedQuery),
    client.fetch(settingsQuery),
  ])

  const dateStr = lastUpdated ? formatDate(lastUpdated) : '—'
  const footerText = settings?.footerText ?? 'All rights reserved © Alessandro De Vecchi'

  return (
    <footer className="px-[20px] pb-[20px] pt-[60px] opacity-50 text-[9px]">
      {footerText} | Last updated on {dateStr}
    </footer>
  )
}
