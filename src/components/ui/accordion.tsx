'use client'

import gsap from 'gsap'
import {type FC, type ReactNode, useCallback, useEffect, useRef, useState} from 'react'

import {cn} from '@/utils'

export type AccordionItem = {
  title: string
  content: ReactNode
}

export type AccordionProps = {
  items: AccordionItem[]
  className?: string
}

const INTERVAL = 10000

const AccordionRow: FC<{
  item: AccordionItem
  isOpen: boolean
  index: number
  cycle: number
  onToggle: () => void
}> = ({item, isOpen, onToggle, index}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) {
      return
    }
    const inner = content.firstElementChild as HTMLElement | null
    if (!inner) {
      return
    }

    gsap.killTweensOf(content)
    gsap.killTweensOf(inner)

    const openEase = 'M0,0 C0.05,0.7 0.1,1 1,1'
    const closeEase = 'M0,0 C0.5,0 0.7,0.4 1,1'

    if (isOpen) {
      gsap.set(content, {height: 'auto', visibility: 'visible'})
      const h = content.offsetHeight
      gsap.fromTo(
        content,
        {height: 0},
        {
          duration: 0.5,
          ease: openEase,
          height: h,
          onComplete: () => {
            gsap.set(content, {height: 'auto'})
          },
        }
      )
      gsap.fromTo(inner, {opacity: 0, y: -8}, {delay: 0.15, duration: 0.35, ease: 'power2.out', opacity: 1, y: 0})
    } else {
      gsap.to(inner, {duration: 0.2, ease: 'power2.in', opacity: 0, y: -4})
      gsap.to(content, {
        delay: 0.05,
        duration: 0.4,
        ease: closeEase,
        height: 0,
        onComplete: () => {
          gsap.set(content, {visibility: 'hidden'})
        },
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (tweenRef.current) {
      tweenRef.current.kill()
      tweenRef.current = null
    }

    const bar = progressRef.current

    if (!bar) {
      return
    }

    if (isOpen) {
      gsap.set(bar, {scaleX: 0})
      tweenRef.current = gsap.to(bar, {duration: INTERVAL / 1000, ease: 'none', scaleX: 1})
    } else {
      gsap.to(bar, {
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(bar, {opacity: 1, scaleX: 0})
        },
        opacity: 0,
      })
    }
  }, [isOpen])

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'group flex w-full items-center justify-between gap-4 py-5 text-left border-b-2 border-solid border-white/10',
            isOpen ? 'cursor-default' : 'cursor-pointer'
          )}
        >
          <div className="flex flex-row items-center gap-3">
            <span
              className={cn(
                'text-[14px] leading-[120%] font-semibold transition-colors duration-300 ease-in-out',
                isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/60'
              )}
            >
              (0{index + 1})
            </span>
            <span
              className={cn(
                'text-[16px] leading-[120%] italic font-semibold transition-colors duration-300 ease-in-out',
                isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/60'
              )}
            >
              {item.title}
            </span>
          </div>
        </button>
        <div ref={progressRef} className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-left scale-x-0 transform-gpu" />
      </div>
      <div ref={contentRef} className="overflow-hidden transform-gpu" style={{height: 0, visibility: 'hidden'}}>
        <div className="pt-3 pb-5 pl-8 text-[14px] leading-[170%] text-white/80">{item.content}</div>
      </div>
    </div>
  )
}

export const Accordion: FC<AccordionProps> = ({items, className}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [cycle, setCycle] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval>>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setOpenIndex(prev => ((prev ?? -1) + 1) % items.length)
      setCycle(cycle => cycle + 1)
    }, INTERVAL)
  }, [items.length])

  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [startTimer])

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndex(index)
      setCycle(cycle => cycle + 1)
      startTimer()
    },
    [startTimer]
  )

  return (
    <div className={cn('max-w-150', className)}>
      {items.map((item, index) => (
        <AccordionRow
          key={index.toString()}
          item={item}
          index={index}
          cycle={cycle}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  )
}
