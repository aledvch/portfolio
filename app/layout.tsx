import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL } from './site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alessandro De Vecchi — Graphic Designer & Art Director',
    template: '%s — Alessandro De Vecchi',
  },
  description: 'Graphic Designer & Art Director',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
