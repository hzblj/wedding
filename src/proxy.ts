import {type NextRequest, NextResponse} from 'next/server'

import {DEFAULT_LOCALE, type Locale, LOCALES} from '@/i18n/config'
import {updateSession} from '@/lib'

const detectLocaleFromHeaders = (request: NextRequest): Locale => {
  const acceptLanguage = request.headers.get('accept-language') ?? ''

  const languages = acceptLanguage
    .split(',')
    .map(part => {
      const [lang, priority] = part.trim().split(';q=')
      return {lang: lang.toLowerCase().trim(), quality: priority ? parseFloat(priority) : 1}
    })
    .sort((a, b) => b.quality - a.quality)

  for (const {lang} of languages) {
    if (lang === 'pl' || lang.startsWith('pl-')) {
      return 'pl'
    }

    if (lang === 'cs' || lang.startsWith('cs-') || lang === 'cz' || lang.startsWith('cz-')) {
      return 'cz'
    }
  }

  return DEFAULT_LOCALE
}

export async function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl

  if (pathname.startsWith('/api')) {
    return await updateSession(request)
  }

  const hasLocale = LOCALES.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (!hasLocale) {
    const detectedLocale = detectLocaleFromHeaders(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${detectedLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)',
  ],
}
