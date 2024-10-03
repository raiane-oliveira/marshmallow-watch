import 'server-only'
import { Locale } from './i18n-config'

const dictionaries = {
  "pt-BR": () => import("./dictionaries/pt-BR.json").then((module) => module.default),
  "en": () => import("./dictionaries/en.json").then((module) => module.default)
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale]?.() ?? dictionaries.en()
}
