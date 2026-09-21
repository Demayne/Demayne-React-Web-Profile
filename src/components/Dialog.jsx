import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './motion'
import { lockScroll } from '../lib/smoothScroll'

// Accessible modal shell: locks scroll, traps focus, closes on Escape or backdrop click.
// Render inside <AnimatePresence> so it can animate out.
export default function Dialog({ labelledBy, onClose, className = '', children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const unlock = lockScroll()
    const previous = document.activeElement
    const focusables = () =>
      panelRef.current?.querySelectorAll('a[href], button:not([disabled]), input, textarea, iframe, [tabindex]:not([tabindex="-1"])') ?? []
    focusables()[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlock()
      previous?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/80 p-3 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        data-lenis-prevent
        className={`w-full border border-line bg-ink-800 ${className}`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
