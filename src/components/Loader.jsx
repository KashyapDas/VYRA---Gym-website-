import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

function resetScrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  })

  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const outlineRef = useRef(null)
  const fillRef = useRef(null)
  const sweepRef = useRef(null)
  const taglineRef = useRef(null)
  const topPanelRef = useRef(null)
  const bottomPanelRef = useRef(null)

  useLayoutEffect(() => {
    const html = document.documentElement

    const previousBodyOverflow =
      document.body.style.overflow

    const previousHtmlOverflow =
      html.style.overflow

    let finished = false

    resetScrollToTop()

    document.body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'

    const unlockScrolling = () => {
      document.body.style.overflow =
        previousBodyOverflow

      html.style.overflow =
        previousHtmlOverflow
    }

    const finish = () => {
      if (finished) return

      finished = true
      unlockScrolling()
      resetScrollToTop()
      onComplete()
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const safetyTimeout = window.setTimeout(
      finish,
      5000,
    )

    if (reduceMotion) {
      window.clearTimeout(safetyTimeout)
      finish()

      return unlockScrolling
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safetyTimeout)
          finish()
        },
      })

      timeline
        .fromTo(
          outlineRef.current,
          {
            yPercent: 110,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
          },
        )

        .fromTo(
          sweepRef.current,
          {
            xPercent: -120,
          },
          {
            xPercent: 120,
            duration: 0.75,
            ease: 'power2.inOut',
          },
          '-=0.2',
        )

        .fromTo(
          fillRef.current,
          {
            clipPath: 'inset(0 100% 0 0)',
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.75,
            ease: 'power2.inOut',
          },
          '<',
        )

        .fromTo(
          taglineRef.current,
          {
            y: 16,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.15',
        )

        .to({}, { duration: 0.22 })

        .to(
          [
            outlineRef.current,
            fillRef.current,
            taglineRef.current,
          ],
          {
            opacity: 0,
            y: -12,
            duration: 0.28,
            ease: 'power2.in',
          },
        )

        .to(
          topPanelRef.current,
          {
            yPercent: -101,
            duration: 0.75,
            ease: 'power4.inOut',
            force3D: true,
          },
          '-=0.03',
        )

        .to(
          bottomPanelRef.current,
          {
            yPercent: 101,
            duration: 0.75,
            ease: 'power4.inOut',
            force3D: true,
          },
          '<',
        )

        .set(loaderRef.current, {
          display: 'none',
        })
    }, loaderRef)

    return () => {
      window.clearTimeout(safetyTimeout)
      context.revert()
      unlockScrolling()
    }
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      role="status"
      aria-label="Loading VYRA website"
      className="fixed inset-0 z-300 overflow-hidden"
    >
      <div
        ref={topPanelRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#080808]"
      />

      <div
        ref={bottomPanelRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#080808]"
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <div className="relative w-full overflow-hidden py-8 text-center">
          <div
            ref={sweepRef}
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-[clamp(4rem,10vw,8rem)] w-full -translate-y-1/2 bg-[#d7ff62]"
          />

          <div className="relative overflow-hidden">
            <div
              ref={outlineRef}
              aria-hidden="true"
              className="text-[clamp(5rem,19vw,18rem)] font-black leading-[0.78] tracking-[-0.09em] text-transparent"
              style={{
                WebkitTextStroke:
                  '1px rgba(243, 242, 234, 0.38)',
              }}
            >
              VYRA.
            </div>

            <div
              ref={fillRef}
              className="absolute inset-0 text-[clamp(5rem,19vw,18rem)] font-black leading-[0.78] tracking-[-0.09em] text-[#f3f2ea]"
            >
              VYRA
              <span className="text-[#d7ff62]">
                .
              </span>
            </div>
          </div>

          <div
            ref={taglineRef}
            className="relative z-10 mt-7 flex items-center justify-center gap-3 text-[10px] font-extrabold tracking-[0.24em] text-[#d7ff62] sm:text-xs"
          >
            <span>MOVE BETTER</span>

            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-[#65655f]"
            />

            <span>LIVE STRONGER</span>
          </div>
        </div>
      </div>

      <span className="sr-only">
        Loading website
      </span>
    </div>
  )
}