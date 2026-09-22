import { useCallback, useEffect, useRef, useState } from 'react'

// Where the rail sits in the viewport, as a fraction of its height.
const TOP = 0.24
const BOTTOM = 0.86
const HANDLE = 48

/**
 * Touch counterpart to a desktop scrollbar: press the handle and drag to move through the
 * page, one-to-one with your finger. Hidden on pointer devices, which have a wheel.
 *
 * It lives in the right-hand gutter (a 24px column, narrower than the page's own side
 * padding) so it never covers a link, and widens under your finger while you drag.
 * Dragging maps finger position straight to scroll position with no smoothing, so the
 * scroll-driven scenes track the finger exactly the way they track a wheel.
 */
export default function ScrollRail() {
  const railRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [dragging, setDragging] = useState(false)
  const frame = useRef(0)
  const active = useRef(false)

  // Follow the page while the visitor scrolls normally.
  useEffect(() => {
    const read = () => {
      frame.current = 0
      if (active.current) return // dragging drives the value instead
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0)
    }
    const onScroll = () => {
      if (frame.current) return
      frame.current = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Map a point on the rail to a scroll position and go there immediately.
  const scrollFromPoint = useCallback((clientY) => {
    const rail = railRef.current
    if (!rail) return
    const rect = rail.getBoundingClientRect()
    const usable = Math.max(rect.height - HANDLE, 1)
    const ratio = Math.min(Math.max((clientY - rect.top - HANDLE / 2) / usable, 0), 1)
    const max = document.documentElement.scrollHeight - window.innerHeight
    setProgress(ratio)
    window.scrollTo(0, ratio * max)
  }, [])

  const onPointerDown = (e) => {
    e.preventDefault()
    active.current = true
    setDragging(true)
    scrollFromPoint(e.clientY)
    // Capture keeps the drag alive if the finger slides off the rail. It can throw for a
    // pointer id the browser will not capture, which must not abort the drag itself.
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch {
      /* drag still works through the move handler */
    }
  }

  const onPointerMove = (e) => {
    if (!active.current) return
    e.preventDefault()
    scrollFromPoint(e.clientY)
  }

  const endDrag = (e) => {
    if (!active.current) return
    active.current = false
    setDragging(false)
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId)
    } catch {
      /* nothing was captured */
    }
  }

  // Keyboard equivalent, so the control is not pointer-only.
  const onKeyDown = (e) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const screen = window.innerHeight * 0.9
    const moves = {
      ArrowDown: window.scrollY + screen * 0.25,
      ArrowUp: window.scrollY - screen * 0.25,
      PageDown: window.scrollY + screen,
      PageUp: window.scrollY - screen,
      Home: 0,
      End: max,
    }
    if (!(e.key in moves)) return
    e.preventDefault()
    window.scrollTo({ top: Math.min(Math.max(moves[e.key], 0), max), behavior: 'smooth' })
  }

  return (
    <div
      ref={railRef}
      className="fixed right-0 z-30 w-6 touch-none select-none lg:hidden"
      style={{ top: `${TOP * 100}svh`, height: `${(BOTTOM - TOP) * 100}svh` }}
    >
      {/* Track, with the travelled part picked out in the accent colour. */}
      <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-accent/70"
        style={{ height: `${progress * 100}%` }}
      />

      <div
        role="slider"
        tabIndex={0}
        aria-label="Scroll the page"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuetext={`${Math.round(progress * 100)} percent down the page`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="absolute inset-x-0 grid cursor-grab touch-none place-items-center"
        style={{ top: `calc(${progress * 100}% - ${progress * HANDLE}px)`, height: `${HANDLE}px` }}
      >
        <span
          className={`flex flex-col items-center justify-center gap-[3px] rounded-full border transition-all duration-200 ${
            dragging ? 'h-12 w-11 border-accent bg-accent text-ink' : 'h-10 w-2 border-line-strong bg-fg-faint/80 text-transparent'
          }`}
        >
          {/* Grip lines appear once it is held, when there is room for them. */}
          <span aria-hidden="true" className={`block h-px bg-current transition-all ${dragging ? 'w-4' : 'w-0'}`} />
          <span aria-hidden="true" className={`block h-px bg-current transition-all ${dragging ? 'w-4' : 'w-0'}`} />
          <span aria-hidden="true" className={`block h-px bg-current transition-all ${dragging ? 'w-4' : 'w-0'}`} />
        </span>
      </div>
    </div>
  )
}
