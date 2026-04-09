import { type SchemaTypeDefinition } from 'sanity'
import { entry } from './block'
import { about } from './about'
import { settings } from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [entry, about, settings],
}
