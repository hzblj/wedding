'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {FC, useCallback, useMemo, useRef, useState} from 'react'

import {useDictionary} from '@/i18n'
import {cn} from '@/utils'

import {LanguageSwitcher} from './language-switcher'
import {MobileMenu} from './mobile-menu'

const SECTION_KEYS = ['when', 'where', 'plan', 'who', 'seating', 'questions'] as const
const SECTION_HREFS = ['#date', '#where', '#agenda', '#gallery', '#seating', '#faq'] as const

const HOVER_DELAY = 150

const HomeDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null)
  const {dictionary, locale} = useDictionary()

  const handleEnter = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setIsOpen(true)
  }, [])

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setIsOpen(false)
    }, HOVER_DELAY)
  }, [])

  const handleClick = useCallback((href: string) => {
    setIsOpen(false)
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      const SCROLL_OFFSET = 80

      const elementTop = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
      window.scrollTo({behavior: 'smooth', top: elementTop})
    }
  }, [])

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href={`/${locale}`}
        className="text-heading text-[16px] leading-4.25 font-semibold uppercase transition-colors duration-500"
      >
        {dictionary.nav.home}
      </Link>
      {isOpen && (
        <div className="fixed top-full left-1/2 -translate-x-1/2 pt-4">
          <div className="flex items-center gap-2 rounded-xl bg-heading/8 backdrop-blur-2xl border border-border py-2.5 px-4 shadow-lg shadow-heading/10">
            {SECTION_KEYS.map((key, index) => (
              <div key={key} className="flex items-center gap-2">
                {index > 0 && <span className="text-border text-sm">/</span>}
                <button
                  type="button"
                  className="text-body/70 text-sm tracking-wide uppercase whitespace-nowrap cursor-pointer transition-colors duration-500 hover:text-heading"
                  onClick={() => handleClick(SECTION_HREFS[index])}
                >
                  {dictionary.nav.sections[key]}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const Navigation = () => {
  const pathname = usePathname()
  const {dictionary, locale} = useDictionary()

  const {isHome, isMusic, isPhotos} = useMemo(
    () => ({
      isHome: pathname === `/${locale}` || pathname === `/${locale}/`,
      isMusic: pathname === `/${locale}/music`,
      isPhotos: pathname === `/${locale}/photos`,
    }),
    [pathname, locale]
  )

  return (
    <nav
      style={{viewTransitionName: 'navigation'}}
      className="fixed top-0 left-0 right-0 z-1001 bg-transparent backdrop-blur-lg flex justify-center pt-[env(safe-area-inset-top)]"
    >
      <div className="flex flex-row items-center justify-between w-full max-w-full h-min py-3 px-8 relative overflow-visible">
        <Link
          href={`/${locale}`}
          className="text-heading font-semibold text-[14px] md:text-[16px] transition-colors duration-500 hover:text-body"
        >
          [ Karin & Jan ]
        </Link>
        <MobileMenu />
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {isHome ? (
            <HomeDropdown />
          ) : (
            <Link
              href={`/${locale}`}
              className="text-body/70 text-[16px] leading-4.25 font-semibold uppercase transition-colors duration-500 hover:text-heading"
            >
              {dictionary.nav.home}
            </Link>
          )}
          <span className="text-[16px] leading-4.25 font-semibold uppercase text-body/70">/</span>
          <Link
            href={`/${locale}/photos`}
            className={cn(
              'text-[16px] leading-4.25 font-semibold uppercase transition-colors duration-500',
              isPhotos ? 'text-heading' : 'text-body/70 hover:text-heading'
            )}
          >
            {dictionary.nav.photos}
          </Link>
          <span className="text-[16px] leading-4.25 font-semibold uppercase text-body/70">/</span>
          <Link
            href={`/${locale}/music`}
            className={cn(
              'text-[16px] leading-4.25 font-semibold uppercase transition-colors duration-500',
              isMusic ? 'text-heading' : 'text-body/70 hover:text-heading'
            )}
          >
            {dictionary.nav.music}
          </Link>
        </div>
        <div className="hidden md:flex">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
