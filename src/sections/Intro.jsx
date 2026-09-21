import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import ParticleField from '../components/ParticleField'
import { EASE, useIsWide } from '../components/motion'
import { constellation, profile, stack } from '../data/content'

/**
 * The opening scroll scene. One pinned stage spans the hero and the About words:
 * the name holds, dissolves as you scroll, and the particle brace behind it
 * scatters into a ring while facts about Demayne drift in around it.
 */
export default function Intro({ ready }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const fieldScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.25])

  if (reduce) return <StaticIntro />

  return (
    <div ref={ref} data-intro className="relative h-[520svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: fieldScale }}>
          <ParticleField progress={scrollYProgress} />
        </motion.div>
        <Hero progress={scrollYProgress} ready={ready} />
        <Constellation progress={scrollYProgress} />
      </div>
    </div>
  )
}

function Hero({ progress, ready }) {
  // Transform + opacity only: scroll-linked blur on text this large repaints every frame.
  const opacity = useTransform(progress, [0, 0.12], [1, 0])
  const scale = useTransform(progress, [0, 0.12], [1, 0.96])
  const y = useTransform(progress, [0, 0.12], ['0vh', '-6vh'])
  const arrow = useTransform(progress, [0, 0.03], [1, 0])

  const rise = (delay) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section id="top" aria-label="Introduction" data-section="top" className="absolute inset-0">
      <motion.div style={{ opacity, scale, y }} className="flex h-full flex-col items-center justify-center px-6 text-center">
        {/* The name is the largest paint on the page, so it's visible from the first frame
            (opacity 0 would hold back LCP until the loader finishes) and only slides into place. */}
        <motion.h1
          initial={{ y: 16 }}
          animate={ready ? { y: 0 } : { y: 16 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          className="t-hero text-white/60 sm:whitespace-nowrap"
        >
          <span className="block sm:inline">{profile.firstName}</span> <span className="block sm:inline">{profile.lastName}</span>
        </motion.h1>
        <motion.p {...rise(0.16)} className="t-sub mt-6 pl-[0.42em]">
          {profile.disciplines.map((d, i) => (
            <span key={d} className="block sm:inline">
              {i > 0 && <span className="hidden sm:inline" aria-hidden="true"> · </span>}
              {d}
            </span>
          ))}
        </motion.p>
        <motion.p {...rise(0.26)} className="t-tag mt-4">
          {profile.tagline}
        </motion.p>
      </motion.div>

      <motion.div style={{ opacity: arrow }} className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.1, delay: 0.5 }}>
          <FiChevronDown className="h-6 w-6 animate-pulse-soft text-fg-faint" />
        </motion.div>
      </motion.div>
    </section>
  )
}

const KIND_CLASS = {
  serif: 't-word-lg',
  sans: 't-word-md',
  tech: 'meta text-[0.8rem] uppercase tracking-[0.2em] text-fg-soft',
}

function Constellation({ progress }) {
  const wide = useIsWide()
  const count = constellation.length
  const groupOpacity = useTransform(progress, [0.9, 0.97], [1, 0])

  return (
    <section id="about" data-section="about" aria-labelledby="about-scene-title" className="absolute inset-0">
      <h2 id="about-scene-title" className="sr-only">
        About Demayne
      </h2>
      {/* Screen readers get the same facts as a plain list. */}
      <ul className="sr-only">
        {constellation.filter((w) => w.kind !== 'tech').map((w) => (
          <li key={w.text}>{w.text}</li>
        ))}
        <li>Works with {Object.values(stack).flat().join(', ')}</li>
      </ul>

      <motion.div style={{ opacity: groupOpacity }} className="absolute inset-0" aria-hidden="true">
        {constellation.map((word, i) => {
          // Words arrive one after another between 16% and 82% of the scene.
          const start = 0.16 + (i / count) * 0.62
          return <Word key={word.text} word={word} progress={progress} start={start} wide={wide} />
        })}
      </motion.div>
    </section>
  )
}

function Word({ word, progress, start, wide }) {
  const range = [start, start + 0.07]
  const opacity = useTransform(progress, range, [0, 1])
  const scale = useTransform(progress, range, [0.92, 1])
  const y = useTransform(progress, [start, start + 0.07, 1], [28, 0, -40])
  const [x, top] = wide ? word.d : word.m

  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}>
      <motion.span style={{ opacity, scale, y }} className={`block whitespace-nowrap ${KIND_CLASS[word.kind]}`}>
        {word.text}
      </motion.span>
    </div>
  )
}

// Reduced-motion version: the same content, laid out statically.
function StaticIntro() {
  return (
    <>
      <section id="top" data-section="top" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 opacity-60">
          <ParticleField reduce />
        </div>
        <div className="relative">
          <h1 className="t-hero text-white/60">
            <span className="block sm:inline">{profile.firstName}</span> <span className="block sm:inline">{profile.lastName}</span>
          </h1>
          <p className="t-sub mt-6">{profile.disciplines.join(' · ')}</p>
          <p className="t-tag mt-4">{profile.tagline}</p>
        </div>
      </section>
      <section id="about" data-section="about" aria-labelledby="about-scene-title" className="container-site py-24">
        <h2 id="about-scene-title" className="sr-only">
          About Demayne
        </h2>
        <ul className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-6 text-center">
          {constellation.map((w) => (
            <li key={w.text} className={KIND_CLASS[w.kind]}>
              {w.text}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
