import { useEffect, useState } from 'react'
import { ArrowDownRight, Menu, X } from 'lucide-react'

const links = [
  ['Services', '#services'],
  ['About', '#about'],
  ['Membership', '#plans'],
  ['Contact', '#contact'],
]

export default function Navbar({ onBook }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    const desktopMedia = window.matchMedia('(min-width: 768px)')
    const closeOnDesktop = (event) => {
      if (event.matches) setMobileOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    desktopMedia.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      desktopMedia.removeEventListener('change', closeOnDesktop)
    }
  }, [mobileOpen])

  const book = () => {
    setMobileOpen(false)
    onBook()
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-5 sm:py-4">
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto mx-auto grid h-16 w-full max-w-[1180px] grid-cols-[1fr_auto] items-center rounded-full border border-white/10 bg-[#0b0b0b]/85 px-4 shadow-[0_18px_55px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:h-[72px] sm:px-6 md:grid-cols-[1fr_auto_1fr]"
      >
        <a
          href="#top"
          aria-label="VYRA home"
          className="justify-self-start text-2xl font-extrabold tracking-[-0.08em]"
        >
          VYRA<span className="text-[#d7ff62]">.</span>
        </a>

        <div className="hidden h-11 items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 text-[13px] text-[#b8b8b2] md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3.5 py-2 transition duration-200 hover:bg-white/[0.07] hover:text-white lg:px-4"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={book}
          className="hidden min-h-12 items-center gap-2 justify-self-end rounded-full bg-[#d7ff62] px-5 font-bold text-[#10100c] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e2ff8c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7ff62] md:flex"
        >
          Book a session
          <ArrowDownRight size={17} aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="grid size-11 place-items-center justify-self-end rounded-full border border-white/15 bg-[#161616] transition hover:border-[#d7ff62]/60 hover:text-[#d7ff62] md:hidden"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-0 z-[60] flex flex-col bg-[#0d0d0d] px-6 pb-8 pt-6 md:hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <a
              href="#top"
              aria-label="VYRA home"
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-extrabold tracking-[-0.08em]"
            >
              VYRA<span className="text-[#d7ff62]">.</span>
            </a>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-[#161616] transition hover:border-[#d7ff62]/60 hover:text-[#d7ff62]"
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-2">
            {links.map(([label, href], index) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between border-b border-white/[0.08] py-4 text-[clamp(2.2rem,12vw,4rem)] font-extrabold leading-none tracking-[-0.06em] transition hover:text-[#d7ff62]"
              >
                {label}
                <span className="text-xs font-semibold tracking-normal text-[#666] transition group-hover:text-[#d7ff62]">
                  0{index + 1}
                </span>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={book}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#d7ff62] px-6 font-bold text-black"
          >
            Book session
            <ArrowDownRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </header>
  )
}
