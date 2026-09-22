import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowDown, FiArrowUp } from 'react-icons/fi'
import { scrollToY } from '../lib/smoothScroll'

const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Touch counterpart to the desktop wheel: one tap advances roughly one screen with the
 * same eased motion, and the ring tracks progress through the page. Hidden on pointer
 * devices (which have a wheel) and while the page is still at the very top, where the
 * hero's own cue already points down.
 */
export default function SectionJump() {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const [shown, setShown] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const read = () => {
      ticking.current = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      const y = window.scrollY
      const ratio = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0
      setProgress(ratio)
      setAtEnd(ratio > 0.985)
      // Stay out of the way until the visitor has started moving.
      setShown(y > window.innerHeight * 0.5)
    }
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const jump = () => {
    const immediate = Boolean(reduce)
    if (atEnd) {
      scrollToY(0, { immediate })
      return
    }
    // One screen per tap, the way a wheel flick behaves: the scroll-driven scenes stay
    // legible instead of being skipped. Section jumps live in the menu.
    const step = window.innerHeight * 0.9
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrollToY(Math.min(window.scrollY + step, max), { immediate })
  }

  const label = atEnd ? 'Back to top' : 'Scroll to the next section'
  const Icon = atEnd ? FiArrowUp : FiArrowDown

  return (
    <motion.button
      type="button"
      onClick={jump}
      aria-label={label}
      title={label}
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-30 grid h-14 w-14 place-items-center rounded-full border border-line-strong bg-ink/95 text-fg shadow-lg shadow-black/40 backdrop-blur-none active:border-accent active:text-accent lg:hidden"
      initial={false}
      animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: shown ? 'auto' : 'none' }}
    >
      {/* Ring showing how far through the page you are. */}
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-line" />
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-accent"
          style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
        />
      </svg>
      <Icon aria-hidden="true" className="relative h-5 w-5" />
    </motion.button>
  )
}
