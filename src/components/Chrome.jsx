import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, sections } from '../data/content'

function formatTime() {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: profile.timezone,
  }).format(new Date())
}

// Live local time in Johannesburg.
export function LocalTime({ className = '' }) {
  const [time, setTime] = useState(formatTime)
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime()), 15_000)
    return () => clearInterval(id)
  }, [])
  return (
    <span className={className}>
      <time>{time}</time> sast
    </span>
  )
}

export function Availability({ className = '' }) {
  if (!profile.available) return null
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden="true" />
      Open to new opportunities
    </span>
  )
}

// Bottom-right readout of where you are on the page. Desktop only, purely decorative.
export function StatusChip({ activeSection }) {
  const index = sections.findIndex((s) => s.id === activeSection)
  const label = index >= 0 ? `${String(index + 1).padStart(2, '0')} ${sections[index].label.toLowerCase()}` : '00 intro'

  return (
    <div
      aria-hidden="true"
      className="meta pointer-events-none fixed bottom-5 right-5 z-40 hidden items-center gap-3 border border-line bg-ink/95 px-3 py-2 uppercase tracking-[0.14em] lg:flex"
    >
      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
      <span className="relative inline-block min-w-[9ch] overflow-hidden text-fg-soft">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={label}
            className="block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-line-strong">/</span>
      <span>johannesburg <LocalTime /></span>
    </div>
  )
}
