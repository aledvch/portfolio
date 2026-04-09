import { defineField, defineType } from 'sanity'

const linkAnnotation = {
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    { name: 'href', type: 'url', title: 'URL' },
    { name: 'blank', type: 'boolean', title: 'Apri in nuova scheda', initialValue: true },
  ],
}

const simplePortableText = {
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  lists: [],
  marks: {
    decorators: [],
    annotations: [linkAnnotation],
  },
}

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'headerText',
      title: 'Testo header',
      type: 'array',
      of: [simplePortableText],
      description: "Breve testo che appare sotto il nome nell'header. Seleziona il testo per aggiungere un link.",
    }),
    defineField({
      name: 'footerText',
      title: 'Testo footer',
      type: 'string',
      description: 'Testo statico del footer. La data di aggiornamento viene aggiunta automaticamente.',
      initialValue: 'All rights reserved © 2026 Alessandro De Vecchi',
    }),
  ],
})
