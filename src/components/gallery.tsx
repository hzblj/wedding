'use client'

import gsap from 'gsap'
import {useCallback, useMemo, useRef} from 'react'

import {useDictionary} from '@/i18n'
import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {ListSlider, type ListSliderItem, SectionParagraph, SectionTitle} from './ui'

type GalleryItemData = {
  image: string
  title: string
  month: number
  year: number
  city: string
}

const GALLERY_DATA: GalleryItemData[] = [
  {city: 'Praha', image: '/png/gallery-2.png', month: 7, title: 'Kari & Mam', year: 2023},
  {city: 'Český Těšín', image: '/png/gallery-3.png', month: 9, title: 'Kari & Daw', year: 2023},
  {city: 'Tallinn', image: '/png/gallery-21.png', month: 3, title: 'Mama & Tata', year: 2022},
  {city: 'Ostrava', image: '/png/gallery-4.png', month: 7, title: 'Hania & Vlado', year: 2022},
  {city: 'Helsinky', image: '/png/gallery-5.png', month: 5, title: 'Kari & BaŚ', year: 2022},
  {city: 'Český Těšín', image: '/png/gallery-6.png', month: 12, title: 'Kari & Meguszi', year: 2021},
  {city: 'Krmelín', image: '/png/gallery-7.png', month: 7, title: 'Kiki & Marek', year: 2025},
  {city: 'Ostrava', image: '/png/gallery-8.png', month: 10, title: 'Jan & Rodina', year: 2015},
  {city: 'Finkenberg', image: '/png/gallery-9.png', month: 8, title: 'Jan & Marek', year: 2022},
  {city: 'Oldřichovice', image: '/png/gallery-10.png', month: 10, title: 'Janka & Doris', year: 2022},
  {city: 'Praha', image: '/png/gallery-11.png', month: 2, title: 'Kari & Magdzia', year: 2026},
  {city: 'Ostrý', image: '/png/gallery-13.png', month: 7, title: 'Kari & Krysia', year: 2024},
  {city: 'Praha', image: '/png/gallery-14.png', month: 8, title: 'Jan & Šimon', year: 2025},
  {city: 'Praha', image: '/png/gallery-15.png', month: 8, title: 'Kari & Terik', year: 2025},
  {city: 'Český Těšín', image: '/png/gallery-12.png', month: 3, title: 'Kari & Edzia', year: 2012},
  {city: 'Praha', image: '/png/gallery-16.png', month: 8, title: 'Eva & Rodiče', year: 2023},
  {city: 'Paříž', image: '/png/gallery-17.png', month: 2, title: 'Jan & Jaro', year: 2025},
  {city: 'Praha', image: '/png/gallery-18.png', month: 10, title: 'Kari & Katya', year: 2025},
  {city: 'Paříž', image: '/png/gallery-19.png', month: 2, title: 'Lapz & Boys', year: 2025},
  {city: 'Praha', image: '/png/gallery-20.png', month: 8, title: 'Jan & Miro', year: 2025},
]

export const Gallery = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const {dictionary} = useDictionary()

  useScrollReveal(sectionRef, [headerRef], {start: 'top 70%'})

  const handleSliderReady = useCallback(() => {
    const el = sliderRef.current
    if (!el) {
      return
    }
    gsap.fromTo(el, {scale: 0.98, y: 20}, {duration: 0.6, ease: 'power2.out', scale: 1, y: 0})
  }, [])

  const galleryItems: ListSliderItem[] = useMemo(
    () =>
      GALLERY_DATA.map(item => {
        const monthName = dictionary.gallery.months[String(item.month) as keyof typeof dictionary.gallery.months]
        return {
          details: [`${monthName}, ${item.year}`, item.city],
          image: item.image,
          title: item.title,
        }
      }),
    [dictionary]
  )

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-border"
    >
      <div ref={headerRef} className="flex flex-col gap-6">
        <SectionTitle eyebrow={dictionary.gallery.eyebrow} className="w-full items-center text-center">
          {dictionary.gallery.title}
        </SectionTitle>
        <SectionParagraph className="max-w-130 text-center">
          {dictionary.gallery.text}
        </SectionParagraph>
      </div>
      <div ref={sliderRef} className="w-full">
        <ListSlider items={galleryItems} autoSlide={3000} onReady={handleSliderReady} />
      </div>
    </section>
  )
}
