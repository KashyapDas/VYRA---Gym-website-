export default function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
      <div>
        <span className="text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">{eyebrow}</span>
        <h2 className="mt-3 max-w-3xl text-[clamp(2.4rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.055em]">{title}</h2>
      </div>
      {copy && <p className="max-w-[470px] leading-7 text-[#9d9d95]">{copy}</p>}
    </div>
  )
}
