import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',

  fields: [
    defineField({ name: 'name_pl', title: 'Nazwa (PL)', type: 'string', validation: R => R.required() }),
    defineField({ name: 'name_en', title: 'Nazwa (EN) — uzupełnij przyciskiem Tłumacz', type: 'string' }),
    defineField({
      name: 'price',
      title: 'Cena (zł)',
      type: 'number',
      validation: R => R.required().positive(),
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        layout: 'dropdown',
        list: [
          { title: '🍩 Pączki',    value: 'paczki'    },
          { title: '🥐 Ciasta',    value: 'ciasta'    },
          { title: '🎂 Torty',     value: 'torty'     },
          { title: '🍰 Serniki',   value: 'serniki'   },
          { title: '☁️ Pufy',      value: 'pufy'      },
          { title: '🍫 Czekolada', value: 'czekolada' },
          { title: '🍬 Cukierki',  value: 'cukierki'  },
          { title: '🎁 Zestawy',   value: 'zestawy'   },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie produktu',
      type: 'image',
      options: { hotspot: true },
      validation: R => R.required(),
    }),
    defineField({ name: 'desc_pl', title: 'Opis (PL)', type: 'text', rows: 4, validation: R => R.required() }),
    defineField({ name: 'desc_en', title: 'Opis (EN) — uzupełnij przyciskiem Tłumacz', type: 'text', rows: 4 }),
    defineField({
      name: 'available',
      title: 'Sztuk dostępnych',
      type: 'number',
      initialValue: 0,
      validation: R => R.required().min(0).integer(),
    }),
  ],

  preview: {
    select: { title: 'name_pl', media: 'image', price: 'price' },
    prepare({ title, media, price }) {
      return { title, media, subtitle: price ? `${price} zł` : '' }
    },
  },
})
