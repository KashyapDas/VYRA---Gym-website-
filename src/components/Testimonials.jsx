import useReveal from '../hooks/useReveal'
import SectionHeading from './SectionHeading'

const benefits = [
  {
    number: '01',
    title: 'Personal, not generic.',
    description:
      'Every programme begins with your movement, experience, schedule and goals—not a copied workout template.',
  },
  {
    number: '02',
    title: 'Progress you can measure.',
    description:
      'Training decisions are guided by performance, recovery and consistency so progress remains clear and sustainable.',
  },
  {
    number: '03',
    title: 'Built for real life.',
    description:
      'The programme adapts around busy weeks, changing priorities and the realities of everyday life.',
  },
]

export default function Testimonials() {
  const sectionRef = useReveal()

  return (
    <section className="px-3 py-20 sm:px-5 lg:py-28">
      <div
        ref={sectionRef}
        className="mx-auto w-full max-w-295"
      >
        <SectionHeading
          eyebrow="WHY VYRA"
          title="Coaching built around real progress."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.number}
              className="group flex min-h-72 flex-col rounded-3xl border border-[#2b2b29] bg-[#161616] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#575750]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">
                  {benefit.number}
                </span>

                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[#393936] transition-colors duration-300 group-hover:bg-[#d7ff62]"
                />
              </div>

              <div className="mt-auto pt-16">
                <h3 className="text-2xl font-extrabold tracking-[-0.035em] text-[#f3f2ea]">
                  {benefit.title}
                </h3>

                <p className="mt-4 leading-7 text-[#9d9d95]">
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}