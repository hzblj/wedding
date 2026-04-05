'use client'

import gsap from 'gsap'
import Link from 'next/link'
import {usePathname, useRouter} from 'next/navigation'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'

import {useDictionary} from '@/i18n'
import {cn} from '@/utils'

import {LanguageSwitcher} from './language-switcher'

const SCROLL_OFFSET = 80

const SECTION_KEYS = ['when', 'where', 'plan', 'who', 'seating', 'questions'] as const
const SECTION_HREFS = ['#date', '#where', '#agenda', '#gallery', '#seating', '#faq'] as const

type MobileMenuModalProps = {
  isOpen: boolean
  onClose: () => void
}

const MobileMenuModal: FC<MobileMenuModalProps> = ({isOpen, onClose}) => {
  const [isMounted, setIsMounted] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const sectionLinksRef = useRef<HTMLDivElement>(null)
  const savedScrollY = useRef(0)
  const pathname = usePathname()
  const router = useRouter()
  const {dictionary, locale} = useDictionary()

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`
  const isPhotos = pathname === `/${locale}/photos`
  const isMusic = pathname === `/${locale}/music`
  const pendingNavigation = useRef<string | null>(null)

  const lockScroll = useCallback(() => {
    savedScrollY.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedScrollY.current}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.overflow = ''
    window.scrollTo(0, savedScrollY.current)
  }, [])

  const animateOpen = useCallback(() => {
    if (!backdropRef.current || !contentRef.current || !linksRef.current) {
      return
    }

    gsap.set(backdropRef.current, {yPercent: -100})
    gsap.set(contentRef.current, {autoAlpha: 0})
    gsap.set(linksRef.current.children, {autoAlpha: 0, y: 20})

    if (sectionLinksRef.current) {
      gsap.set(sectionLinksRef.current.children, {autoAlpha: 0, y: 10})
    }

    const timeline = gsap.timeline()

    timeline
      .to(backdropRef.current, {duration: 0.6, ease: 'power3.inOut', yPercent: 0})
      .to(contentRef.current, {autoAlpha: 1, duration: 0.01}, 0.25)
      .to(linksRef.current.children, {autoAlpha: 1, duration: 0.3, ease: 'power2.out', stagger: 0.08, y: 0}, 0.3)

    if (sectionLinksRef.current) {
      timeline.to(
        sectionLinksRef.current.children,
        {autoAlpha: 1, duration: 0.25, ease: 'power2.out', stagger: 0.05, y: 0},
        0.5
      )
    }
  }, [])

  const animateClose = useCallback((onComplete: () => void) => {
    if (!backdropRef.current || !contentRef.current) {
      onComplete()
      return
    }

    gsap.killTweensOf([backdropRef.current, contentRef.current])

    if (linksRef.current) {
      gsap.killTweensOf(linksRef.current.children)
    }

    if (sectionLinksRef.current) {
      gsap.killTweensOf(sectionLinksRef.current.children)
    }

    const timeline = gsap.timeline({onComplete})

    if (linksRef.current) {
      timeline.to(linksRef.current.children, {autoAlpha: 0, duration: 0.15, ease: 'power2.in', stagger: 0.03, y: 20})
    }

    timeline
      .to(contentRef.current, {autoAlpha: 0, duration: 0.01})
      .to(backdropRef.current, {duration: 0.35, ease: 'power3.inOut', yPercent: -100})
  }, [])

  const handleBackdropClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleNavigate = useCallback(
    (event: React.MouseEvent, href: string) => {
      event.preventDefault()

      if (pathname === href) {
        onClose()
        return
      }

      pendingNavigation.current = href
      onClose()
    },
    [onClose, pathname]
  )

  const handleSectionClick = useCallback(
    (href: string) => {
      const targetId = href.replace('#', '')

      onClose()

      const checkAndScroll = () => {
        requestAnimationFrame(() => {
          const element = document.getElementById(targetId)

          if (element) {
            const elementTop = element.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
            window.scrollTo({behavior: 'smooth', top: elementTop})
          }
        })
      }

      sectionScrollTarget.current = checkAndScroll
    },
    [onClose]
  )

  const sectionScrollTarget = useRef<(() => void) | null>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keyValue = event.key.toLowerCase()
      if (keyValue === 'esc' || keyValue === 'escape') {
        event.preventDefault()
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      lockScroll()
    }
  }, [isOpen, lockScroll])

  useEffect(() => {
    if (isMounted && isOpen) {
      animateOpen()
    }
  }, [isMounted, isOpen, animateOpen])

  useEffect(() => {
    if (!isOpen && isMounted) {
      animateClose(() => {
        unlockScroll()
        setIsMounted(false)

        if (pendingNavigation.current) {
          router.push(pendingNavigation.current)
          pendingNavigation.current = null
        }

        if (sectionScrollTarget.current) {
          sectionScrollTarget.current()
          sectionScrollTarget.current = null
        }
      })
    }
  }, [isOpen, isMounted, animateClose, unlockScroll, router.push])

  useEffect(() => {
    if (!isMounted) {
      return
    }

    const abortController = new AbortController()
    document.addEventListener('keydown', handleKeyDown, {signal: abortController.signal})

    return () => {
      abortController.abort()
    }
  }, [isMounted, handleKeyDown])

  if (!isMounted) {
    return null
  }

  return createPortal(
    <>
      <div
        ref={backdropRef}
        className="fixed inset-0 z-1002 bg-surface/95 backdrop-blur-2xl"
        onClick={handleBackdropClose}
      />
      <div
        ref={contentRef}
        className="fixed bottom-0 left-0 right-0 z-1003 flex flex-col p-8 pb-16"
        onClick={event => event.stopPropagation()}
      >
        <div ref={linksRef} className="flex flex-col gap-4">
          <div className="pb-2">
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-border" />
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  'text-3xl font-semibold uppercase tracking-wide',
                  isHome ? 'text-heading' : 'text-body/60'
                )}
              >
                (01)
              </span>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/${locale}`}
                  className={cn(
                    'text-3xl font-semibold uppercase tracking-wide transition-colors duration-500',
                    isHome ? 'text-heading' : 'text-body/60'
                  )}
                  onClick={event => handleNavigate(event, `/${locale}`)}
                >
                  {dictionary.nav.home}
                </Link>
                {isHome && (
                  <div ref={sectionLinksRef} className="flex flex-col gap-3">
                    {SECTION_KEYS.map((key, index) => (
                      <button
                        key={key}
                        type="button"
                        className="text-body/50 text-base uppercase tracking-wide text-left cursor-pointer transition-colors duration-500 hover:text-heading"
                        onClick={() => handleSectionClick(SECTION_HREFS[index])}
                      >
                        {dictionary.nav.sections[key]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-border" />
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  'text-3xl font-semibold uppercase tracking-wide',
                  isPhotos ? 'text-heading' : 'text-body/60'
                )}
              >
                (02)
              </span>
              <Link
                href={`/${locale}/photos`}
                className={cn(
                  'text-3xl font-semibold uppercase tracking-wide transition-colors duration-500',
                  isPhotos ? 'text-heading' : 'text-body/60'
                )}
                onClick={event => handleNavigate(event, `/${locale}/photos`)}
              >
                {dictionary.nav.photos}
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-border" />
            <div className="flex items-baseline gap-3">
              <span
                className={cn(
                  'text-3xl font-semibold uppercase tracking-wide',
                  isMusic ? 'text-heading' : 'text-body/60'
                )}
              >
                (03)
              </span>
              <Link
                href={`/${locale}/music`}
                className={cn(
                  'text-3xl font-semibold uppercase tracking-wide transition-colors duration-500',
                  isMusic ? 'text-heading' : 'text-body/60'
                )}
                onClick={event => handleNavigate(event, `/${locale}/music`)}
              >
                {dictionary.nav.music}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={`/${locale}`}
        className="fixed top-3 left-8 z-1003 text-heading font-semibold text-[16px] pt-[env(safe-area-inset-top)] transition-colors duration-500 hover:text-body"
        onClick={event => handleNavigate(event, `/${locale}`)}
      >
        [ Karin & Jan ]
      </Link>
    </>,
    document.body
  )
}

export const MobileMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClientMounted, setIsClientMounted] = useState(false)
  const cubeRef = useRef<HTMLSpanElement>(null)
  const {dictionary} = useDictionary()

  useEffect(() => {
    setIsClientMounted(true)
  }, [])

  const handleToggle = useCallback(() => {
    setIsOpen(previous => !previous)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (!cubeRef.current) {
      return
    }

    gsap.to(cubeRef.current, {
      duration: 0.3,
      ease: 'power2.inOut',
      rotateX: isOpen ? 90 : 0,
    })
  }, [isOpen])

  if (!isClientMounted) {
    return null
  }

  const CUBE_HALF_HEIGHT = 8

  return (
    <>
      {createPortal(
        <button
          type="button"
          className="md:hidden fixed top-3 right-8 z-1003 text-heading font-semibold text-[14px] md:text-[16px] uppercase cursor-pointer pt-[env(safe-area-inset-top)]"
          style={{perspective: '200px'}}
          onClick={handleToggle}
        >
          <span
            ref={cubeRef}
            className="relative inline-flex items-center justify-center whitespace-nowrap"
            style={{transformStyle: 'preserve-3d'}}
          >
            <span
              className="inline-block"
              style={{backfaceVisibility: 'hidden', transform: `translateZ(${CUBE_HALF_HEIGHT}px)`}}
            >
              {dictionary.nav.menu}
            </span>
            <span
              className="absolute inline-block"
              style={{backfaceVisibility: 'hidden', transform: `rotateX(-90deg) translateZ(${CUBE_HALF_HEIGHT}px)`}}
            >
              {dictionary.nav.close}
            </span>
          </span>
        </button>,
        document.body
      )}
      <MobileMenuModal isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
