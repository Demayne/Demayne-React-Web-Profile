import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Availability, LocalTime } from '../components/Chrome'
import { Reveal } from '../components/motion'
import { useOverlays } from '../components/ResumeModal'
import { profile } from '../data/content'

export default function Contact() {
  const { openContact, openResume } = useOverlays()
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section
      id="contact"
      data-section="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden border-t border-line px-6 pb-28 pt-32 text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.09),transparent_62%)]" />

      <Reveal className="relative">
        <p className="label mb-8">Contact</p>
        <h2 id="contact-title" className="t-line mx-auto mb-8 max-w-[22ch]">
          Have a project or a role in mind? <span className="serif-i text-fg">Let’s talk.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="relative">
        <div className="relative inline-block">
          <AnimatePresence>
            {copied && (
              <motion.span
                role="status"
                className="meta absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap text-accent"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                copied to clipboard
              </motion.span>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={copyEmail}
            className="t-mail break-all transition-colors duration-300 hover:text-accent"
            data-cursor="Copy"
            aria-label={`Copy email address ${profile.email}`}
          >
            {profile.email}
          </button>
        </div>
        <p className="meta mt-3">
          click to copy · or{' '}
          <a href={`mailto:${profile.email}`} className="text-fg-soft underline underline-offset-4 hover:text-fg">
            open your mail app
          </a>
        </p>
      </Reveal>

      <Reveal delay={0.18} className="relative mt-12 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={openContact} className="btn-primary">
          Send a message
        </button>
        <button type="button" onClick={openResume} className="btn-ghost">
          View résumé
        </button>
      </Reveal>

      <Reveal delay={0.24} className="relative mt-10 flex flex-col items-center gap-4">
        <Availability className="text-fs-0 text-fg-soft" />
        <p className="label-sm text-white/35">
          {profile.socials.map((s, i) => (
            <span key={s.label}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-white/55 transition-colors hover:text-white/90">
                {s.label}
              </a>
            </span>
          ))}
        </p>
      </Reveal>

      <footer className="label-sm absolute inset-x-0 bottom-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 text-fg-faint">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span aria-hidden="true">·</span>
        <Link to="/privacy" className="py-1 transition-colors hover:text-fg">
          Privacy
        </Link>
        <span aria-hidden="true">·</span>
        <span>
          Johannesburg <LocalTime />
        </span>
      </footer>
    </section>
  )
}
