'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLink() {
  const pathname = usePathname()
  const isAbout = pathname === '/about'

  return (
    <Link href={isAbout ? '/' : '/about'} className="hover-link">
      {isAbout ? 'Close' : 'About'}
    </Link>
  )
}
