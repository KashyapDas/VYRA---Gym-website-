import useReveal from '../hooks/useReveal'

const steps = [
  ['01', 'Assess.', 'Understand movement, lifestyle and goals.'],
  ['02', 'Build.', 'Create a realistic plan around your week.'],
  ['03', 'Progress.', 'Adjust based on data, not guesswork.'],
]

export default function About({ onBook }) {
  const sectionRef = useReveal()

  return (
    <section id="about" className="scroll-mt-24 bg-[#0f0f0f] px-3 py-20 sm:px-5 lg:py-28">
      <div ref={sectionRef} className="mx-auto grid w-full max-w-295 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="h-105 overflow-hidden rounded-[26px] sm:h-130 lg:h-170 lg:rounded-4xl">
          <img
          src="/images/coach.webp"
          alt="Coach helping a client train"
          width="1100"
          height="1375"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 hover:scale-[1.035]"
        />
        </div>

        <div>
          <span className="text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">OUR METHOD</span>
          <h2 className="mt-3 text-[clamp(2.4rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.055em]">
            Premium coaching without the performance theatre.
          </h2>
          <p className="mt-6 text-[17px] leading-7 text-[#9d9d95]">
            VYRA is built for people who want to train seriously without turning fitness into a second job. We combine strength, mobility and simple progress tracking into a system you can sustain.
          </p>

          <div className="my-8">
            {steps.map(([number, title, copy]) => (
              <div key={number} className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#2b2b29] py-5">
                <span className="text-xs text-[#d7ff62]">{number}</span>
                <p className="m-0 text-[#bdbdb6]">
                  <strong className="text-white">{title}</strong> {copy}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onBook()}
            className="min-h-12 rounded-full border border-[#41413d] px-5 font-bold transition hover:-translate-y-0.5 hover:border-[#d7ff62]"
          >
            Start with an assessment
          </button>
        </div>
      </div>
    </section>
  )
}
