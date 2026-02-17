'use client'

import gsap from 'gsap'
// @ts-ignore
import {Draggable} from 'gsap/Draggable'
import Image from 'next/image'
import {type Ref, useCallback, useEffect, useRef} from 'react'
import {cn} from '@/utils'

gsap.registerPlugin(Draggable)

type SliderArrowProps = {
  direction: 'left' | 'right'
  onClick: () => void
}

const SliderArrow = ({direction, onClick}: SliderArrowProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'min-[800px]:hidden absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors cursor-pointer',
      direction === 'left' ? 'left-2' : 'right-2'
    )}
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
  >
    <Image src={`/svg/arrow-${direction}.svg`} alt="" width={20} height={20} className="w-5 h-5 invert" />
  </button>
)

export type ListSliderItem = {
  image: string
  title: string
  details: string[]
}

const ListSliderCard = ({ref, item}: {ref?: Ref<HTMLLIElement>; item: ListSliderItem}) => (
  <li
    ref={ref}
    className="absolute top-0 h-full w-full min-[800px]:w-[calc(33.3333%-10.6667px)] transform-gpu will-change-[transform,opacity,visibility]"
  >
    <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-hidden">
      <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[16px_16px_0px] relative overflow-hidden">
        <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
          <div className="absolute inset-0">
            <Image src={item.image} alt={item.title} fill className="object-cover" />
          </div>
        </div>
      </div>
      <div className="flex flex-none flex-row items-start place-content-[flex-start_space-between] w-full h-min p-[8px_16px_16px] relative overflow-hidden">
        <div className="flex flex-col justify-start outline-none whitespace-pre-wrap wrap-break-word break-normal flex-[1_0_0] w-px h-auto relative max-w-30">
          <p className="font-semibold text-black text-[20px] leading-[120%] uppercase">{item.title}</p>
        </div>
        <div className="flex flex-col flex-none items-end gap-1 w-min h-min p-0 relative overflow-hidden ml-auto">
          {item.details.map(detail => (
            <div key={detail} className="flex flex-col justify-end flex-none w-auto h-auto relative whitespace-pre">
              <p className="text-[12px] text-black text-right uppercase leading-[13.2px]">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </li>
)

export const ListSlider = ({items, autoSlide}: {items: ListSliderItem[]; autoSlide?: number}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const navigateRef = useRef<(direction: -1 | 1) => void>(null)

  useEffect(() => {
    const container = containerRef.current
    const wrapper = wrapperRef.current
    if (!container || !wrapper) {
      return
    }

    const elements = itemRefs.current.filter(Boolean) as HTMLElement[]

    if (elements.length === 0) {
      return
    }

    const gap = 16
    const itemWidth = elements[0].offsetWidth
    const step = itemWidth + gap
    const totalWidth = elements.length * step
    const wrapperWidth = wrapper.offsetWidth

    let offset = wrapperWidth / 2 - itemWidth / 2

    const updatePositions = (value: number) => {
      const center = wrapperWidth / 2

      const clipWidth = container.offsetWidth
      const overflow = Math.max(0, (clipWidth - wrapperWidth) / 2)
      const viewLeft = -overflow
      const viewRight = wrapperWidth + overflow
      const fadeZone = itemWidth

      elements.forEach((item, i) => {
        const raw = i * step + value
        const x = ((((raw - center + totalWidth / 2) % totalWidth) + totalWidth) % totalWidth) - totalWidth / 2 + center
        const itemRight = x + itemWidth
        const visible = itemRight > viewLeft && x < viewRight

        const distLeft = x - viewLeft
        const distRight = viewRight - itemRight
        const edgeDist = Math.min(distLeft, distRight)
        const opacity = visible
          ? edgeDist >= 0
            ? 1
            : gsap.utils.clamp(0.4, 1, gsap.utils.mapRange(-fadeZone, 0, 0.4, 1, edgeDist))
          : 0

        gsap.set(item, {opacity, visibility: visible ? 'visible' : 'hidden', x})
      })
    }
    const snapOffset = (value: number) => {
      const base = wrapperWidth / 2 - itemWidth / 2
      return base + Math.round((value - base) / step) * step
    }

    updatePositions(offset)

    const proxy = document.createElement('div')
    gsap.set(proxy, {x: offset})

    const smoothEase = gsap.parseEase('M0,0 C0.22,0.61 0.36,1 1,1')

    const animateTo = (target: number) => {
      const distance = Math.abs(target - offset)
      const duration = gsap.utils.clamp(0.4, 1, distance / 600)

      gsap.to(proxy, {
        duration,
        ease: smoothEase,
        onUpdate() {
          offset = gsap.getProperty(proxy, 'x') as number
          updatePositions(offset)
        },
        x: target,
      })
    }

    navigateRef.current = (direction: -1 | 1) => {
      const snapTo = snapOffset(offset) - direction * step
      gsap.set(proxy, {x: offset})
      animateTo(snapTo)
    }

    let autoInterval: ReturnType<typeof setInterval> | null = null

    const startAutoSlide = () => {
      if (!autoSlide) {
        return
      }

      autoInterval = setInterval(() => {
        navigateRef.current?.(1)
      }, autoSlide)
    }

    const stopAutoSlide = () => {
      if (autoInterval) {
        clearInterval(autoInterval)
        autoInterval = null
      }
    }

    const draggable = Draggable.create(proxy, {
      onDrag() {
        offset = this.x
        updatePositions(offset)
      },
      onDragEnd() {
        animateTo(snapOffset(this.x))
        startAutoSlide()
      },
      onDragStart() {
        stopAutoSlide()
      },
      trigger: wrapper,
      type: 'x',
    })

    startAutoSlide()

    return () => {
      stopAutoSlide()
      draggable[0]?.kill()
      proxy.remove()
    }
  }, [autoSlide])

  const navigate = useCallback((direction: -1 | 1) => {
    navigateRef.current?.(direction)
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-none place-content-center items-center gap-8 w-full h-min p-0 relative overflow-hidden"
    >
      <div
        ref={wrapperRef}
        className="aspect-[0.75] min-[800px]:aspect-[2.4] h-auto w-full min-[800px]:w-300 relative overflow-visible select-none cursor-grab active:cursor-grabbing"
      >
        <ul className="relative w-full h-full m-0 p-0 list-none">
          {items.map((item, index) => (
            <ListSliderCard
              key={index.toString()}
              item={item}
              ref={el => {
                itemRefs.current[index] = el
              }}
            />
          ))}
        </ul>
        <SliderArrow direction="left" onClick={() => navigate(-1)} />
        <SliderArrow direction="right" onClick={() => navigate(1)} />
      </div>
    </div>
  )
}
