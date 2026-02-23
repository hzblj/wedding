'use client'

import {useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {ListSlider, type ListSliderItem, SectionParagraph, SectionTitle} from './ui'

const galleryItems: ListSliderItem[] = [
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/1/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/2/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/3/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/4/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/5/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/6/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/7/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/8/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/9/800/1200',
    title: 'Jan &\nSimon',
  },
  {
    details: ['Červenec, 2024', 'Lorem ipsum', 'Praha'],
    image: 'https://picsum.photos/id/10/800/1200',
    title: 'Jan &\nSimon',
  },
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
