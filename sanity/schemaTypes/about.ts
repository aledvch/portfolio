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

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [linkAnnotation],
          },
        },
      ],
      description: 'Seleziona il testo per aggiungere un link. Invio = nuovo paragrafo, Shift+Invio = a-capo.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'substack',
      title: 'Substack URL',
      type: 'url',
    }),
  ],
})
