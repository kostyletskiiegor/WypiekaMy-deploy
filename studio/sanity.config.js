import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index.js'
import { TranslateAction } from './actions/translateAction.js'

export default defineConfig({
  name: 'wypiekamy',
  title: 'WypiekaMY Studio',

  projectId: 'pffx13ss',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: { types: schemaTypes },

  document: {
    actions: (prev, ctx) =>
      ctx.schemaType === 'product' ? [...prev, TranslateAction] : prev,
  },
})
