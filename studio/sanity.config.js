import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index.js'

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
})
