import type {MetadataRoute} from 'next'

import {LOCALE_TO_HTML_LANG, LOCALES, type Locale} from '@/i18n'
import {SITE_URL} from '@/utils'

const PUBLIC_PATHS = ['', '/music'] as const

const languagesFor = (path: string): Record<string, string> =>
  Object.fromEntries(LOCALES.map(locale => [LOCALE_TO_HTML_LANG[locale], `${SITE_URL}/${locale}${path}`]))

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return LOCALES.flatMap((locale: Locale) =>
    PUBLIC_PATHS.map(path => ({
      alternates: {languages: languagesFor(path)},
      changeFrequency: 'weekly' as const,
      lastModified,
      priority: path === '' ? 1 : 0.7,
      url: `${SITE_URL}/${locale}${path}`,
    }))
  )
}
