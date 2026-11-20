import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { business, getDisplayPhone } from '../config/business'
import useReveal from '../hooks/useReveal'
import InstagramIcon from './InstagramIcon'

export default function Contact({ onBook }) {
  const sectionRef = useReveal()

  return (
    <section id="contact" className="scroll-mt-24 px-3 pb-10 pt-20 sm:px-5 lg:pt-28">
      <div ref={sectionRef} className="mx-auto w-full max-w-[1180px]">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[30px] border border-white/5 bg-[radial-gradient(circle_at_80%_20%,rgba(215,255,98,0.10),transparent_34%)] bg-[#24241f] p-8 sm:p-12 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">READY WHEN YOU ARE</span>
            <h2 className="mt-3 max-w-3xl text-[clamp(2.4rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.055em]">
              Your first session starts with one click.
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-[#b8b8ae]">
              Pick a service, choose a time and tell us what you’re working toward.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onBook()}
            className="flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-[#f5f2e9] px-5 font-bold text-[#111] transition hover:-translate-y-0.5"
          >
            Book a session
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-sm text-[#aaa] sm:flex-row sm:flex-wrap sm:gap-7">
          <a
            href={`https://wa.me/${business.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-[#d7ff62]"
          >
            <Phone size={17} aria-hidden="true" />
            {getDisplayPhone(business.whatsappNumber)}
          </a>
          <a
            href={business.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-[#d7ff62]"
          >
            <MapPin size={17} aria-hidden="true" />
            {business.address}
          </a>
          <a
            href={business.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-[#d7ff62]"
          >
            <InstagramIcon className="size-[17px]" />
            {business.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}
