import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'
import { lockScroll } from '../lib/smoothScroll'

const SEEN_KEY = 'dg-intro-seen'

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

// Short counting intro, shown once per browser session. The page renders underneath,
// so crawlers and assistive tech never wait on it.
export default function Loader({ onDone }) {
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(() => !hasSeenIntro())
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible || reduce) {
      setVisible(false)
      onDone()
      return
    }

    const unlock = lockScroll()
    const duration = 1500
    let frame
    let timeout
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
        return
      }
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* storage unavailable: intro simply replays next visit */
      }
      timeout = setTimeout(() => setVisible(false), 250)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
      unlock()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && !reduce && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="label absolute left-8 top-8 md:left-12 md:top-12"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {profile.name}
          </motion.p>
          <motion.p
            className="meta absolute bottom-10 left-8 md:bottom-14 md:left-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            compiling portfolio…
          </motion.p>
          <motion.p
            className="serif-i absolute bottom-6 right-8 text-[clamp(4rem,10vw,8.5rem)] leading-none tabular-nums md:bottom-10 md:right-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {String(count).padStart(3, '0')}
          </motion.p>
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line/60">
            <div
              className="h-full origin-left bg-gradient-to-r from-accent-soft to-accent shadow-[0_0_8px_rgba(255,138,61,0.35)]"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
