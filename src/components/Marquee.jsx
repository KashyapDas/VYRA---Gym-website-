import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const items = ['STRENGTH', 'MOBILITY', 'PERFORMANCE', 'RECOVERY']

function Track({ reverse = false }) {
  const trackRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const animation = gsap.fromTo(
      trackRef.current,
      { xPercent: reverse ? -50 : 0 },
      { xPercent: reverse ? 0 : -50, duration: 20, ease: 'none', repeat: -1 },
    )

    return () => animation.kill()
  }, [reverse])

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max [will-change:transform]">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`flex shrink-0 items-center whitespace-nowrap text-[clamp(1.6rem,3vw,3rem)] font-extrabold leading-tight ${
              index % 2
                ? 'text-transparent [-webkit-text-stroke:1px_#d7ff62]'
                : 'text-[#d7ff62]'
            }`}
          >
            {item}
            <i className="mx-5 not-italic text-[#cccccc]" aria-hidden="true">✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section aria-label="Studio values" className="grid gap-1 overflow-hidden border-y border-[#2b2b29] bg-[#0b0b0b] py-4">
      <Track />
      <Track reverse />
    </section>
  )
}
