import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategoria',
  type: 'document',

  fields: [
    defineField({ name: 'name_pl', title: 'Nazwa (PL)', type: 'string', validation: R => R.required() }),
    defineField({ name: 'name_en', title: 'Nazwa (EN) — uzupełnij przyciskiem Tłumacz', type: 'string' }),
    defineField({ name: 'emoji',   title: 'Emoji',      type: 'string', description: 'Np. 🍩 🎂 🥐' }),
  ],

  preview: {
    select: { title: 'name_pl', emoji: 'emoji' },
    prepare({ title, emoji }) {
      return { title: emoji ? `${emoji} ${title}` : title }
    },
  },
})
