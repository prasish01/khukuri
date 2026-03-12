import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Attach scroll-triggered reveals to all .will-reveal* elements
 * inside the given ref scope.
 */
export function useScrollReveal(scopeRef, deps = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up
      gsap.utils.toArray('.will-reveal-up').forEach(el => {
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        })
      })
      // Fade only
      gsap.utils.toArray('.will-reveal').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        })
      })
      // Fade left
      gsap.utils.toArray('.will-reveal-left').forEach(el => {
        gsap.to(el, {
          opacity: 1, x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        })
      })
    }, scopeRef?.current)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export { gsap, ScrollTrigger }
