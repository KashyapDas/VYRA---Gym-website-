import { Check } from 'lucide-react'
import { plans } from '../data/siteData'
import useReveal from '../hooks/useReveal'
import SectionHeading from './SectionHeading'

export default function Pricing({ onBook }) {
  const sectionRef = useReveal()

  return (
    <section id="plans" className="scroll-mt-24 px-3 py-20 sm:px-5 lg:py-28">
      <div ref={sectionRef} className="mx-auto w-full max-w-[1180px]">
        <SectionHeading
          eyebrow="MEMBERSHIP"
          title="Simple plans. Serious coaching."
          copy="Start monthly. Upgrade, pause or change frequency as your goals evolve."
        />

        <div className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-[26px] border p-7 transition duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? 'border-[#e9e5da] bg-[#e9e5da] text-[#111] lg:-translate-y-3 lg:hover:-translate-y-4'
                  : 'border-[#2b2b29] bg-[#161616] hover:border-[#575750]'
              }`}
            >
              {plan.featured && (
                <span className="absolute right-5 top-5 rounded-full bg-[#111] px-3 py-2 text-[10px] font-extrabold tracking-wider text-[#d7ff62]">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-3xl font-bold tracking-tight">{plan.name}</h3>
              <div className="mt-7 text-5xl font-extrabold tracking-[-0.05em]">
                {plan.price}<span className="text-sm font-semibold opacity-60">/mo</span>
              </div>
              <p className={`mt-4 ${plan.featured ? 'text-[#5e5e59]' : 'text-[#9d9d95]'}`}>{plan.note}</p>
              <ul className="my-6 grid gap-3 border-y border-current py-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check size={16} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onBook()}
                className={`min-h-12 w-full rounded-full px-5 font-bold transition hover:-translate-y-0.5 ${
                  plan.featured
                    ? 'bg-[#111] text-[#d7ff62]'
                    : 'border border-[#41413d] hover:border-[#d7ff62]'
                }`}
              >
                Choose {plan.name}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
