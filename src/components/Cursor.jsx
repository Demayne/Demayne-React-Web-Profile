import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const INTERACTIVE = 'a, button, summary, [role="button"], [data-cursor]'

// A dot pinned to the pointer and a ring that follows it closely. Fine pointers only;
// touch devices and reduced-motion users keep the native cursor.
export default function Cursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const rootRef = useRef(null)
  const dotRef = useRef(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Stiff and light: the ring settles within a couple of frames instead of trailing.
  const ringX = useSpring(x, { stiffness: 1100, damping: 60, mass: 0.25 })
  const ringY = useSpring(y, { stiffness: 1100, damping: 60, mass: 0.25 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches && !reduce)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')
    let shown = false
    let lastEl = null

    const move = (e) => {
      // The dot is written straight to the DOM in the event, skipping any scheduling.
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      x.set(e.clientX)
      y.set(e.clientY)
      if (!shown && rootRef.current) {
        shown = true
        rootRef.current.style.opacity = '1'
      }
    }
    const over = (e) => {
      const el = e.target.closest?.(INTERACTIVE) ?? null
      if (el === lastEl) return
      lastEl = el
      setHovering(Boolean(el))
      setLabel(el?.getAttribute('data-cursor') || '')
    }
    const leave = () => {
      shown = false
      if (rootRef.current) rootRef.current.style.opacity = '0'
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = label ? 88 : hovering ? 56 : 32

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]" style={{ opacity: 0 }}>
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border mix-blend-difference will-change-transform"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? 'rgba(237,237,232,1)' : 'rgba(237,237,232,0)',
          borderColor: hovering ? 'rgba(237,237,232,0.9)' : 'rgba(237,237,232,0.45)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink">{label}</span>}
      </motion.div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <span
          className={`block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-200 ${hovering ? 'scale-0' : 'scale-100'}`}
        />
      </div>
    </div>
  )
}
