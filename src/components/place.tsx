'use client'

import Image from 'next/image'
import {useRef} from 'react'

import {useScrollReveal} from '@/hooks/use-scroll-reveal'
import {cn} from '@/utils'

import {Button, Section, SectionParagraph, SectionTitle} from './ui'

type PlaceImagePaperProps = {
  variant?: 'top-left' | 'bottom-right'
}

const PlaceImagePaper = ({variant = 'bottom-right'}: PlaceImagePaperProps) => (
  <div
    className={cn(
      'opacity-80 aspect-[0.660645] h-37 z-1 flex-none w-24.5 absolute overflow-visible',
      variant === 'top-left' && '-top-8 -left-8 rotate-152',
      variant === 'bottom-right' && '-bottom-8 -right-8 rotate-152'
    )}
  >
    <div className="absolute inset-0 rounded-inherit">
      <Image src="/png/paper.png" alt="paper" fill className="object-cover" />
    </div>
  </div>
)

export const Place = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useScrollReveal(sectionRef, [imageRef], {})
  useScrollReveal(titleRef, [titleRef, textRef, buttonRef], {delay: 0.15, stagger: true})

  return (
    <Section
      ref={sectionRef}
      id={id}
      left={
        <div ref={imageRef} className="flex-1 w-full md:w-px max-w-110 aspect-[0.90] max-h-150 relative p-12">
          <div className="paper-texture bg-white h-full max-h-full max-w-full w-full -rotate-[2.5deg] p-[16px_16px_64px]">
            <div className="z-1 flex-none absolute inset-[16px_16px_64px] overflow-hidden">
              <Image src="https://picsum.photos/id/1/800/1200" alt="place" fill className="object-cover" />
            </div>
            <PlaceImagePaper variant="top-left" />
            <PlaceImagePaper variant="bottom-right" />
          </div>
        </div>
      }
      right={
        <>
          <div ref={titleRef}>
            <SectionTitle eyebrow="Kde">Resort Nová Polana</SectionTitle>
          </div>
          <div ref={textRef}>
            <SectionParagraph className="max-w-130">
              Svatba se bude konat v&nbsp;Resortu Nová Polana v&nbsp;Dolní Lomné.
              <br />
              V&nbsp;místě obklopeném horami a&nbsp;přírodou, kde spolu strávíme celý den, od prvního přípitku až po
              večerní tanec.
            </SectionParagraph>
          </div>
          <div ref={buttonRef}>
            <Button>
              <Image src="/svg/navigate.svg" alt="navigate" width={16} height={16} className="w-4 h-4" />
              Navigovat
            </Button>
          </div>
        </>
      }
    />
  )
}
