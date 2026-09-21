import { useEffect, useRef } from 'react'

const ACCENT = [255, 138, 61]
const LIGHT = [245, 245, 245]
// Alpha is quantised so the whole field draws in a handful of fills per frame
// (one path per colour/alpha bucket) instead of one fillStyle per particle.
const ALPHA_LEVELS = 6

// Sample the lit pixels of a glyph. It's drawn at 1/gap scale, so each offscreen pixel is
// one grid slot: a readback ~gap² smaller than sampling the full-size canvas.
function sampleGlyph(text, width, height, gap) {
  const cols = Math.ceil(width / gap)
  const rows = Math.ceil(height / gap)
  const off = document.createElement('canvas')
  off.width = cols
  off.height = rows
  const ctx = off.getContext('2d', { willReadFrequently: true })
  const size = Math.min(height * 0.62, width * 0.5) / gap
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `300 ${size}px Manrope, system-ui, sans-serif`
  ctx.fillText(text, cols / 2, rows / 2)
  const { data } = ctx.getImageData(0, 0, cols, rows)
  const points = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (data[(y * cols + x) * 4 + 3] > 128) points.push([x * gap, y * gap])
    }
  }
  return points
}

/**
 * A field of particles that holds the shape of a code brace, then scatters into a
 * slowly turning ring as `progress` (a framer MotionValue, 0 → 1) advances.
 * Static when the visitor prefers reduced motion; paused when off screen.
 */
export default function ParticleField({ progress, glyph = '{ }', reduce = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let buckets = []
    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    let running = false
    const pointer = { x: -9999, y: -9999 }

    const build = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.5 : 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const gap = width < 768 ? 5 : 6
      let targets = sampleGlyph(glyph, width, height, gap)
      const cap = width < 768 ? 800 : 1800
      if (targets.length > cap) {
        const step = targets.length / cap
        targets = Array.from({ length: cap }, (_, i) => targets[Math.floor(i * step)])
      }

      const cx = width / 2
      const cy = height / 2
      const rx = Math.max(width * 0.42, 260)
      const ry = Math.max(height * 0.3, 180)

      buckets = []
      for (const [r, g, b] of [LIGHT, ACCENT]) {
        for (let i = 0; i < ALPHA_LEVELS; i++) {
          const alpha = 0.35 + (0.55 * (i + 0.5)) / ALPHA_LEVELS
          buckets.push({ style: `rgba(${r},${g},${b},${alpha.toFixed(3)})`, items: [] })
        }
      }

      for (const [tx, ty] of targets) {
        const accent = Math.random() < 0.2 ? ALPHA_LEVELS : 0
        buckets[accent + Math.floor(Math.random() * ALPHA_LEVELS)].items.push({
          tx,
          ty,
          angle: Math.random() * Math.PI * 2,
          radius: 0.55 + Math.random() * 0.75,
          cx,
          cy,
          rx,
          ry,
          size: Math.random() < 0.08 ? 1.8 : 1 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
          speed: 0.00006 + Math.random() * 0.00012,
        })
      }
    }

    const draw = (time) => {
      const p = reduce ? 0 : Math.min(Math.max(progress?.get() ?? 0, 0), 1)
      // 0 → 0.35: brace dissolves into the ring. 0.85 → 1: the field fades away.
      const scatter = Math.min(p / 0.35, 1)
      const ease = scatter < 0.5 ? 4 * scatter ** 3 : 1 - (-2 * scatter + 2) ** 3 / 2
      const fade = p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1

      ctx.clearRect(0, 0, width, height)
      if (fade <= 0) return
      ctx.globalAlpha = fade
      const t = time * 0.0012
      for (const { style, items } of buckets) {
        ctx.beginPath()
        for (const pt of items) {
          let x = pt.tx
          let y = pt.ty
          if (ease > 0) {
            const a = pt.angle + (reduce ? 0 : time * pt.speed * (0.3 + ease))
            x += (pt.cx + Math.cos(a) * pt.rx * pt.radius - pt.tx) * ease
            y += (pt.cy + Math.sin(a) * pt.ry * pt.radius - pt.ty) * ease
          }
          if (!reduce) {
            const drift = Math.sin(t + pt.phase) * 1.2
            x += drift
            y += drift
          }

          const dx = x - pointer.x
          const dy = y - pointer.y
          const dist = dx * dx + dy * dy
          if (dist < 6400) {
            const push = (1 - dist / 6400) * 14
            const len = Math.sqrt(dist) || 1
            x += (dx / len) * push
            y += (dy / len) * push
          }
          ctx.rect(x, y, pt.size, pt.size)
        }
        ctx.fillStyle = style
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // The loop stops itself off screen; the observer restarts it on the way back.
    const loop = (time) => {
      if (!visible) {
        running = false
        return
      }
      draw(time)
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce || !buckets.length) return
      running = true
      frame = requestAnimationFrame(loop)
    }

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    const init = () => {
      build()
      if (reduce) draw(0)
      else start()
    }

    // Wait for Manrope so the brace is sampled from the real font, not a fallback. The font
    // stylesheet loads async, so wait for window load (which includes it) before fonts.ready.
    // Then build when the main thread is idle, so it never lands in the first paint's way.
    const pageLoaded =
      document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }))
    const fontsReady = pageLoaded.then(() => document.fonts?.ready)
    let cancelled = false
    let idleId
    const whenIdle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 1))
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout
    fontsReady.then(() => {
      if (!cancelled) idleId = whenIdle(() => !cancelled && init(), { timeout: 800 })
    })

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    observer.observe(canvas)

    // Only rebuild when the canvas itself changed size: mobile browsers fire resize as the
    // URL bar shows and hides, and re-sampling the glyph mid-scroll causes a visible hitch.
    let resizeTimer
    const onResize = () => {
      if (canvas.clientWidth === width && canvas.clientHeight === height) return
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        build()
        if (reduce) draw(0)
      }, 150)
    }
    window.addEventListener('resize', onResize)
    if (!reduce && finePointer) window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      cancelled = true
      cancelIdle(idleId)
      cancelAnimationFrame(frame)
      observer.disconnect()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [glyph, progress, reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
}
