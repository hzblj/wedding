'use client'

import gsap from 'gsap'
import {useCallback, useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {ListSlider, type ListSliderItem, SectionParagraph, SectionTitle} from './ui'

const galleryItems: ListSliderItem[] = [
  {details: ['červenec, 2023', 'Praha'], image: '/png/gallery-2.png', title: 'Kari & Mam'},
  {details: ['září, 2023', 'Český Těšín'], image: '/png/gallery-3.png', title: 'Kari & Daw'},
  {details: ['březen, 2022', 'Tallinn'], image: '/png/gallery-21.png', title: 'Mama & Tata'},
  {details: ['červenec, 2022', 'Ostrava'], image: '/png/gallery-4.png', title: 'Hania & Vlado'},
  {details: ['květen, 2022', 'Helsinky'], image: '/png/gallery-5.png', title: 'Kari & BaŚ'},
  {details: ['prosinec, 2021', 'Češký Těšín'], image: '/png/gallery-6.png', title: 'Kari & Meguszi'},
  {details: ['červenec, 2025', 'Krmelín'], image: '/png/gallery-7.png', title: 'Kiki & Marek'},
  {details: ['říjen, 2015', 'Ostrava'], image: '/png/gallery-8.png', title: 'Jan & Rodina'},
  {details: ['srpen, 2022', 'Finkenberg'], image: '/png/gallery-9.png', title: 'Jan & Marek'},
  {details: ['říjen, 2022', 'Oldřichovice'], image: '/png/gallery-10.png', title: 'Janka & Doris'},
  {details: ['únor, 2026', 'Praha'], image: '/png/gallery-11.png', title: 'Kari & Magdzia'},
  {details: ['červenec, 2024', 'Ostrý'], image: '/png/gallery-13.png', title: 'Kari & Krysia'},
  {details: ['srpen, 2025', 'Praha'], image: '/png/gallery-14.png', title: 'Jan & Šimon'},
  {details: ['srpen, 2025', 'Praha'], image: '/png/gallery-15.png', title: 'Kari & Terik'},
  {details: ['březen, 2012', 'Český Těšín'], image: '/png/gallery-12.png', title: 'Kari & Edzia'},
  {details: ['srpen, 2023', 'Praha'], image: '/png/gallery-16.png', title: 'Eva & Rodiče'},
  {details: ['únor, 2025', 'Paříž'], image: '/png/gallery-17.png', title: 'Jan & Jaro'},
  {details: ['říjen, 2025', 'Praha'], image: '/png/gallery-18.png', title: 'Kari & Katya'},
  {details: ['únor, 2025', 'Paříž'], image: '/png/gallery-19.png', title: 'Lapz & Boys'},
  {details: ['srpen, 2025', 'Praha'], image: '/png/gallery-20.png', title: 'Jan & Miro'},
]

export const Gallery = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useScrollReveal(sectionRef, [headerRef], {})

  const handleSliderReady = useCallback(() => {
    const el = sliderRef.current
    if (!el) {
      return
    }
    gsap.fromTo(el, {scale: 0.98, y: 20}, {duration: 0.6, ease: 'power2.out', scale: 1, y: 0})
  }, [])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-border"
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
        <ListSlider items={galleryItems} autoSlide={0} onReady={handleSliderReady} />
      </div>
    </section>
  )
}
