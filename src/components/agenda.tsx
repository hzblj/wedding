'use client'

import {useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {Section, SectionParagraph, SectionTitle, Timeline} from './ui'

export const Agenda = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const timelineTriggerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useScrollReveal(sectionRef, [leftRef], {})
  useScrollReveal(timelineTriggerRef, [timelineRef], {delay: 0.2})

  return (
    <Section
      ref={sectionRef}
      id={id}
      left={
        <div ref={leftRef} className="flex flex-col gap-6 w-full">
          <SectionTitle eyebrow="Plán">Svatební den</SectionTitle>
          <div>
            <SectionParagraph className="max-w-130">
              Vedle najdete orientační plán celého dne. <br /> Berte ho prosím s&nbsp;rezervou, čas může plynout trochu
              jinak ;) <br /> <strong>Nejdůležitější pro nás je, abyste si den užili spolu s&nbsp;námi.</strong> <br />{' '}
              Pokud se něco posune o&nbsp;pár minut (nebo i&nbsp;víc), nic se neděje. <br /> Hlavní je pohoda, dobrá
              nálada a&nbsp;společně strávený čas.
            </SectionParagraph>
            <SectionParagraph className="max-w-130">
              <br /> Prosíme, dorazte nejpozději v <strong>11:50</strong> , abychom mohli začít obřad ve&nbsp;12:00.
              Pokud přijedete dříve, bude pro vás připraveno malé občerstvení.
            </SectionParagraph>
          </div>
        </div>
      }
      right={
        <div ref={timelineRef} className="flex flex-col w-full items-center justify-center">
          <Timeline
            items={[
              {from: '11:00', name: 'Příjezd hostů', to: '11:50'},
              {from: '12:00', name: 'Svatební obřad', to: '12:30'},
              {from: '12:30', name: 'Gratulace & společné foto', to: '13:00'},
              {from: '13:00', name: 'Svatební oběd', to: '14:00'},
              {from: '14:00', name: 'Ubytování hostů'},
              {from: '14:30', name: 'Focení s novomanželi', to: '15:00'},
              {from: '15:00', name: 'Krájení dortu, Kafe, Hry', to: '16:O0'},
              {from: '16:00', name: 'Volná zábava', to: '17:00'},
              {from: '17:00', name: 'Házení kytice, Hry, Volná zábava', to: '18:00'},
              {from: '18:00', name: 'Večerní raut'},
              {from: '19:00', name: 'První tanec & Párty', to: '24:00'},
              {from: '24:00', name: 'Afterparty pro vytrvalé', to: '2:00'},
            ]}
          />
        </div>
      }
    />
  )
}
