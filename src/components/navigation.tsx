'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {FC, useCallback, useRef, useState} from 'react'

import {MobileMenu} from '@/components/mobile-menu'
import {cn} from '@/utils'

const SECTION_LINKS = [
  {href: '#where', label: 'Where'},
  {href: '#gallery', label: 'Gallery'},
  {href: '#agenda', label: 'Agenda'},
  {href: '#seating', label: 'Seating'},
  {href: '#faq', label: 'FAQ'},
] as const

const HOVER_DELAY = 150

const HomeDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(null)

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
      window.scrollTo({top: elementTop, behavior: 'smooth'})
    }
  }, [])

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        href="/"
        className="text-white text-[14px] leading-4.25 font-semibold uppercase transition-colors duration-500"
      >
        Home
      </Link>
      {isOpen && (
        <div className="fixed top-full left-1/2 -translate-x-1/2 pt-4">
          <div className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/15 py-2.5 px-4 shadow-lg shadow-black/20">
            {SECTION_LINKS.map((link, index) => (
              <div key={link.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-white/15 text-xs">/</span>}
                <button
                  type="button"
                  className="text-white/70 text-xs tracking-wide uppercase whitespace-nowrap cursor-pointer transition-colors duration-500 hover:text-white"
                  onClick={() => handleClick(link.href)}
                >
                  {link.label}
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
  const isHome = pathname === '/'
  const isPhotos = pathname === '/photos'

  return (
    <nav className="fixed top-0 left-0 right-0 z-1001 bg-transparent backdrop-blur-lg flex justify-center pt-[env(safe-area-inset-top)]">
      <div className="flex flex-row items-center justify-between w-full max-w-full h-min py-3 px-8 relative overflow-visible">
        <Link href="/" className="text-white font-semibold text-[14px] transition-colors duration-500 hover:text-white/60">[ Karin & Jan ]</Link>
        <MobileMenu />
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {isHome ? (
            <HomeDropdown />
          ) : (
            <Link
              href="/"
              className="text-white/60 text-[14px] leading-4.25 font-semibold uppercase transition-colors duration-500 hover:text-white"
            >
              Home
            </Link>
          )}
          <span className="text-[14px] leading-4.25 font-semibold uppercase text-white/60">/</span>
          <Link
            href="/photos"
            className={cn(
              'text-[14px] leading-4.25 font-semibold uppercase transition-colors duration-500',
              isPhotos ? 'text-white' : 'text-white/60 hover:text-white',
            )}
          >
            Photos
          </Link>
        </div>
      </div>
    </nav>
  )
}
