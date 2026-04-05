'use client'

import {useRef} from 'react'

import {useDictionary} from '@/i18n'
import {useScrollReveal, useScrollRevealChildren} from '@/hooks/use-scroll-reveal'

import {Section, SectionParagraph, SectionTitle, Timeline} from './ui'

export const Agenda = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const {dictionary} = useDictionary()

  useScrollReveal(sectionRef, [leftRef], {start: 'top 50%'})
  useScrollRevealChildren(timelineRef, timelineRef, {delay: 0.2, stagger: 0.08})

  return (
    <Section
      ref={sectionRef}
      id={id}
      left={
        <div ref={leftRef} className="flex flex-col gap-6 w-full">
          <SectionTitle eyebrow={dictionary.agenda.eyebrow}>{dictionary.agenda.title}</SectionTitle>
          <div className="flex flex-col gap-4">
            <SectionParagraph className="max-w-130 text-justify">
              <span dangerouslySetInnerHTML={{__html: dictionary.agenda.text1}} />
            </SectionParagraph>
            <SectionParagraph className="max-w-130 text-justify">
              <span dangerouslySetInnerHTML={{__html: dictionary.agenda.text2}} />
            </SectionParagraph>
          </div>
        </div>
      }
      right={
        <div className="flex flex-col w-full items-center justify-center">
          <Timeline
            ref={timelineRef}
            items={dictionary.agenda.timeline.map(item => ({
              from: item.from,
              name: item.name,
              ...(item.to ? {to: item.to} : {}),
            }))}
          />
        </div>
      }
    />
  )
}
