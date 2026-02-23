'use client'

import {useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {SeatingArrangementTables, SectionParagraph, SectionTitle} from './ui'

export const SeatingArrangement = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tablesRef = useRef<HTMLDivElement>(null)

  useScrollReveal(sectionRef, [headerRef], {})
  useScrollReveal(sectionRef, [tablesRef], {delay: 0.2})

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-white/10"
    >
      <div ref={headerRef} className="flex flex-col gap-6">
        <SectionTitle eyebrow="Kde sedím" className="w-full items-center text-center">
          Zasedací pořádek
        </SectionTitle>
      </div>
      <SeatingArrangementTables
        ref={tablesRef}
        main={['Darius Lebeda', 'Ligia Lebedová', 'Karin Blažej', 'Jan Blažej', 'Iva Konečná', 'Radim Konečný']}
        left={[
          {
            head: 'Marta Dänemarková',
            seats: [
              ['Andrzej Dänemark', 'Dawid Lebeda'],
              ['Adam Dänemark', 'Nela Dänemarková'],
              ['Roman Dänemark', 'Radka Dänemarková'],
              ['Dorota Giemza', 'Barbara Firla'],
              ['Łukasz Giemza', 'Hana Donociková'],
              ['Edyta Giemzová', 'Vladimír Sedlák'],
              ['Marcel Giemza', 'Magdalena Bubík'],
              ['Krystyna Ivanov', 'Janina Gaurová'],
            ],
          },
        ]}
        right={[
          {
            head: 'Miluše Teichmanová',
            seats: [
              ['Marek Buš', 'Jiří Teichman'],
              ['Kristýna Buš', 'Radim Teichman'],
              ['Lukáš Teichman', 'Miriam Teichmanová'],
              ['holka', 'Tomáš Balej'],
              ['Šimon Rico', 'Tereza Balejová'],
              ['Kateryna Holotova', 'Eva Rojíková'],
              ['Jaroslav Maťas', 'Vojta Bínek'],
              ['Ema Kmeťová', 'Klára Honysch'],
              ['Kateřina Faktorová', 'Miroslav Honysch'],
              ['Jan Holínka', 'Ondřej Valuštík'],
              ['Foto Pavel', 'DJ Štěpa'],
              ['Kamera Vít', ''],
            ],
          },
        ]}
      />
    </section>
  )
}
