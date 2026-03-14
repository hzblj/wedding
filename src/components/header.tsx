'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {useCallback, useEffect, useRef} from 'react'

import {cn} from '@/utils'

import {Button, Eyebrow, SectionParagraph} from './ui'

const REVEAL_DURATION = 0.8
const REVEAL_EASE = 'power2.out'

const HeaderImage = ({className = '', url}: {className?: string; url: string}) => (
  <div className={cn('bg-white h-52 sm:h-64 md:h-84 aspect-[200/306] p-2 paper-texture', className)}>
    <div className="relative h-full w-full bg-black/90">
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

const ICS_CONTENT = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Blazejovi//Wedding//CS',
  'BEGIN:VTIMEZONE',
  'TZID:Europe/Prague',
  'BEGIN:DAYLIGHT',
  'DTSTART:19700329T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0200',
  'TZNAME:CEST',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'DTSTART:19701025T030000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'TZOFFSETFROM:+0200',
  'TZOFFSETTO:+0100',
  'TZNAME:CET',
  'END:STANDARD',
  'END:VTIMEZONE',
  'BEGIN:VEVENT',
  'DTSTART;TZID=Europe/Prague:20260704T110000',
  'DTEND;TZID=Europe/Prague:20260705T000000',
  'SUMMARY:Svatba - Blažejovi',
  'LOCATION:Resort Nová Polana\\, Dolní Lomná 126\\, 739 91 Dolní Lomná',
  'GEO:49.551680;18.687632',
  'URL:https://wedding.janblazej.dev',
  'DESCRIPTION:Těšíme se na vás! Přijďte oslavit náš velký den plný lásky\\,',
  ' smíchu a nezapomenutelných okamžiků. Bude to den\\, na který budeme',
  ' vzpomínat celý život — a chceme ho prožít právě s vámi.',
  'STATUS:CONFIRMED',
  'BEGIN:VALARM',
  'TRIGGER:-P7D',
  'ACTION:DISPLAY',
  'DESCRIPTION:Za týden je svatba Karin & Jana!',
  'END:VALARM',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n')

export const Header = () => {
  const imagesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleAddToCalendar = useCallback(() => {
    const blob = new Blob([ICS_CONTENT], {type: 'text/calendar;charset=utf-8'})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'svatba-blazejovi.ics'
    link.click()
    URL.revokeObjectURL(url)
  }, [])

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
    <header className="flex flex-col flex-none items-center justify-between w-full h-screen md:max-h-220 max-h-200 relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-8">
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
            S radostí vás zveme, abyste s námi sdíleli jeden z nejkrásnějších dnů našeho života – den naší svatby.
          </SectionParagraph>
          <p className="text-[16px] leading-[150%] tracking-normal text-body/60 text-left">
            4. července 2026, Resort Nová Polana, Dolní Lomná
          </p>
          <div className="pt-2">
            <Button onClick={handleAddToCalendar}>
              <Image src="/svg/calendar-plus.svg" alt="calendar" width={16} height={16} className="w-4 h-4 invert" />
              Přidat do kalendáře
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
