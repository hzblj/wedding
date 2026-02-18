'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {FC, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'

type PhotoModalProps = {
  src: string | null
  isVideo: boolean
  onClose: () => void
  videoRenderer?: (src: string) => ReactNode
}

export const PhotoModal: FC<PhotoModalProps> = ({src, isVideo, onClose, videoRenderer}) => {
  const [mounted, setMounted] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const startClose = useCallback(() => {
    if (!cardRef.current || !backdropRef.current) {
      return
    }

    gsap.killTweensOf([cardRef.current, backdropRef.current, closeButtonRef.current])

    gsap.to(cardRef.current, {duration: 0.25, ease: 'power2.in', scale: 0.95})

    gsap.to(closeButtonRef.current, {
      autoAlpha: 0,
      duration: 0.05,
      ease: 'power2.in',
    })

    gsap.to(backdropRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setMounted(false)
        onClose()
      },
    })
  }, [onClose])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keyValue = event.key.toLowerCase()
      if (keyValue === 'esc' || keyValue === 'escape') {
        event.preventDefault()
        startClose()
      }
    },
    [startClose]
  )

  useEffect(() => {
    if (src) {
      setMounted(true)
    }
  }, [src])

  useLayoutEffect(() => {
    if (!mounted) {
      return
    }

    if (!cardRef.current || !backdropRef.current || !closeButtonRef.current) {
      return
    }

    gsap.killTweensOf([cardRef.current, backdropRef.current, closeButtonRef.current])
    gsap.set(backdropRef.current, {autoAlpha: 0})
    gsap.set(closeButtonRef.current, {autoAlpha: 0})
    gsap.set(cardRef.current, {scale: 0.95})
  }, [mounted])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.overflow = 'hidden'

    const abortController = new AbortController()
    const preventScroll = (event: Event) => event.preventDefault()

    document.addEventListener('keydown', handleKeyDown, {signal: abortController.signal})
    document.addEventListener('touchmove', preventScroll, {passive: false, signal: abortController.signal})
    document.addEventListener('wheel', preventScroll, {passive: false, signal: abortController.signal})

    if (cardRef.current && backdropRef.current && closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {autoAlpha: 1, delay: 0.1, duration: 0.25, ease: 'power2.out'})
      gsap.to(backdropRef.current, {autoAlpha: 1, duration: 0.25, ease: 'power2.out'})
      gsap.to(cardRef.current, {autoAlpha: 1, duration: 0.3, ease: 'power2.out', scale: 1})
    }

    return () => {
      const restoredScrollY = parseInt(document.body.style.top || '0', 10) * -1
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      window.scrollTo(0, restoredScrollY)
      abortController.abort()
    }
  }, [mounted, handleKeyDown])

  if (!mounted) {
    return null
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-1002 flex items-center justify-center bg-black/80 backdrop-blur-sm overscroll-none touch-none"
      onClick={startClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
        onClick={startClose}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div ref={cardRef} className="relative w-[85vw] max-w-md aspect-[0.7]" onClick={event => event.stopPropagation()}>
        <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-visible">
          <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[16px_16px_64px] relative overflow-hidden">
            <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
              {isVideo && videoRenderer ? (
                videoRenderer(src!)
              ) : (
                <div className="absolute inset-0">
                  <Image src={src!} alt="photo" fill className="object-cover" />
                </div>
              )}
            </div>
          </div>
          <div className="opacity-80 h-auto aspect-[0.660645] z-20 flex-none w-12.25 absolute -top-8 left-1/2 overflow-visible -translate-x-1/2 rotate-90">
            <div className="absolute inset-0">
              <Image src="/png/paper.png" alt="paper" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
