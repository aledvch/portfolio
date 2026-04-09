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

export const entry = defineType({
  name: 'entry',
  title: 'Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo interno',
      type: 'string',
      description: 'Non appare sul sito — serve solo per organizzarsi qui',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Tipo di media',
      type: 'string',
      options: {
        list: [
          { title: 'Immagine / Galleria', value: 'images' },
          { title: 'Video (Vimeo / YouTube)', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'images',
    }),
    defineField({
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: '1 immagine = singola. Più immagini = galleria cliccabile.',
      hidden: ({ document }) => document?.mediaType === 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL Video',
      type: 'url',
      description: 'Incolla un link Vimeo o YouTube',
      hidden: ({ document }) => document?.mediaType !== 'video',
    }),
    defineField({
      name: 'size',
      title: 'Dimensione',
      type: 'string',
      options: {
        list: [
          { title: 'Full — 100%', value: 'full' },
          { title: 'Large — 75%', value: 'large' },
          { title: 'Medium — 50%', value: 'medium' },
          { title: 'Small — 33%', value: 'small' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    }),
    defineField({
      name: 'caption',
      title: 'Didascalia',
      type: 'array',
      of: [simplePortableText],
      description: 'Appare sotto il blocco. Seleziona il testo per aggiungere un link.',
    }),
    defineField({
      name: 'order',
      title: 'Ordine di visualizzazione',
      type: 'number',
      description: 'Numero più basso = appare prima',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Ordine',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
    },
  },
})
