import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .id('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      S.divider(),
      // Entries can be reordered by dragging; the order is what the site shows
      orderableDocumentListDeskItem({ type: 'entry', title: 'Entry', S, context }),
      ...S.documentTypeListItems().filter(
        (item) => !['settings', 'entry'].includes(item.getId() ?? '')
      ),
    ])
