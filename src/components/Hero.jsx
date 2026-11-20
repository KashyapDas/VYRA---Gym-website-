import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowRight, CalendarDays, Sparkles } from 'lucide-react'
import gsap from 'gsap'

export default function Hero({ onBook }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-kicker]', { y: 18, autoAlpha: 0, duration: 0.45 })
        .from('[data-hero-line]', { yPercent: 110, duration: 0.85, stagger: 0.08 }, '-=0.1')
        .from('[data-hero-detail]', { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, '-=0.4')
        .from('[data-hero-visual]', { scale: 0.94, autoAlpha: 0, duration: 0.9 }, '-=0.75')
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      className="flex min-h-screen items-center bg-[radial-gradient(circle_at_20%_20%,rgba(215,255,98,0.08),transparent_34%)] px-3 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-36"
    >
      <div className="mx-auto grid w-full max-w-295 items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-14">
        <div>
          <div data-hero-kicker className="mb-6 flex items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">
            <Sparkles size={15} aria-hidden="true" />
            PRIVATE COACHING · GUWAHATI
          </div>

          <h1 className="mb-7 text-[clamp(3.25rem,7.5vw,6.75rem)] font-extrabold leading-[0.88] tracking-[-0.065em]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">Move better.</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block font-['Playfair_Display',serif] font-semibold italic text-[#d8d4c9]">Live stronger.</span>
            </span>
          </h1>

          <p data-hero-detail className="max-w-xl text-base leading-7 text-[#b6b6ae] sm:text-lg sm:leading-8">
            Personal training, mobility and performance coaching designed around your body, schedule and real-world goals.
          </p>

          <div data-hero-detail className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => onBook()}
              className="flex min-h-12 items-center gap-2 rounded-full bg-[#d7ff62] px-5 font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#e2ff8c]"
            >
              Book your first session
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a href="#services" className="flex items-center gap-2 font-bold text-[#d8d8d0] transition hover:text-[#d7ff62]">
              Explore services
              <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div data-hero-detail className="mt-12 flex justify-between gap-4 border-t border-[#2b2b29] pt-7 sm:justify-start sm:gap-11">
            {[
  ['1:1', 'Private coaching'],
  ['60 min', 'Typical session'],
  ['Mon–Sat', 'Weekly availability'],
].map(([value, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <strong className="text-lg sm:text-[22px]">{value}</strong>
                <span className="text-[10px] text-[#9d9d95] sm:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-hero-visual className="relative overflow-hidden rounded-[26px] h-107.5 sm:h-135 lg:h-167.5 lg:rounded-[34px]">
          <img
            src="/images/hero.webp"
            alt="Athlete training in a premium gym"
            width="1200"
            height="1500"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

          <div className="absolute right-3 top-3 rounded-2xl border border-white/15 bg-[#0e0e0e]/85 px-4 py-3 backdrop-blur-xl sm:right-6 sm:top-6">
            <span className="block text-[10px] tracking-[0.14em] text-[#a9a99f]">THIS WEEK</span>
            <strong>Bookings open</strong>
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0e0e0e]/85 px-4 py-3 backdrop-blur-xl sm:bottom-6 sm:left-6">
            <CalendarDays size={18} className="text-[#d7ff62]" aria-hidden="true" />
            <div>
              <span className="block text-[10px] tracking-[0.14em] text-[#a9a99f]">NEXT AVAILABLE</span>
              <strong>Check availability</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
