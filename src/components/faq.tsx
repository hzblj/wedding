'use client'

import Image from 'next/image'
import {useRef} from 'react'

import {useDictionary} from '@/i18n'
import {useScrollReveal} from '@/hooks/use-scroll-reveal'

import {Accordion, Section, SectionTitle} from './ui'

export const FAQ = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const {dictionary} = useDictionary()

  useScrollReveal(sectionRef, [imageRef], {once: true})
  useScrollReveal(titleRef, [titleRef, accordionRef], {delay: 0.15, once: true, stagger: true, start: 'top 50%'})

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
            <SectionTitle eyebrow={dictionary.faq.eyebrow}>{dictionary.faq.title}</SectionTitle>
          </div>
          <div ref={accordionRef}>
            <Accordion items={dictionary.faq.items} />
          </div>
        </>
      }
    />
  )
}
