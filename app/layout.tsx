import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { settingsQuery } from '@/sanity/lib/queries'
import { RichText } from './components/RichText'
import { NavLink } from './components/NavLink'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alessandro De Vecchi',
  description: 'Graphic Designer & Art Director',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await client.fetch(settingsQuery)

  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col">
        <header className="flex justify-between items-start px-[20px] pt-[16px] pb-[70px] text-[14px]">
          <div>
            <Link href="/">Alessandro De Vecchi</Link>
            {settings?.headerText && (
              <div className="mt-1 opacity-60">
                <RichText value={settings.headerText} />
              </div>
            )}
          </div>
          <nav>
            <NavLink />
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
