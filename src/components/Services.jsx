import { ArrowRight, Clock3 } from 'lucide-react'
import { services } from '../data/siteData'
import useReveal from '../hooks/useReveal'
import SectionHeading from './SectionHeading'

export default function Services({ onBook }) {
  const sectionRef = useReveal()

  return (
    <section id="services" className="scroll-mt-24 px-3 py-20 sm:px-5 lg:py-28">
      <div ref={sectionRef} className="mx-auto w-full max-w-[1180px]">
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="Coaching that meets you where you are."
          copy="No generic routines. Every session has a purpose, progression and clear next step."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group flex min-h-[370px] flex-col rounded-[26px] border border-[#2b2b29] bg-[#161616] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#575750] hover:bg-[#191919]"
            >
              <span className="text-sm text-[#55554f]">{String(index + 1).padStart(2, '0')}</span>
              <span className="mt-14 text-xs tracking-wider text-[#c8c8be]">{service.eyebrow}</span>
              <h3 className="mt-2 text-3xl font-bold tracking-tight">{service.title}</h3>
              <p className="mt-3 leading-7 text-[#9d9d95]">{service.description}</p>

              <div className="mt-auto flex items-center justify-between border-t border-[#2b2b29] pt-6">
                <span className="flex items-center gap-2 text-sm text-[#c4c4bd]">
                  <Clock3 size={15} aria-hidden="true" />
                  {service.duration}
                </span>
                <strong>{service.price}</strong>
              </div>

              <button
                type="button"
                onClick={() => onBook(service.id)}
                className="mt-5 flex w-fit items-center gap-2 font-bold text-[#d7ff62]"
              >
                Book this service
                <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
