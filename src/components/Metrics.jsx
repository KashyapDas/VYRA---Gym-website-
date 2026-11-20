import useReveal from '../hooks/useReveal'

export default function Metrics() {
  const sectionRef = useReveal()

  return (
    <section className="px-3 pb-20 sm:px-5 lg:pb-28">
      <div
        ref={sectionRef}
        className="mx-auto w-full max-w-295 gap-7 rounded-[30px] bg-[#d7ff62] p-7 text-[#111] sm:p-10 lg:grid-cols-[1.4fr_0.6fr_0.6fr] lg:items-end lg:p-12"
      >
        <div>
          <span className="text-xs font-extrabold tracking-[0.16em]">WHY CLIENTS STAY</span>
          <h2 className="mt-3 text-[clamp(2.6rem,5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.055em]">
            Less confusion.<br />More consistency.
          </h2>
        </div>
        <div className="border-t border-black/20 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <strong className="block text-5xl font-extrabold tracking-tight">92%</strong>
          <span className="mt-2 block text-sm leading-5">of active members train consistently after month three.</span>
        </div>
        <div className="border-t border-black/20 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <strong className="block text-5xl font-extrabold tracking-tight">48h</strong>
          <span className="mt-2 block text-sm leading-5">average response time for plan changes and check-ins.</span>
        </div>
      </div>
    </section>
  )
}
