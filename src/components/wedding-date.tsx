'use client'

import Image from 'next/image'
import {useCallback, useEffect, useMemo, useRef} from 'react'

import {useDictionary, plural} from '@/i18n'
import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {Button, SectionTitle} from './ui'

const WEDDING_DATE = new Date('2026-07-04T10:00:00+02:00')

const formatNumber = (n: number) => String(n).padStart(2, '0')

const getTimeLeft = () => {
  const now = new Date()
  const diff = WEDDING_DATE.getTime() - now.getTime()

  if (diff <= 0) {
    return {days: 0, hours: 0, minutes: 0, seconds: 0}
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return {days, hours, minutes, seconds}
}

const Separator = () => (
  <div className="flex flex-col items-center self-start">
    <span className="font-playfair font-bold text-[36px] md:text-[64px] lg:text-[80px] leading-[0.9] text-heading/30">
      :
    </span>
  </div>
)

const UNIT_KEYS = ['days', 'hours', 'minutes', 'seconds'] as const

const Countdown = () => {
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const {dictionary} = useDictionary()

  useEffect(() => {
    const update = () => {
      const time = getTimeLeft()
      UNIT_KEYS.forEach((key, i) => {
        const val = time[key]
        const unit = dictionary.weddingDate.units[key]
        const valueEl = valueRefs.current[i]
        const labelEl = labelRefs.current[i]
        if (valueEl) {
          valueEl.textContent = formatNumber(val)
        }
        if (labelEl) {
          labelEl.textContent = plural(val, unit.one, unit.few, unit.many)
        }
      })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [dictionary])

  const initial = getTimeLeft()

  return (
    <>
      {UNIT_KEYS.map((key, i) => {
        const unit = dictionary.weddingDate.units[key]

        return (
          <div key={key} className="contents">
            {i > 0 && <Separator />}
            <div className="flex flex-col items-center">
              <span
                ref={el => {
                  valueRefs.current[i] = el
                }}
                className="font-mono font-bold text-[36px] md:text-[64px] lg:text-[80px] leading-[0.9] text-heading"
              >
                {formatNumber(initial[key])}
              </span>
              <span
                ref={el => {
                  labelRefs.current[i] = el
                }}
                className="text-[14px] md:text-[16px] uppercase tracking-wider text-body/60 mt-4"
              >
                {plural(initial[key], unit.one, unit.few, unit.many)}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}

export const WeddingDate = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const {dictionary} = useDictionary()

  useScrollReveal(sectionRef, [headerRef], {})
  useScrollReveal(sectionRef, [countdownRef, buttonRef], {delay: 0.2, stagger: true})

  const icsContent = useMemo(() => {
    const ics = dictionary.weddingDate.ics
    return [
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
      `SUMMARY:${ics.summary}`,
      `LOCATION:${ics.location}`,
      'GEO:49.551680;18.687632',
      'URL:https://wedding.janblazej.dev',
      `DESCRIPTION:${ics.description}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P7D',
      'ACTION:DISPLAY',
      `DESCRIPTION:${ics.alarm}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
  }, [dictionary])

  const handleAddToCalendar = useCallback(() => {
    const blob = new Blob([icsContent], {type: 'text/calendar;charset=utf-8'})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = dictionary.weddingDate.ics.filename
    link.click()
    URL.revokeObjectURL(url)
  }, [icsContent, dictionary])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none items-center gap-20 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-border"
    >
      <div ref={headerRef} className="flex flex-col gap-2 items-center text-center">
        <SectionTitle eyebrow={dictionary.weddingDate.eyebrow} className="items-center text-center">
          {dictionary.weddingDate.date}
        </SectionTitle>
      </div>
      <div ref={countdownRef} className="flex items-center gap-2 md:gap-6 lg:gap-8">
        <Countdown />
      </div>
      <div ref={buttonRef}>
        <Button onClick={handleAddToCalendar}>
          <Image src="/svg/calendar-plus.svg" alt="calendar" width={16} height={16} className="w-4 h-4 invert" />
          {dictionary.weddingDate.addToCalendar}
        </Button>
      </div>
    </section>
  )
}
