import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { faqs } from '../data/siteData'
import useReveal from '../hooks/useReveal'

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(0)
  const sectionRef = useReveal()

  return (
    <section className="bg-[#0f0f0f] px-3 py-20 sm:px-5 lg:py-28">
      <div ref={sectionRef} className="mx-auto grid w-full max-w-[1180px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <span className="text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">QUESTIONS</span>
          <h2 className="mt-3 text-[clamp(2.4rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.055em]">
            Everything you need before you book.
          </h2>
          <p className="mt-6 leading-7 text-[#9d9d95]">Need something else? Message us directly and we’ll help.</p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#41413d] px-5 font-bold transition hover:-translate-y-0.5 hover:border-[#d7ff62]"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp us
          </a>
        </div>

        <div className="border-t border-[#2b2b29]">
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index
            return (
              <div key={question} className="border-b border-[#2b2b29]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                >
                  <strong className="text-[17px]">{question}</strong>
                  <ChevronDown
                    size={19}
                    aria-hidden="true"
                    className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-[90%] pb-6 leading-7 text-[#9d9d95]">{answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
