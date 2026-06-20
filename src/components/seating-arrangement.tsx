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
            head: 'Marta Dänemarková',
            seats: [
              ['Andrzej Dänemark', 'Dawid Lebeda'],
              ['Adam Dänemark', 'Barbara Firla'],
              ['Roman Dänemark', 'Hana Donociková'],
              ['Nela Dänemarková', 'Vladimír Sedlák'],
              ['Barbara Lebeda', 'Małgorzata Franek'],
              ['Dorota Giemza', 'Tomasz Franek'],
              ['Łukasz Giemza', 'Edyta Giemzová'],
              ['Krystyna Ivanov', 'Marcel Giemza'],
              ['Magdalena Bubík', 'Janina Gaurová'],
              ['', 'Vít Baranec'],
            ],
          },
        ]}
        right={[
          {
            head: 'Miluše Teichmannová',
            seats: [
              ['Marek Buš', 'Jiří Teichmann'],
              ['Kristýna Buš', 'Radim Teichmann'],
              ['Lukáš Teichmann', 'Miriam Teichmannová'],
              ['Adéla Boczková', 'Jaroslav Maťas'],
              ['Šimon Rico', 'Ema Kmeťová'],
              ['Kateryna Holovata', 'Tomáš Balej'],
              ['Kateřina Faktorová', 'Tereza Balej'],
              ['Jan Holínka', 'Eva Rojíková'],
              ['Miroslav Honysch', 'Vojtěch Bínek'],
              ['Ondřej Valuštík', 'Šťěpan Peřina'],
              ['Petr Gavel', ''],
              ['Vít Kanýza', ''],
            ],
          },
        ]}
      />
    </section>
  )
}
