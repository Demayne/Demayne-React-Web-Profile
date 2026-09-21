import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE } from './motion'
import { useOverlays } from './ResumeModal'
import { profile, sections } from '../data/content'
import { useGoToSection } from '../hooks/useGoToSection'
import { lockScroll } from '../lib/smoothScroll'

export default function Navigation({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const go = useGoToSection()
  const { openResume } = useOverlays()
  const toggleRef = useRef(null)

  useEffect(() => setMenuOpen(false), [location.key])

  useEffect(() => {
    if (!menuOpen) return
    const unlock = lockScroll()
    const toggle = toggleRef.current
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      unlock()
      document.removeEventListener('keydown', onKey)
      toggle?.focus()
    }
  }, [menuOpen])

  return (
    <>
      {/* Difference blending keeps the bar legible over anything without a background. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-6 py-5 md:px-12 md:py-7">
          <Link to="/" state={{ smooth: true }} className="label pointer-events-auto whitespace-nowrap py-2 text-fg" aria-label={`${profile.name}, home`}>
            {profile.name}
          </Link>

          <nav aria-label="Primary" className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 md:block">
            <ul className="flex items-center gap-8">
              {sections.map((s) => {
                const active = activeSection === s.id
                return (
                  <li key={s.id} className="relative">
                    <a
                      href={s.path}
                      onClick={(e) => go(e, s.path)}
                      aria-current={active ? 'true' : undefined}
                      className={`block py-2 text-fs-0 transition-colors duration-300 ${active ? 'text-accent' : 'text-fg-soft hover:text-white'}`}
                    >
                      {s.label}
                    </a>
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        aria-hidden="true"
                        className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="pointer-events-auto flex items-center gap-6">
            <button type="button" onClick={openResume} className="meta hidden py-2 text-fg-soft transition-colors hover:text-white md:block">
              résumé ↗
            </button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="label flex h-11 items-center gap-3 text-fg md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span className={`absolute left-0 h-px w-full bg-fg transition-transform duration-500 ease-out-expo ${menuOpen ? 'top-1.5 rotate-45' : 'top-0.5'}`} />
                <span className={`absolute left-0 h-px w-full bg-fg transition-transform duration-500 ease-out-expo ${menuOpen ? 'top-1.5 -rotate-45' : 'top-2.5'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-8 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={s.path}
                  onClick={(e) => go(e, s.path)}
                  className="flex items-baseline gap-4 border-b border-line py-5"
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.06 }}
                >
                  <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-fs-5 font-semibold tracking-[-0.03em]">{s.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="flex flex-wrap items-center justify-between gap-4 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <button type="button" onClick={() => { setMenuOpen(false); openResume() }} className="btn-primary">
                View résumé
              </button>
              <div className="label-sm flex gap-5">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="py-2 text-fg-soft">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
