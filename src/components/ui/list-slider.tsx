'use client'

import gsap from 'gsap'
// @ts-ignore
import {Draggable} from 'gsap/Draggable'
import Image from 'next/image'
import {type Ref, useEffect, useRef} from 'react'

gsap.registerPlugin(Draggable)

const ListSliderItem = ({ref}: {ref?: Ref<HTMLLIElement>}) => (
  <li ref={ref} className="absolute top-0 h-full w-[calc(33.3333%-10.6667px)] transform-gpu will-change-[transform,opacity,visibility]">
    <div className="paper-texture bg-white h-full w-full opacity-100 flex flex-col items-center gap-2 p-0 relative overflow-hidden">
      <div className="flex flex-[1_0_0] flex-row items-center gap-0 w-full h-px p-[16px_16px_0px] relative overflow-hidden">
        <div className="relative overflow-hidden w-px h-full flex-[1_0_0]">
          <div className="absolute inset-0">
            <Image src="https://picsum.photos/id/1/800/1200" alt="place" fill className="object-cover" />
          </div>
        </div>
      </div>
      <div className="flex flex-none flex-row items-start place-content-[flex-start_space-between] w-full h-min p-[8px_16px_16px] relative overflow-hidden">
        <div className="flex flex-col justify-start outline-none whitespace-pre-wrap wrap-break-word break-normal flex-[1_0_0] w-px h-auto relative max-w-30">
          <p className="font-semibold text-black text-[20px] leading-[120%] uppercase">Jan &{'\n'}Simon</p>
        </div>
        <div className="flex flex-col flex-none items-end gap-1 w-min h-min p-0 relative overflow-hidden ml-auto">
          <div className="flex flex-col justify-end flex-none w-auto h-auto relative whitespace-pre">
            <p className="text-[12px] text-black text-right uppercase leading-[13.2px]">Červenec, 2024</p>
          </div>
          <div className="flex flex-col justify-end flex-none w-auto h-auto relative whitespace-pre">
            <p className="text-[12px] text-black text-right uppercase leading-[13.2px]">Lorem ipsum</p>
          </div>
          <div className="flex flex-col justify-end flex-none w-auto h-auto relative whitespace-pre">
            <p className="text-[12px] text-black text-right uppercase leading-[13.2px]">Praha</p>
          </div>
        </div>
      </div>
    </div>
  </li>
)

export const ListSlider = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  const wrapperRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    const items = itemRefs.current.filter(Boolean) as HTMLElement[]

    if (items.length === 0) {
      return
    }

    const gap = 16
    const itemWidth = items[0].offsetWidth
    const step = itemWidth + gap
    const totalWidth = items.length * step
    const wrapperWidth = wrapper.offsetWidth

    let offset = wrapperWidth / 2 - itemWidth / 2

    const updatePositions = (value: number) => {
      const center = wrapperWidth / 2

      items.forEach((item, i) => {
        const raw = i * step + value
        const x = ((((raw - center + totalWidth / 2) % totalWidth) + totalWidth) % totalWidth) - totalWidth / 2 + center
        const buffer = (window.innerWidth - wrapperWidth) / 2 + itemWidth
        const visible = x > -buffer && x < wrapperWidth + buffer - itemWidth
        const fullyVisible = x >= -buffer + itemWidth && x + itemWidth <= wrapperWidth + buffer - itemWidth
        const opacity = visible ? (fullyVisible ? 1 : 0.8) : 1

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

    const draggable = Draggable.create(proxy, {
      onDrag() {
        offset = this.x
        updatePositions(offset)
      },
      onDragEnd() {
        const snapTo = snapOffset(this.x)

        gsap.to(proxy, {
          duration: 0.4,
          ease: 'power2.out',
          onUpdate() {
            offset = gsap.getProperty(proxy, 'x') as number
            updatePositions(offset)
          },
          x: snapTo,
        })
      },
      trigger: wrapper,
      type: 'x',
    })

    return () => {
      draggable[0]?.kill()
      proxy.remove()
    }
  }, [])

  return (
    <div className="flex flex-col flex-none place-content-center items-center gap-12 w-full h-min p-0 relative overflow-hidden">
      <div
        ref={wrapperRef}
        className="aspect-[2.4] h-auto w-300 relative overflow-visible select-none cursor-grab active:cursor-grabbing"
      >
        <ul className="relative w-full h-full m-0 p-0 list-none">
          {data.map((_, index) => (
            <ListSliderItem
              key={index.toString()}
              ref={el => {
                itemRefs.current[index] = el
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
