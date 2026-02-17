import Image from 'next/image'

import {Accordion, Section, SectionTitle} from './ui'

const PlaceImage = () => (
  <div className="flex-1 w-full md:w-px max-w-110 aspect-[0.90] max-h-150 relative">
    <div className="paper-texture bg-white h-full max-h-full max-w-full w-full p-[16px_16px_64px]">
      <div className="z-1 flex-none absolute inset-[16px_16px_64px] overflow-hidden">
        <Image src="https://picsum.photos/id/1/800/1200" alt="place" fill className="object-cover" />
      </div>
    </div>
  </div>
)

export const FAQ = () => (
  <Section
    left={<PlaceImage />}
    right={
      <>
        <SectionTitle eyebrow="Need help">FAQ</SectionTitle>
        <Accordion
          items={[
            {
              content:
                'Společenský oděv. Pánové oblek, dámy šaty nebo elegantní kostýmek. Vyvarujte se prosím bílé barvy.',
              title: 'Jaký je dress code?',
            },
            {
              content:
                'Ano, děti jsou vítány. Prosíme o potvrzení jejich účasti při RSVP, ať můžeme připravit dostatek míst.',
              title: 'Mohu přijít s dětmi?',
            },
            {
              content: 'Parkování je k dispozici přímo u místa konání. Kapacita je dostatečná pro všechny hosty.',
              title: 'Kde mohu zaparkovat?',
            },
            {
              content:
                'Ano, v blízkosti místa konání je několik hotelů a penzionů. Doporučení zašleme společně s pozvánkou.',
              title: 'Bude zajištěno ubytování?',
            },
            {
              content:
                'Pokud nám chcete udělat radost, budeme vděční za příspěvek na svatební cestu. Více informací na místě.',
              title: 'Mohu přispět na svatební cestu?',
            },
          ]}
        />
      </>
    }
  />
)
