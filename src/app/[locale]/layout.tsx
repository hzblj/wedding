import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {type ReactNode} from 'react'

import {Toaster} from 'sonner'

import {Navigation} from '@/components'
import {
  DEFAULT_LOCALE,
  DictionaryProvider,
  getDictionary,
  isValidLocale,
  LOCALE_TO_HTML_LANG,
  LOCALES,
  type Locale,
} from '@/i18n'
import {SITE_URL} from '@/utils'

type Params = {
  locale: string
}

export const generateStaticParams = () => LOCALES.map(locale => ({locale}))

export const generateMetadata = async ({params}: {params: Promise<Params>}): Promise<Metadata> => {
  const {locale} = await params

  if (!isValidLocale(locale)) {
    return {}
  }

  const dictionary = await getDictionary(locale)

  const languages = Object.fromEntries(LOCALES.map(l => [LOCALE_TO_HTML_LANG[l], `${SITE_URL}/${l}`]))

  return {
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {...languages, 'x-default': `${SITE_URL}/${DEFAULT_LOCALE}`},
    },
    appleWebApp: {
      statusBarStyle: 'black-translucent',
    },
    description: dictionary.metadata.description,
    icons: {
      apple: '/apple-touch-icon.png',
      icon: [
        {sizes: '32x32', url: '/favicon-32x32.png'},
        {sizes: '16x16', url: '/favicon-16x16.png'},
      ],
    },
    manifest: '/site.webmanifest',
    metadataBase: new URL(SITE_URL),
    openGraph: {
      images: ['/png/og-image.png'],
      locale: LOCALE_TO_HTML_LANG[locale as Locale],
      title: dictionary.metadata.ogTitle,
      type: 'website',
      url: `${SITE_URL}/${locale}`,
    },
    title: dictionary.metadata.title,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<Params>
}>) {
  const {locale} = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)
  const htmlLang = LOCALE_TO_HTML_LANG[locale as Locale]

  return (
    <div lang={htmlLang}>
      <Toaster position="top-center" />
      <DictionaryProvider dictionary={dictionary} locale={locale as Locale}>
        <Navigation />
        {children}
      </DictionaryProvider>
    </div>
  )
}
