import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animation = gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y: options.y ?? 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: options.duration ?? 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? 'top 86%',
          toggleActions: 'restart none restart reverse',
        },
      },
    )

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [options.duration, options.start, options.y])

  return ref
}
