'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {useEffect, useRef} from 'react'

import {cn} from '@/utils'

import {Eyebrow, SectionParagraph} from './ui'

const REVEAL_DURATION = 0.8
const REVEAL_EASE = 'power2.out'

const HeaderImage = ({className = '', url}: {className?: string; url: string}) => (
  <div
    className={cn(
      'bg-white h-52 sm:h-64 md:h-84 aspect-[200/306] p-[8px_8px_32px] sm:p-[10px_10px_40px] md:p-[12px_12px_48px] paper-texture',
      className
    )}
  >
    <div className="relative h-full w-full bg-black/90 overflow-hidden">
      <Image
        src={url}
        alt="image"
        width={256}
        height={306}
        className="h-full w-full object-cover"
        draggable={false}
        priority
        fetchPriority="high"
      />
    </div>
  </div>
)

export const Header = () => {
  const imagesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const context = gsap.context(() => {
      if (imagesRef.current) {
        gsap.fromTo(
          imagesRef.current.children,
          {autoAlpha: 0, scale: 0.95, y: 30},
          {autoAlpha: 1, duration: REVEAL_DURATION, ease: REVEAL_EASE, scale: 1, stagger: 0.15, y: 0}
        )
      }

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {autoAlpha: 0, y: 40},
          {autoAlpha: 1, delay: 0.3, duration: REVEAL_DURATION, ease: REVEAL_EASE, y: 0}
        )
      }

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {autoAlpha: 0, y: 40},
          {autoAlpha: 1, delay: 0.5, duration: REVEAL_DURATION, ease: REVEAL_EASE, y: 0}
        )
      }
    })

    return () => {
      context.revert()
    }
  }, [])

  return (
    <header className="flex flex-col flex-none items-center justify-between w-full h-screen max-h-200 relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-8">
      <div ref={imagesRef} className="flex flex-row items-start relative w-full px-6 md:px-8 gap-4 min-h-0">
        <div className="flex relative items-start">
          <HeaderImage url="/png/header-1.png" />
        </div>
        <div className="flex flex-row relative p-0 w-fit ml-auto gap-4">
          <HeaderImage url="/png/header-4.png" />
          <HeaderImage className="hidden sm:block" url="/png/header-3.png" />
          <HeaderImage className="hidden min-[1200px]:block" url="/png/header-2.png" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap flex-none items-start md:items-center justify-between md:justify-center w-full h-min px-6 md:px-8 relative gap-6 md:gap-x-8 md:gap-y-6">
        <div ref={titleRef} className="relative flex flex-col justify-center outline-none h-auto w-auto min-w-0 shrink">
          <h1 className="font-playfair tracking-normal font-bold leading-[100%] text-[56px] md:text-[62px] lg:text-[104px] lg:leading-[0.9] uppercase text-heading">
            Blažejovi
          </h1>
        </div>
        <div ref={contentRef} className="flex flex-col basis-0 md:basis-75 lg:basis-90 max-w-100 md:ml-auto gap-4">
          <Eyebrow className="pt-2">Pozvání</Eyebrow>
          <SectionParagraph>
            S radostí vás zveme, abyste s námi sdíleli jeden z nejkrásnějších dnů našeho života – <strong>den naší svatby</strong>.
          </SectionParagraph>
        </div>
      </div>
    </header>
  )
}
