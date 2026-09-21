import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

// Fade in from below. Opacity and transform only, so the compositor can run it without
// main-thread work competing with scrolling.
export function Reveal({ as = 'div', delay = 0, y = 32, className, children, ...rest }) {
  const Tag = motion[as]
  const reduce = useReducedMotion()
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Each line slides up from behind a mask. `lines` is an array of strings or nodes.
export function RevealLines({ lines, as = 'h2', className, lineClassName = '', delay = 0, animateOnMount, ...rest }) {
  const Tag = as
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  // animateOnMount: undefined = trigger on scroll; boolean = caller controls timing.
  const show = animateOnMount === undefined ? inView : animateOnMount

  return (
    <Tag ref={ref} className={className} {...rest}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%' }}
            animate={show ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Numbers count up once visible.
export function CountUp({ value, decimals = 0, prefix = '', suffix = '', className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, { duration: 1.8, ease: EASE, onUpdate: setDisplay })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// Tracks whether the viewport is landscape-ish (desktop layout for pinned scenes).
export function useIsWide() {
  const query = '(min-width: 768px) and (orientation: landscape)'
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setWide(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return wide
}
