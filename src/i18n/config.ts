export const LOCALES = ['cz', 'pl'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'cz'

export const LOCALE_TO_HTML_LANG: Record<Locale, string> = {
  cz: 'cs',
  pl: 'pl',
}

export const isValidLocale = (value: string): value is Locale =>
  LOCALES.includes(value as Locale)
