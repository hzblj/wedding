'use client'

import {useRef} from 'react'

import {useDictionary} from '@/i18n'
import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {SeatingArrangementTables, SectionParagraph, SectionTitle} from './ui'

export const SeatingArrangement = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tablesRef = useRef<HTMLDivElement>(null)
  const {dictionary} = useDictionary()

  useScrollReveal(sectionRef, [headerRef], {})
  useScrollReveal(sectionRef, [tablesRef], {delay: 0.2})

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-border"
    >
      <div ref={headerRef} className="flex flex-col gap-6">
        <SectionTitle eyebrow={dictionary.seating.eyebrow} className="w-full items-center text-center">
          {dictionary.seating.title}
        </SectionTitle>
      </div>
      <SeatingArrangementTables
        ref={tablesRef}
        main={['Darius Lebeda', 'Ligia Lebedová', 'Karin', 'Jan', 'Iva Konečná', 'Radim Konečný']}
        left={[
          {
            seats: [
              ['Marta Dänemarková', 'Dawid Lebeda'],
              ['Andrzej Dänemark', 'Barbara Firla'],
              ['Adam Dänemark', 'Hana Donociková'],
              ['Roman Dänemark', 'Vladimír Sedlák'],
              ['Nela Dänemarková', 'Małgorzata Franek'],
              ['Barbara Lebeda', 'Tomasz Franek'],
              ['Dorota Giemza', 'Edyta Giemzová'],
              ['Łukasz Giemza', 'Marcel Giemza'],
              ['Krystyna Ivanov', 'Janina Gaurová'],
              ['Magdalena Bubík', 'Vít Baranec'],
            ],
          },
        ]}
        right={[
          {
            seats: [
              ['Marek Buš', 'Miluše Teichmannová'],
              ['Kristýna Buš', 'Jiří Teichmann'],
              ['Lukáš Teichmann', 'Radim Teichmann'],
              ['Adéla Boczková', 'Miriam Teichmannová'],
              ['Šimon Rico', 'Jaroslav Maťas'],
              ['Kateryna Holovata', 'Ema Kmeťová'],
              ['Kateřina Faktorová', 'Tomáš Balej'],
              ['Jan Holínka', 'Tereza Balej'],
              ['Miroslav Honysch', 'Eva Rojíková'],
              ['Ondřej Valuštík', 'Vojtěch Bínek'],
              ['Petr Gavel', 'Šťěpan Peřina'],
              ['Vít Kanýza', ''],
            ],
          },
        ]}
      />
    </section>
  )
}
