'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'

function createComponents(spacedParagraphs: boolean): PortableTextComponents {
  return {
    marks: {
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target={value?.blank !== false ? '_blank' : '_self'}
          rel={value?.blank !== false ? 'noopener noreferrer' : undefined}
          className="portfolio-link"
        >
          {children}
        </a>
      ),
    },
    block: {
      normal: ({ children, index }) => (
        <p style={{ margin: 0, marginTop: spacedParagraphs && (index as number) > 0 ? '1.3em' : 0 }}>
          {children}
        </p>
      ),
    },
  }
}

interface RichTextProps {
  value: unknown
  className?: string
  spacedParagraphs?: boolean
}

export function RichText({ value, className, spacedParagraphs = false }: RichTextProps) {
  if (!value) return null
  return (
    <div className={`rich-text ${className ?? ''}`}>
      <PortableText value={value as any} components={createComponents(spacedParagraphs)} />
    </div>
  )
}
