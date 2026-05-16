'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useRef} from 'react'

import {plural, useDictionary} from '@/i18n'
import {isWeddingStarted, WEDDING_START_AT} from '@/utils'

import {SectionParagraph, SectionTitle} from './ui'

const formatNumber = (n: number) => String(n).padStart(2, '0')

const getTimeLeft = () => {
  const diff = WEDDING_START_AT.getTime() - Date.now()

  if (diff <= 0) {
    return {days: 0, hours: 0, minutes: 0, seconds: 0}
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return {days, hours, minutes, seconds}
}

const LockIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="text-heading"
  >
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

const Separator = () => (
  <div className="flex flex-col items-center self-start">
    <span className="font-playfair font-bold text-[28px] md:text-[40px] leading-[0.9] text-heading/30">:</span>
  </div>
)

const UNIT_KEYS = ['days', 'hours', 'minutes', 'seconds'] as const

export const PhotosLocked = () => {
  const router = useRouter()
  const {dictionary} = useDictionary()
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const tick = () => {
      if (isWeddingStarted()) {
        router.refresh()
        return true
      }

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

      return false
    }

    if (tick()) {
      return
    }

    const interval = setInterval(() => {
      if (tick()) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [dictionary, router])

  const initial = getTimeLeft()

  return (
    <section className="flex flex-col gap-10 items-center w-full max-w-150">
      <div className="flex flex-col gap-6 items-center text-center">
        <div className="w-16 h-16 rounded-full bg-heading/8 border border-border flex items-center justify-center">
          <LockIcon />
        </div>
        <SectionTitle eyebrow={dictionary.photos.locked.eyebrow} className="w-full items-center text-center">
          {dictionary.photos.locked.title}
        </SectionTitle>
        <SectionParagraph className="max-w-110 text-center">{dictionary.photos.locked.text}</SectionParagraph>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-body/60 text-[14px] uppercase tracking-[0.18em]">{dictionary.photos.locked.opensIn}</p>
        <div className="flex items-center gap-2 md:gap-2">
          {UNIT_KEYS.map((key, i) => {
            const unit = dictionary.weddingDate.units[key]
            return (
              <div key={key} className="contents">
                {i > 0 && <Separator />}
                <div className="flex flex-col items-center min-w-16 md:min-w-20">
                  <span
                    ref={el => {
                      valueRefs.current[i] = el
                    }}
                    className="font-mono font-bold text-[28px] md:text-[40px] leading-[0.9] text-heading tabular-nums"
                  >
                    {formatNumber(initial[key])}
                  </span>
                  <span
                    ref={el => {
                      labelRefs.current[i] = el
                    }}
                    className="font-mono text-[12px] md:text-[13px] uppercase tracking-wider text-body/60 mt-2"
                  >
                    {plural(initial[key], unit.one, unit.few, unit.many)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
