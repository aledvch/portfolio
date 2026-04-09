import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
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
      ...S.documentTypeListItems().filter(
        (item) => !['settings'].includes(item.getId() ?? '')
      ),
    ])
