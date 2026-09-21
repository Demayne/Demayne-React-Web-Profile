import { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import { StatusChip } from './components/Chrome'
import { OverlayProvider } from './components/ResumeModal'
import Home from './pages/Home'
import { HOME_PATHS } from './hooks/useGoToSection'
import { startSmoothScroll, scrollToY } from './lib/smoothScroll'

const Privacy = lazy(() => import('./pages/Privacy'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Highlights whichever [data-section] block sits across the middle of the viewport.
function useActiveSection(enabled) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.getAttribute('data-section')
          setActive(id === 'top' ? null : id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    // Sections inside the pinned intro overlap, so the intro is tracked by scroll
    // progress instead: the hero for its first stretch, then "about".
    const targets = [...document.querySelectorAll('[data-section]')].filter((el) => !el.closest('[data-intro]'))
    targets.forEach((t) => observer.observe(t))

    const intro = document.querySelector('[data-intro]')
    const onScroll = () => {
      if (!intro) return
      const rect = intro.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0 || rect.top > 0 || rect.bottom < window.innerHeight / 2) return
      setActive(-rect.top / scrollable < 0.14 ? null : 'about')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [enabled])
  return active
}

export default function App() {
  const location = useLocation()
  const [ready, setReady] = useState(false)
  const onHome = HOME_PATHS.includes(location.pathname)
  const activeSection = useActiveSection(onHome)

  useEffect(() => startSmoothScroll(), [])

  // Standalone pages always open at the top.
  useEffect(() => {
    if (!onHome) scrollToY(0, { immediate: true })
  }, [location.pathname, onHome])

  return (
    <MotionConfig reducedMotion="user">
      <OverlayProvider>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Loader onDone={() => setReady(true)} />
        <Cursor />
        <Navigation activeSection={activeSection} />

        <main id="main-content" tabIndex={-1} className="outline-none">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              {HOME_PATHS.map((path) => (
                <Route key={path} path={path} element={<Home ready={ready} />} />
              ))}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {!onHome && <Footer />}
        {onHome && <StatusChip activeSection={activeSection} />}
        <div className="grain" aria-hidden="true" />
      </OverlayProvider>
    </MotionConfig>
  )
}
