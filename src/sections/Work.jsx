import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { FiArrowUpRight, FiPlus } from 'react-icons/fi'
import { Reveal, RevealLines, useIsWide } from '../components/motion'
import { cloudProjects, profile, projects } from '../data/content'

const featured = projects.filter((p) => p.featured)
const more = projects.filter((p) => !p.featured)
const total = projects.length + cloudProjects.length

export default function Work() {
  const reduce = useReducedMotion()
  const github = profile.socials.find((s) => s.label === 'GitHub')

  return (
    <section id="work" data-section="work" aria-labelledby="work-title" className="relative border-t border-line">
      <header className="container-site grid min-h-[70svh] content-center gap-10 py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="label">Selected work</p>
          <p className="meta mt-3">02 / {String(total).padStart(2, '0')} projects</p>
        </Reveal>
        <div className="lg:col-span-9">
          <RevealLines id="work-title" as="h2" className="display-lg" lines={['Things I’ve', <span key="b" className="serif-i text-accent">designed & built.</span>]} />
          <Reveal as="p" delay={0.15} className="t-body mt-8 max-w-xl">
            Platforms, low-code apps, cloud infrastructure and automation, each shipped end to end. Keep scrolling to step through them.
          </Reveal>
        </div>
      </header>

      <ol>
        {featured.map((project, i) => (
          <li key={project.slug}>
            {reduce ? <StaticProject project={project} index={i} /> : <PinnedProject project={project} index={i} />}
          </li>
        ))}
      </ol>

      <CloudProjects />
      <MoreBuilds startIndex={featured.length} />

      <Reveal className="container-site flex flex-col items-start justify-between gap-6 border-t border-line py-16 sm:flex-row sm:items-center">
        <p className="t-body">More experiments, coursework and contributions live on GitHub.</p>
        <a href={github.href} target="_blank" rel="noopener noreferrer" className="btn-ghost group">
          Browse GitHub
          <FiArrowUpRight aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  )
}

// Each project owns a tall scroll segment; its card is pinned while the segment passes,
// sliding in from alternating sides with the details on the opposite side.
function PinnedProject({ project, index }) {
  const ref = useRef(null)
  const wide = useIsWide()
  const fromLeft = index % 2 === 0
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Visible while the segment's top is at the top of the viewport (focus / deep-link safe).
  const opacity = useTransform(scrollYProgress, [0.14, 0.32, 0.66, 0.84], [0, 1, 1, 0])
  // Transform + opacity only, which the compositor animates without repainting the card.
  const scale = useTransform(scrollYProgress, [0.14, 0.32, 0.66, 0.84], [0.96, 1, 1, 0.96])
  const x = useTransform(scrollYProgress, [0.14, 0.34], [wide ? (fromLeft ? '-8vw' : '8vw') : '0vw', '0vw'])
  const y = useTransform(scrollYProgress, [0.14, 0.34, 0.66, 0.84], wide ? ['0vh', '0vh', '0vh', '-8vh'] : ['10vh', '0vh', '0vh', '-6vh'])
  const sideY = useTransform(scrollYProgress, [0.14, 0.84], ['12vh', '-12vh'])

  return (
    <div ref={ref} className="relative h-[190svh]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-[calc(6vh+env(safe-area-inset-bottom))] md:items-center md:pb-0">
        <div className={`container-site flex w-full gap-12 ${fromLeft ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center md:justify-between`}>
          <motion.div style={{ opacity, scale, x, y }} className="w-full will-change-transform md:w-[min(44vw,600px)]">
            <ProjectCard project={project} index={index} />
          </motion.div>

          {wide && (
            <motion.div style={{ opacity, y: sideY }} className="hidden w-[min(34vw,440px)] md:block" aria-hidden="true">
              <p className="serif-i text-[clamp(6rem,12vw,11rem)] leading-none text-fg/10">{String(index + 1).padStart(2, '0')}</p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {project.highlights.map((h) => (
                  <li key={h} className="meta flex gap-3 text-fg-soft">
                    <span className="text-accent">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function StaticProject({ project, index }) {
  return (
    <div className="container-site py-12">
      <div className={`md:w-[min(44vw,600px)] ${index % 2 ? 'md:ml-auto' : ''}`}>
        <ProjectCard project={project} index={index} />
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const Wrapper = project.github ? 'a' : 'div'
  const linkProps = project.github
    ? { href: project.github, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': 'Source' }
    : {}

  return (
    <article className="group relative">
      <Wrapper {...linkProps} className="block border border-line bg-ink-800 transition-colors duration-500 hover:border-line-strong">
        <CodePanel project={project} index={index} />
        <div className="p-5 sm:p-6">
          <p className="label-sm mb-2 text-fg/55">{project.kind}</p>
          <h3 className="t-card-title">{project.title}</h3>
          <p className="mt-3 text-fs-0 font-light leading-relaxed text-fg-soft md:line-clamp-2">{project.summary}</p>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
            <span className="meta truncate">{project.tech.slice(0, 4).join(' · ')}</span>
            {project.github ? (
              <span className="meta flex shrink-0 items-center gap-1.5 text-fg transition-colors group-hover:text-accent">
                view source <FiArrowUpRight aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            ) : (
              <span className="meta shrink-0">{project.note || 'source private'}</span>
            )}
          </div>
        </div>
        <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-700 ease-out-expo group-hover:w-full" aria-hidden="true" />
      </Wrapper>
    </article>
  )
}

// A small, syntax-coloured "spec" of the project in place of a screenshot.
function CodePanel({ project, index }) {
  const shown = project.tech.slice(0, 5)
  const more = project.tech.length - shown.length
  const k = (s) => <span className="text-fg-soft">&quot;{s}&quot;</span>
  const v = (s) => <span className="text-accent-soft">&quot;{s}&quot;</span>
  const p = (s) => <span className="text-fg-faint">{s}</span>

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-b border-line bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,138,61,0.10),transparent_60%)] bg-ink-800">
      <div className="flex items-center justify-between border-b border-line px-5 py-2.5">
        <span className="meta">{project.slug}.json</span>
        <span className="meta">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <pre className="overflow-hidden px-5 py-4 font-mono text-[0.72rem] leading-[1.75] sm:text-[0.78rem]">
        {p('{')}
        {'\n  '}{k('type')}{p(': ')}{v(project.kind.toLowerCase())}{p(',')}
        {'\n  '}{k('status')}{p(': ')}{v(project.status || (project.github ? 'open source' : 'private'))}{p(',')}
        {'\n  '}{k('stack')}{p(': [')}
        {shown.map((t, i) => (
          <span key={t}>
            {v(t)}
            {i < shown.length - 1 && p(', ')}
          </span>
        ))}
        {more > 0 && p(`, +${more}`)}
        {p(']')}
        {'\n'}{p('}')}
      </pre>
    </div>
  )
}

// Hands-on AWS work. Each row expands (native <details>, so it works with keyboards
// and screen readers out of the box) to show what was built and what it taught.
function CloudProjects() {
  return (
    <div className="container-site border-t border-line py-[clamp(4rem,10vw,7rem)]">
      <div className="mb-10 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <p className="label">Cloud</p>
          <p className="meta mt-3">aws labs · via nextwork</p>
        </Reveal>
        <div className="lg:col-span-9">
          <RevealLines as="h3" className="display-md" lines={['Cloud infrastructure,', <span key="c" className="serif-i text-accent">built by hand.</span>]} />
          <Reveal as="p" delay={0.1} className="t-body mt-5 max-w-xl">
            Hands-on AWS labs covering VPC architecture, private subnets, layered network security and IAM least privilege, configured in the console and tested end to end.
          </Reveal>
        </div>
      </div>

      <ul className="border-t border-line">
        {cloudProjects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 0.05} className="border-b border-line">
            <details className="group/d">
              <summary className="grid cursor-pointer list-none gap-3 py-7 md:grid-cols-12 md:items-center md:gap-6 [&::-webkit-details-marker]:hidden">
                <span className="meta md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="md:col-span-6">
                  <span className="block text-fs-2 font-semibold tracking-[-0.02em] transition-colors group-hover/d:text-accent">{p.title}</span>
                  <span className="meta mt-1 block">
                    {p.focus} · {p.duration}
                  </span>
                </span>
                <span className="meta hidden text-fg-soft md:col-span-4 md:block">{p.tech.slice(0, 3).join(' · ')}</span>
                <span className="flex items-center justify-between md:col-span-1 md:justify-end">
                  <span className="meta md:hidden">details</span>
                  <FiPlus aria-hidden="true" className="h-5 w-5 text-fg-faint transition-transform duration-500 ease-out-expo group-open/d:rotate-45 group-open/d:text-accent" />
                </span>
              </summary>
              <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-6 md:col-start-2">
                  <p className="t-body">{p.summary}</p>
                  <ul className="mt-6 space-y-2.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-fs-0 font-light leading-relaxed text-fg-soft">
                        <span className="meta pt-px text-accent" aria-hidden="true">→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-5">
                  <p className="label-sm">What it taught me</p>
                  <p className="serif-i mt-3 text-fs-2 leading-snug text-fg">{p.learned}</p>
                  <p className="meta mt-6 text-fg-soft">{p.tech.join(' · ')}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta group mt-4 inline-flex items-center gap-1.5 py-2 text-fg"
                    aria-label={`${p.title} project brief on NextWork`}
                  >
                    <span className="link-underline">project brief</span>
                    <FiArrowUpRight aria-hidden="true" className="text-fg-faint group-hover:text-accent" />
                  </a>
                </div>
              </div>
            </details>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}

// Smaller builds, one line each.
function MoreBuilds({ startIndex }) {
  if (!more.length) return null
  return (
    <div className="container-site border-t border-line py-[clamp(4rem,10vw,7rem)]">
      <Reveal className="mb-6 flex items-baseline justify-between gap-6">
        <h3 className="label">More builds</h3>
        <p className="meta">frontend · games · collections</p>
      </Reveal>
      <ul className="border-t border-line">
        {more.map((p, i) => {
          const Tag = p.github ? 'a' : 'div'
          const linkProps = p.github ? { href: p.github, target: '_blank', rel: 'noopener noreferrer', 'data-cursor': 'Source' } : {}
          return (
            <Reveal as="li" key={p.slug} delay={i * 0.05} className="border-b border-line">
              <Tag {...linkProps} className="group grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="meta md:col-span-1">{String(startIndex + i + 1).padStart(2, '0')}</span>
                <span className="md:col-span-4">
                  <span className="block text-fs-1 font-semibold tracking-[-0.01em] transition-colors group-hover:text-accent">{p.title}</span>
                  <span className="meta block">{p.kind.toLowerCase()}</span>
                </span>
                <span className="text-fs-0 font-light leading-relaxed text-fg-soft md:col-span-6">{p.summary}</span>
                {p.github && (
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="hidden text-fg-faint transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:col-span-1 md:block md:justify-self-end"
                  />
                )}
              </Tag>
            </Reveal>
          )
        })}
      </ul>
    </div>
  )
}
