import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alessandro De Vecchi',
  description: 'Graphic Designer & Art Director',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
