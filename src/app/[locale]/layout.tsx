import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {type ReactNode} from 'react'

import {Toaster} from 'sonner'

import {Navigation} from '@/components'
import {LOCALE_TO_HTML_LANG, LOCALES, type Locale, getDictionary, isValidLocale} from '@/i18n'
import {DictionaryProvider} from '@/i18n'

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

  return {
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
    openGraph: {
      images: ['/png/og-image.png'],
      title: dictionary.metadata.ogTitle,
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
