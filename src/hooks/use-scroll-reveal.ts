'use client'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {type RefObject, useEffect} from 'react'

gsap.registerPlugin(ScrollTrigger)

const REVEAL_DURATION = 0.8
const REVEAL_EASE = 'power2.out'
const REVEAL_Y = 40
const STAGGER_DELAY = 0.12
const TRIGGER_START = 'top 90%'

type ScrollRevealOptions = {
  stagger?: boolean
  delay?: number
}

export const useScrollReveal = (
  triggerRef: RefObject<HTMLElement | null>,
  targetRefs: RefObject<HTMLElement | null>[],
  options: ScrollRevealOptions = {}
) => {
  const {stagger = false, delay = 0} = options

  useEffect(() => {
    if (!triggerRef.current) {
      return
    }

    const targets = targetRefs.map(ref => ref.current).filter(Boolean)

    if (targets.length === 0) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(targets, {autoAlpha: 0, y: REVEAL_Y})

      gsap.to(targets, {
        autoAlpha: 1,
        delay,
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        scrollTrigger: {
          start: TRIGGER_START,
          toggleActions: 'play reverse play reverse',
          trigger: triggerRef.current,
        },
        stagger: stagger ? STAGGER_DELAY : 0,
        y: 0,
      })
    })

    return () => {
      context.revert()
    }
  }, [triggerRef, targetRefs, stagger, delay])
}

type ScrollRevealChildrenOptions = {
  delay?: number
  stagger?: number
}

export const useScrollRevealChildren = (
  triggerRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  options: ScrollRevealChildrenOptions = {}
) => {
  const {delay = 0, stagger = STAGGER_DELAY} = options

  useEffect(() => {
    if (!triggerRef.current || !containerRef.current) {
      return
    }

    const children = containerRef.current.children

    if (children.length === 0) {
      return
    }

    const context = gsap.context(() => {
      gsap.set(children, {autoAlpha: 0, y: REVEAL_Y})

      gsap.to(children, {
        autoAlpha: 1,
        delay,
        duration: REVEAL_DURATION,
        ease: REVEAL_EASE,
        scrollTrigger: {
          start: TRIGGER_START,
          toggleActions: 'play reverse play reverse',
          trigger: triggerRef.current,
        },
        stagger,
        y: 0,
      })
    })

    return () => {
      context.revert()
    }
  }, [triggerRef, containerRef, delay, stagger])
}
