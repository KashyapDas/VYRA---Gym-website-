import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react'
import { business } from '../config/business'
import { services } from '../data/siteData'

const times = ['08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '04:00 PM', '06:30 PM']

const emptyForm = (service = '') => ({
  service,
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
  note: '',
})

function localDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const fieldClass =
  'w-full rounded-[14px] border border-[#343431] bg-[#0e0e0e] px-4 py-3.5 text-white outline-none transition placeholder:text-[#666660] focus:border-[#8aa335] focus:ring-3 focus:ring-[#d7ff62]/10'

export default function BookingModal({ open, onClose, initialService = '' }) {
  const dialogRef = useRef(null)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => emptyForm(initialService))
  const [errors, setErrors] = useState({})
  const [complete, setComplete] = useState(false)

  const minDate = useMemo(localDate, [])
  const selectedService = services.find((service) => service.id === form.service)

  useEffect(() => {
    if (!open) return
    setStep(1)
    setErrors({})
    setComplete(false)
    setForm(emptyForm(initialService))
  }, [open, initialService])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'

    const focusableSelector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const getFocusable = () =>
      [...(dialogRef.current?.querySelectorAll(focusableSelector) ?? [])].filter(
        (element) => element.getClientRects().length > 0,
      )

    const focusFrame = requestAnimationFrame(() => getFocusable()[0]?.focus())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (!first) {
        event.preventDefault()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (step === 1) {
      if (!form.service) nextErrors.service = 'Please choose a service.'
      if (!form.date) nextErrors.date = 'Please choose a date.'
      else if (form.date < minDate) nextErrors.date = 'Please choose today or a future date.'
      if (!form.time) nextErrors.time = 'Please choose a time.'
    }

    if (step === 2) {
      if (form.name.trim().length < 2) nextErrors.name = 'Please enter your full name.'
      if (!/^\+?[0-9\s()-]{8,18}$/.test(form.phone.trim())) nextErrors.phone = 'Please enter a valid phone number.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Please enter a valid email.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const next = () => {
    if (validate()) setStep((current) => Math.min(3, current + 1))
  }

  const sendToWhatsApp = () => {
    const bookingMessage = [
      `Hello ${business.name}, I would like to book a session.`,
      '',
      `Service: ${selectedService?.title || form.service}`,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Email: ${form.email.trim()}`,
      `Note: ${form.note.trim() || 'None'}`,
    ].join('\n')

    const whatsappUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(bookingMessage)}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setComplete(true)
  }

  const labelClass = 'mb-2 mt-4 block text-xs font-bold text-[#a8a8a1]'
  const error = (message) => message && <p role="alert" className="mt-1.5 text-xs text-[#ff8f8f]">{message}</p>

  return (
    <div
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-2.5 backdrop-blur-[10px] sm:p-5"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative max-h-[95vh] w-full max-w-[720px] overflow-y-auto rounded-[22px] border border-[#343431] bg-[#151515] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:rounded-[30px] sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking"
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-[#343431] bg-[#161616] sm:right-5 sm:top-5"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {!complete ? (
          <>
            <header className="pr-12">
              <span className="text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">BOOK A SESSION</span>
              <h2 id="booking-title" className="mb-4 mt-2 text-4xl font-extrabold tracking-[-0.05em] sm:text-[42px]">Reserve your time.</h2>
              <div className="flex gap-2" aria-label={`Step ${step} of 3`}>
                {[1, 2, 3].map((number) => (
                  <span
                    key={number}
                    aria-current={step === number ? 'step' : undefined}
                    className={`grid size-[30px] place-items-center rounded-full border text-xs ${
                      step >= number
                        ? 'border-[#d7ff62] bg-[#d7ff62] text-black'
                        : 'border-[#343431] text-[#777]'
                    }`}
                  >
                    {number}
                  </span>
                ))}
              </div>
            </header>

            {step === 1 && (
              <div className="py-6">
                <span className={labelClass}>Select service</span>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {services.map((service) => (
                    <button
                      type="button"
                      key={service.id}
                      aria-pressed={form.service === service.id}
                      onClick={() => updateField('service', service.id)}
                      className={`rounded-[18px] border bg-[#101010] p-4 text-left transition hover:-translate-y-0.5 hover:bg-[#181818] ${
                        form.service === service.id
                          ? 'border-[#d7ff62] ring-1 ring-[#d7ff62]'
                          : 'border-[#2b2b29] hover:border-[#575750]'
                      }`}
                    >
                      <strong className="block text-sm">{service.title}</strong>
                      <span className="mt-1 block text-xs text-[#81817b]">{service.duration} · {service.price}</span>
                    </button>
                  ))}
                </div>
                {error(errors.service)}

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-date" className={labelClass}>Date</label>
                    <input
                      id="booking-date"
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={(event) => updateField('date', event.target.value)}
                      className={`${fieldClass} scheme-dark`}
                    />
                    {error(errors.date)}
                  </div>
                  <div>
                    <label htmlFor="booking-time" className={labelClass}>Time</label>
                    <select
                      id="booking-time"
                      value={form.time}
                      onChange={(event) => updateField('time', event.target.value)}
                      className={`${fieldClass} scheme-dark`}
                    >
                      <option value="">Select a time</option>
                      {times.map((time) => <option key={time}>{time}</option>)}
                    </select>
                    {error(errors.time)}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="py-6">
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-name" className={labelClass}>Full name</label>
                    <input
                      id="booking-name"
                      autoFocus
                      autoComplete="name"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder="Your full name"
                      className={fieldClass}
                    />
                    {error(errors.name)}
                  </div>
                  <div>
                    <label htmlFor="booking-phone" className={labelClass}>Phone</label>
                    <input
                      id="booking-phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      placeholder="+91 98765 43210"
                      className={fieldClass}
                    />
                    {error(errors.phone)}
                  </div>
                </div>

                <label htmlFor="booking-email" className={labelClass}>Email</label>
                <input
                  id="booking-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
                {error(errors.email)}

                <label htmlFor="booking-note" className={labelClass}>
                  Anything we should know? <span className="font-normal text-[#666]">(optional)</span>
                </label>
                <textarea
                  id="booking-note"
                  rows="4"
                  maxLength="500"
                  value={form.note}
                  onChange={(event) => updateField('note', event.target.value)}
                  placeholder="Goals, injuries, preferred coach, etc."
                  className={`${fieldClass} resize-y`}
                />
              </div>
            )}

            {step === 3 && (
              <div className="py-6">
                <div className="grid grid-cols-[100px_1fr] gap-4 overflow-hidden rounded-[20px] border border-[#2b2b29] bg-[#0d0d0d] p-5 sm:grid-cols-[150px_1fr]">
                  <span className="text-[#777]">Service</span><strong>{selectedService?.title}</strong>
                  <span className="text-[#777]">Date</span><strong>{form.date}</strong>
                  <span className="text-[#777]">Time</span><strong>{form.time}</strong>
                  <span className="text-[#777]">Client</span><strong>{form.name}</strong>
                  <span className="text-[#777]">Contact</span><strong>{form.phone}</strong>
                  <span className="text-[#777]">Email</span><strong className="break-all">{form.email}</strong>
                </div>
                <p className="mt-4 text-xs leading-5 text-[#999]">
                  Clicking below opens WhatsApp with these booking details already filled in. You can review the message before sending it.
                </p>
              </div>
            )}

            <footer className="flex justify-between gap-3 border-t border-[#2b2b29] pt-5">
              <button
                type="button"
                onClick={step === 1 ? onClose : () => setStep((current) => current - 1)}
                className="flex min-h-12 items-center gap-2 rounded-full px-4 font-bold text-[#c8c8c1]"
              >
                <ChevronLeft size={17} aria-hidden="true" />
                {step === 1 ? 'Cancel' : 'Back'}
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  className="flex min-h-12 items-center gap-2 rounded-full bg-[#d7ff62] px-5 font-bold text-black"
                >
                  Continue
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={sendToWhatsApp}
                  className="flex min-h-12 items-center gap-2 rounded-full bg-[#d7ff62] px-5 font-bold text-black"
                >
                  Send on WhatsApp
                  <MessageCircle size={17} aria-hidden="true" />
                </button>
              )}
            </footer>
          </>
        ) : (
          <section className="px-2 pb-7 pt-14 text-center" aria-live="polite">
            <div className="mx-auto mb-5 grid size-[62px] place-items-center rounded-full bg-[#d7ff62] text-black">
              <Check size={28} aria-hidden="true" />
            </div>
            <span className="text-xs font-extrabold tracking-[0.16em] text-[#d7ff62]">WHATSAPP OPENED</span>
            <h2 id="booking-title" className="mb-4 mt-2 text-4xl font-extrabold tracking-[-0.05em] sm:text-[42px]">One last step.</h2>
            <p className="mx-auto mb-7 max-w-lg leading-7 text-[#9d9d95]">
              Review the prefilled booking message in WhatsApp and press Send to contact {business.name}. Your appointment is confirmed only after the business replies.
            </p>
            <button type="button" onClick={onClose} className="min-h-12 rounded-full bg-[#d7ff62] px-6 font-bold text-black">
              Done
            </button>
          </section>
        )}
      </div>
    </div>
  )
}
