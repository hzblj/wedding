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
    <section ref={sectionRef} id={id} className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-white/10">
      <div ref={headerRef} className="flex flex-col gap-6">
        <SectionTitle eyebrow="Where memory lives" className="w-full items-center text-center">
          Gallery
        </SectionTitle>
        <SectionParagraph className="max-w-130 text-center">
          Lorem ipsum dolor sit amet, consectetur <strong>adipiscing</strong> elit. Donec suscipit auctor dui, sed
          efficitur ligula. Donec a nunc eget nisl convallis commodo. Donec ut nisi sed enim efficitur efficitur.
        </SectionParagraph>
      </div>
      <div ref={sliderRef} className="w-full">
        <ListSlider items={galleryItems} autoSlide={5000} />
      </div>
    </section>
  )
}
