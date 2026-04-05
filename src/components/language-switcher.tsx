'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {type FC, useMemo} from 'react'

import {LOCALES, useDictionary} from '@/i18n'
import {cn} from '@/utils'

export const LanguageSwitcher: FC = () => {
  const pathname = usePathname()
  const {locale: currentLocale} = useDictionary()

  const buildPath = useMemo(() => {
    const currentPrefix = LOCALES.find(l => pathname.startsWith(`/${l}`))

    return (targetLocale: string) => {
      if (currentPrefix) {
        return pathname.replace(`/${currentPrefix}`, `/${targetLocale}`)
      }

      return `/${targetLocale}`
    }
  }, [pathname])

  return (
    <div className="flex items-center gap-1.5 text-[14px] font-semibold uppercase">
      <Link
        href={buildPath('cz')}
        className={cn(
          'transition-colors duration-500',
          currentLocale === 'cz' ? 'text-heading' : 'text-body/40 hover:text-heading'
        )}
      >
        CS
      </Link>
      <span className="text-body/30">/</span>
      <Link
        href={buildPath('pl')}
        className={cn(
          'transition-colors duration-500',
          currentLocale === 'pl' ? 'text-heading' : 'text-body/40 hover:text-heading'
        )}
      >
        PL
      </Link>
    </div>
  )
}
