import {
  lazy,
  Suspense,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'

import About from './components/About'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Loader from './components/Loader'
import Marquee from './components/Marquee'
import Metrics from './components/Metrics'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import Services from './components/Services'
import SmoothScroll from './components/SmoothScroll'
import Testimonials from './components/Testimonials'

const BookingModal = lazy(() =>
  import('./components/BookingModal'),
)

function getInitialLoaderState() {
  try {
    return (
      sessionStorage.getItem('vyra-loader-seen') !==
      'true'
    )
  } catch {
    return true
  }
}

function removeInitialHash() {
  if (!window.location.hash) return

  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}`,
  )
}

function resetScrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  })

  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function App() {
  useLayoutEffect(() => {
    const previousRestoration =
      window.history.scrollRestoration

    window.history.scrollRestoration = 'manual'

    /*
     * Prevent #contact, #services and other hashes
     * from restoring a section after refresh.
     */
    removeInitialHash()
    resetScrollToTop()

    let secondAnimationFrame

    const firstAnimationFrame =
      requestAnimationFrame(() => {
        resetScrollToTop()

        secondAnimationFrame =
          requestAnimationFrame(resetScrollToTop)
      })

    const shortReset = window.setTimeout(
      resetScrollToTop,
      50,
    )

    const finalReset = window.setTimeout(
      resetScrollToTop,
      250,
    )

    const handlePageShow = () => {
      removeInitialHash()
      resetScrollToTop()
    }

    window.addEventListener(
      'pageshow',
      handlePageShow,
    )

    return () => {
      cancelAnimationFrame(firstAnimationFrame)

      if (secondAnimationFrame) {
        cancelAnimationFrame(secondAnimationFrame)
      }

      window.clearTimeout(shortReset)
      window.clearTimeout(finalReset)

      window.removeEventListener(
        'pageshow',
        handlePageShow,
      )

      window.history.scrollRestoration =
        previousRestoration
    }
  }, [])

  /*
   * Production setting:
   * loader appears once per browser session.
   */
  const [showLoader, setShowLoader] = useState(true)

  /*
   * For temporary loader testing, use this instead:
   *
   * const [showLoader, setShowLoader] = useState(true)
   */

  const [bookingOpen, setBookingOpen] =
    useState(false)

  const [selectedService, setSelectedService] =
    useState('')

  const openBooking = (serviceId = '') => {
    setSelectedService(serviceId)
    setBookingOpen(true)
  }

  const closeBooking = useCallback(() => {
    setBookingOpen(false)
  }, [])

  const finishLoader = useCallback(() => {
    try {
      sessionStorage.setItem(
        'vyra-loader-seen',
        'true',
      )
    } catch {
      // Continue when sessionStorage is unavailable.
    }

    removeInitialHash()
    resetScrollToTop()
    setShowLoader(false)

    /*
     * Reset again after React removes the loader
     * and Lenis recalculates the page.
     */
    requestAnimationFrame(() => {
      resetScrollToTop()

      window.setTimeout(resetScrollToTop, 50)
      window.setTimeout(resetScrollToTop, 200)
    })
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b0b0b] font-['Manrope',sans-serif] text-[#f3f2ea] selection:bg-[#d7ff62] selection:text-black">
      {showLoader && (
        <Loader onComplete={finishLoader} />
      )}

      <SmoothScroll />

      <a
        href="#main-content"
        className="fixed left-4 top-3 z-200 -translate-y-20 rounded-full bg-[#d7ff62] px-5 py-3 font-bold text-black transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <Navbar onBook={openBooking} />

      <main id="main-content">
        <Hero onBook={openBooking} />
        <Marquee />
        <Services onBook={openBooking} />
        <About onBook={openBooking} />
        <Metrics />
        <Testimonials />
        <Pricing onBook={openBooking} />
        <Faq />
        <Contact onBook={openBooking} />
      </main>

      <Footer />

      {bookingOpen && (
        <Suspense fallback={null}>
          <BookingModal
            open={bookingOpen}
            initialService={selectedService}
            onClose={closeBooking}
          />
        </Suspense>
      )}
    </div>
  )
}