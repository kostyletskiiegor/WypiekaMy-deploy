import { useDocumentOperation } from 'sanity'
import { useState } from 'react'

async function translateText(text) {
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=pl|en`
  )
  const data = await res.json()
  return data.responseData.translatedText
}

export function TranslateAction(props) {
  const { patch } = useDocumentOperation(props.id, props.type)
  const [isTranslating, setIsTranslating] = useState(false)
  const doc = props.draft || props.published

  if (props.type !== 'product' && props.type !== 'category') return null

  return {
    label: isTranslating ? 'Tłumaczę...' : '🌐 Tłumacz na EN',
    disabled: isTranslating || (!doc?.name_pl && !doc?.desc_pl),
    onHandle: async () => {
      setIsTranslating(true)
      try {
        const patches = {}
        if (doc?.name_pl) patches.name_en = await translateText(doc.name_pl)
        if (doc?.desc_pl) patches.desc_en = await translateText(doc.desc_pl)
        patch.execute([{ set: patches }])
      } finally {
        setIsTranslating(false)
        props.onComplete()
      }
    },
  }
}
