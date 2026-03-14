'use client'

import Image from 'next/image'
import {useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {Accordion, Section, SectionTitle} from './ui'

const faq = [
  {
    content:
      'Prosíme hosty o příjezd mezi 11:00–11:30, aby mohl obřad začít včas ve 12:00. Bude pro Vás nachystáno občerstvení.',
    title: 'V kolik mají hosté dorazit?',
  },
  {
    content: 'Dress code je formální. Pánové oblek, dámy šaty nebo elegantní kostýmek. Barvy nejsou omezeny.',
    title: 'Jaký je dress code?',
  },
  {
    content: 'Ano, obřad proběhne venku. Doporučujeme proto zvolit pohodlnou obuv vhodnou na venkovní prostředí.',
    title: 'Bude obřad venku?',
  },
  {
    content:
      'Během obřadu prosíme o odložení telefonů a fotoaparátů. O fotografie se postará náš fotograf – budeme rádi, když si tento okamžik užijeme společně.',
    title: 'Můžeme během obřadu fotit?',
  },
  {
    content: 'Parkování je k dispozici přímo u místa konání. Kapacita je dostatečná pro všechny hosty.',
    title: 'Kde mohu zaparkovat?',
  },
  {
    content:
      'Svatba je plánována jako akce pro dospělé. Pokud pro vás není možné přijít bez dětí, dejte nám prosím předem vědět.',
    title: 'Jsou děti vítány?',
  },
  {
    content:
      'Hosté, kteří přijedou z větší dálky, mají zajištěné ubytování přímo v resortu. Pokud budete chtít ubytování, dejte nám prosím vědět.',
    title: 'Je zajištěno ubytování?',
  },
  {
    content: 'Ano, doprava z místa konání bude zajištěna ve dvou časech během večera.',
    title: 'Bude zajištěna doprava po skončení akce?',
  },
  {
    content: 'V případě nepříznivého počasí máme připravenou variantu v krytém prostoru.',
    title: 'Co když bude špatné počasí?',
  },
  {
    content: 'Nemáme žádný seznam darů. Největší radost nám udělá příspěvek na svatební cestu. Květiny prosím nenoste.',
    title: 'Svatební dary',
  },
  {
    content:
      'V případě jakýchkoliv komplikací nás neváhejte kontaktovat. Ženich: +420 724 937 056, Dawid svědek: +420 778 880 894.',
    title: 'Na koho se obrátit v případě problému?',
  },
]

export const FAQ = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)

  useScrollReveal(sectionRef, [imageRef], {once: true})
  useScrollReveal(titleRef, [titleRef, accordionRef], {delay: 0.15, once: true, start: 'top 50%', stagger: true})

  return (
    <Section
      ref={sectionRef}
      id={id}
      left={
        <div ref={imageRef} className="flex-1 w-full md:w-px max-w-110 aspect-[0.90] max-h-150 relative">
          <div className="paper-texture bg-white h-full max-h-full max-w-full w-full p-[16px_16px_64px]">
            <div className="z-1 flex-none absolute inset-[16px_16px_64px] overflow-hidden bg-black/90">
              <Image src="/png/footer-1.png" alt="place" fill className="object-cover" />
            </div>
          </div>
        </div>
      }
      right={
        <>
          <div ref={titleRef}>
            <SectionTitle eyebrow="Otázky">FAQ</SectionTitle>
          </div>
          <div ref={accordionRef}>
            <Accordion items={faq} />
          </div>
        </>
      }
    />
  )
}
