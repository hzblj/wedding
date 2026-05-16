'use client'

import Link from 'next/link'
import {useRef} from 'react'
import {useScrollReveal} from '@/hooks/use-scroll-reveal'
import {useDictionary} from '@/i18n'

import {SectionParagraph, SectionTitle} from './ui'

const Vinyl = () => (
  <div className="relative w-44 h-44 md:w-52 md:h-52 animate-[spin_14s_linear_infinite] drop-shadow-[0_18px_40px_rgba(62,51,43,0.35)]">
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="vinyl-disc" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a1410" />
          <stop offset="60%" stopColor="#0c0908" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <radialGradient id="vinyl-label" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d8b58e" />
          <stop offset="100%" stopColor="#8b6b50" />
        </radialGradient>
        <linearGradient id="vinyl-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="49" fill="url(#vinyl-disc)" />
      {[46, 42, 38, 34, 30, 26, 22].map(r => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.25" />
      ))}
      <circle cx="50" cy="50" r="49" fill="url(#vinyl-sheen)" />
      <circle cx="50" cy="50" r="16" fill="url(#vinyl-label)" />
      <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.4" />
      <circle cx="50" cy="50" r="1.4" fill="#080604" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span className="font-bold uppercase text-[10px] md:text-[11px] tracking-[0.32em] text-white/95">K &amp; J</span>
    </div>
  </div>
)

const NoteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white">
    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const Music = ({id}: {id?: string}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const vinylRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const {dictionary, locale} = useDictionary()

  useScrollReveal(sectionRef, [vinylRef], {})
  useScrollReveal(sectionRef, [headerRef, textRef, buttonRef], {delay: 0.15, stagger: true})

  return (
    <section
      ref={sectionRef}
      id={id}
      className="flex flex-col flex-none place-content-[center_flex-start] items-center gap-10 w-full h-min p-[96px_24px] md:p-[96px_32px] relative overflow-hidden border-t border-solid border-border"
    >
      <div ref={vinylRef} className="relative">
        <Vinyl />
      </div>
      <div ref={headerRef} className="flex flex-col gap-6 w-full">
        <SectionTitle eyebrow={dictionary.music.eyebrow} className="w-full items-center text-center">
          {dictionary.music.title}
        </SectionTitle>
      </div>
      <div ref={textRef} className="flex w-full justify-center">
        <SectionParagraph className="max-w-130 text-center">{dictionary.music.cta.text}</SectionParagraph>
      </div>
      <div ref={buttonRef}>
        <Link
          href={`/${locale}/music`}
          className="inline-flex items-center gap-2 uppercase text-base font-medium bg-heading text-white px-6 py-3 rounded-full hover:bg-heading/80 transition-all duration-300 cursor-pointer"
        >
          <NoteIcon />
          {dictionary.music.cta.button}
        </Link>
      </div>
    </section>
  )
}
