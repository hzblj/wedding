import type {Locale} from './config'
import type czDict from './dictionaries/cz.json'

export type Dictionary = typeof czDict

const DICTIONARIES: Record<Locale, () => Promise<Dictionary>> = {
  cz: () => import('./dictionaries/cz.json').then(m => m.default),
  pl: () => import('./dictionaries/pl.json').then(m => m.default as Dictionary),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => DICTIONARIES[locale]()
