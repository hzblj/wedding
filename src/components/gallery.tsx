'use client'

import {useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {ListSlider, type ListSliderItem, SectionParagraph, SectionTitle} from './ui'

const galleryItems: ListSliderItem[] = [
  {details: [], image: '/png/gallery-1.png', title: ''},
  {details: [], image: '/png/gallery-2.png', title: ''},
  {details: [], image: '/png/gallery-3.png', title: ''},
  {details: [], image: '/png/gallery-4.png', title: ''},
  {details: [], image: '/png/gallery-5.png', title: ''},
  {details: [], image: '/png/gallery-6.png', title: ''},
  {details: [], image: '/png/gallery-7.png', title: ''},
  {details: [], image: '/png/gallery-8.png', title: ''},
  {details: [], image: '/png/gallery-9.png', title: ''},
  {details: [], image: '/png/gallery-10.png', title: ''},
  {details: [], image: '/png/gallery-11.png', title: ''},
  {details: [], image: '/png/gallery-12.png', title: ''},
  {details: [], image: '/png/gallery-13.png', title: ''},
  {details: [], image: '/png/gallery-14.png', title: ''},
  {details: [], image: '/png/gallery-15.png', title: ''},
  {details: [], image: '/png/gallery-16.png', title: ''},
  {details: [], image: '/png/gallery-17.png', title: ''},
  {details: [], image: '/png/gallery-18.png', title: ''},
  {details: [], image: '/png/gallery-19.png', title: ''},
  {details: [], image: '/png/gallery-20.png', title: ''},
]

export const Gallery = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useScrollReveal(sectionRef, [headerRef], {})
  useScrollReveal(sectionRef, [sliderRef], {delay: 0.2})

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-white/10"
    >
      <div ref={headerRef} className="flex flex-col gap-6">
        <SectionTitle eyebrow="KDO" className="w-full items-center text-center">
          RODINA A PŘÁTELÉ
        </SectionTitle>
        <SectionParagraph className="max-w-130 text-center">
          <strong>Jsme tím, kým jsme, i díky vám.</strong> <br /> Každý z vás je součástí našeho příběhu. Vaše podpora,
          přátelství a&nbsp;společně prožitý čas nás formovaly víc, než si možná uvědomujeme. Bez vás by naše cesta
          nebyla stejná. O to víc si vážíme, že tento den můžeme prožít právě s vámi.
        </SectionParagraph>
      </div>
      <div ref={sliderRef} className="w-full">
        <ListSlider items={galleryItems} autoSlide={5000} />
      </div>
    </section>
  )
}
