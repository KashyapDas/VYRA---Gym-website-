export default function Footer() {
  return (
    <footer className="border-t border-[#2b2b29] px-3 py-9 sm:px-5">
      <div className="mx-auto grid w-full max-w-295 items-center gap-3 text-sm text-[#777] md:grid-cols-3">
        <a
          href="#top"
          className="text-2xl font-extrabold tracking-[-0.08em] text-white"
        >
          VYRA<span className="text-[#d7ff62]">.</span>
        </a>

        <p className="text-xs text-[#77776f] md:text-center">
          Concept website created for portfolio demonstration.
        </p>

        <span className="md:text-right">
          © {new Date().getFullYear()} VYRA Studio
        </span>
      </div>
    </footer>
  )
}