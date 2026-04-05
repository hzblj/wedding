'use client'

import {useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {SectionTitle} from './ui'

const MENU_ITEMS = [
  'Paštika ala šéf s pečivem',
  'Svatební vývar s játrovými knedlíčky, zeleninou a nudlemi',
  'Medailonky z vepřové panenky s bramborovým pyré a brusinkovou omáčkou',
] as const

export const Menu = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useScrollReveal(sectionRef, [headerRef], {})
  useScrollReveal(sectionRef, [contentRef], {delay: 0.2})

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-16 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-border"
    >
      <div ref={headerRef} className="flex flex-col gap-6">
        <SectionTitle eyebrow="Co se podává" className="w-full items-center text-center">
          Menu
        </SectionTitle>
      </div>
      <div ref={contentRef} className="flex flex-col gap-4 items-center text-center">
        {MENU_ITEMS.map(item => (
          <p key={item} className="text-[18px] leading-[150%] tracking-normal text-body">
            {item}
          </p>
        ))}
      </div>
    </section>
  )
}
