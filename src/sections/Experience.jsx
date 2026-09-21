import { FiArrowUpRight } from 'react-icons/fi'
import { Reveal, RevealLines } from '../components/motion'
import { credentials, experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" data-section="experience" aria-labelledby="experience-title" className="relative border-t border-line py-[clamp(6rem,14vw,11rem)]">
      <div className="container-site">
        <div className="mb-16 grid gap-10 lg:mb-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label">Experience</p>
            <p className="meta mt-3">03 / where i’ve worked</p>
          </Reveal>
          <div className="lg:col-span-9">
            <RevealLines id="experience-title" as="h2" className="display-lg" lines={['Where I’ve', <span key="i" className="serif-i text-accent">made an impact.</span>]} />
          </div>
        </div>

        <ol className="border-t border-line">
          {experience.map((job, i) => (
            <li key={job.company} className="border-b border-line">
              <Reveal className="grid gap-5 py-10 lg:grid-cols-12 lg:gap-6 lg:py-12">
                <span className="meta lg:col-span-1 lg:pt-2">{String(i + 1).padStart(2, '0')}</span>
                <div className="lg:col-span-5">
                  <h3 className="t-card-title">{job.role}</h3>
                  <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
                    <span className="serif-i text-fs-2 text-accent">{job.company}</span>
                    <span className="meta">{job.period.toLowerCase()}</span>
                  </p>
                </div>
                <ul className="space-y-2.5 lg:col-span-6 lg:pt-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-fs-0 font-light leading-relaxed text-fg-soft">
                      <span className="meta pt-px text-accent" aria-hidden="true">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <div id="credentials" className="mt-28">
          <Reveal className="mb-6 flex items-baseline justify-between gap-6">
            <h3 className="label">Credentials</h3>
            <p className="meta">certified · bpm · cloud · rpa</p>
          </Reveal>

          <ul className="border-t border-line">
            {credentials.map((c) => (
              <Reveal as="li" key={c.title} className="grid gap-4 border-b border-line py-7 md:grid-cols-12 md:items-center md:gap-6">
                <span className="meta md:col-span-2">{c.date.toLowerCase()}</span>
                <div className="md:col-span-5">
                  <p className="text-fs-1 font-semibold tracking-[-0.01em]">{c.title}</p>
                  <p className="meta mt-1">{c.issuer}</p>
                </div>
                <div className="md:col-span-2">
                  {c.badge && <span className="label-sm border border-accent/50 px-2.5 py-1.5 text-accent">{c.badge}</span>}
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 md:col-span-3 md:justify-end">
                  {c.pdf && (
                    <a href={c.pdf} target="_blank" rel="noopener noreferrer" className="meta group inline-flex items-center gap-1.5 py-2 text-fg" aria-label={`View ${c.title} certificate (PDF)`}>
                      <span className="link-underline">certificate</span>
                      <FiArrowUpRight aria-hidden="true" className="text-fg-faint group-hover:text-accent" />
                    </a>
                  )}
                  {c.portfolio && (
                    <a href={c.portfolio} target="_blank" rel="noopener noreferrer" className="meta group inline-flex items-center gap-1.5 py-2 text-fg" aria-label={`Verify ${c.title} online`}>
                      <span className="link-underline">verified</span>
                      <FiArrowUpRight aria-hidden="true" className="text-fg-faint group-hover:text-accent" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
