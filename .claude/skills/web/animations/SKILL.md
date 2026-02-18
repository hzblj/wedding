---
name: gsap
description: GSAP animation guidelines for React - timelines, ScrollTrigger, useGSAP hook, cleanup patterns, and performance rules.
---

# Animations (GSAP)

- Use GSAP for all complex animations.
- Register plugins explicitly: `gsap.registerPlugin(ScrollTrigger, Flip, SplitText, ...)`.
- Always clean up animations in `useEffect` cleanup or `useLayoutEffect`.

## Timeline

- Use `gsap.timeline()` for sequenced animations.
- Keep timelines readable - one tween per line.
- Use labels for complex sequences.
- Prefer relative positions (`-=0.2`, `+=0.1`) over absolute.

```ts
const timeline = gsap.timeline()

timeline
  .to(element, { opacity: 1, duration: 0.3 })
  .to(element, { y: 0, duration: 0.5 }, '-=0.1')
```

## ScrollTrigger

- Always define `trigger`, `start`, `end`.
- Use `scrub: true` for scroll-linked animations.
- Use `toggleActions` for enter/leave behavior.
- Kill ScrollTrigger instances on cleanup.

```ts
gsap.to(element, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: true,
  },
  y: -100,
  opacity: 1,
})
```

## React Integration

- Use `useRef` for target elements - never query DOM directly.
- Use `useGSAP` hook from `@gsap/react` when available.
- Scope animations with `gsap.context()` for automatic cleanup.
- Do not animate React state - animate DOM properties directly.

```ts
useGSAP(() => {
  gsap.from('.card', {
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.6,
  })
}, { scope: containerRef })
```

## Rules

- Animations must feel smooth and natural.
- No aggressive or random motion.
- Extract durations and easings into constants.
- Prefer `gsap.set()` for initial states over CSS.
- Use `will-change` sparingly and only during animation.
- Prefer `transform` and `opacity` - avoid animating layout properties.
