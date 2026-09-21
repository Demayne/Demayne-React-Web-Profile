import Lenis from 'lenis'

// One Lenis instance for the whole app. Falls back to native scrolling when the
// visitor prefers reduced motion or is on a touch-first device (phones, tablets),
// where native momentum scrolling is already smooth and never lags behind the finger.
let lenis = null
let locks = 0

export function startSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const touchFirst = window.matchMedia('(hover: none), (pointer: coarse)').matches
  if (reduce || touchFirst) return () => {}

  // lerp (rather than a fixed duration) keeps the page glued to the wheel: each frame
  // closes a share of the remaining distance, so there's no long tail after you stop.
  lenis = new Lenis({
    lerp: 0.14,
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: false,
  })

  let frame
  const raf = (time) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToY(y, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(y, { immediate, duration: 1.2, force: true })
  } else {
    window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' })
  }
}

// Reference-counted so a dialog opened from the mobile menu doesn't unlock early.
export function lockScroll() {
  locks += 1
  if (locks === 1) {
    lenis?.stop()
    document.body.classList.add('is-locked')
  }
  return () => {
    locks = Math.max(0, locks - 1)
    if (locks === 0) {
      lenis?.start()
      document.body.classList.remove('is-locked')
    }
  }
}
