import { CountUp, Reveal, RevealLines } from '../components/motion'
import { useOverlays } from '../components/ResumeModal'
import { bio, stack, statement, stats } from '../data/content'

export default function About() {
  const { openResume } = useOverlays()

  return (
    <section data-section="about" aria-labelledby="about-title" className="relative border-t border-line py-[clamp(6rem,14vw,11rem)]">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="label">About</p>
            <p className="meta mt-3">01 / who i am</p>
          </Reveal>

          <div className="lg:col-span-9">
            <RevealLines
              id="about-title"
              as="h2"
              className="display-lg"
              lines={[statement[0], <span key="s" className="serif-i text-accent">{statement[1]}</span>]}
            />

            <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
              {bio.map((p, i) => (
                <Reveal as="p" key={i} delay={i * 0.08} className="t-body">
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
              <button type="button" onClick={openResume} className="btn-primary">
                View résumé
              </button>
            </Reveal>
          </div>
        </div>

        {/* Numbers */}
        <dl className="mt-24 grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className={`flex flex-col gap-3 border-b border-line py-8 lg:border-b-0 lg:py-10 ${i % 2 === 1 ? 'pl-6' : 'pr-6'} lg:px-0 ${i > 0 ? 'lg:border-l lg:pl-8' : ''}`}
            >
              <dt className="meta order-2">{s.label}</dt>
              <dd className="order-1 text-fs-5 font-semibold leading-none tracking-[-0.03em] sm:text-fs-6">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Toolkit, as numbered rows */}
        <div className="mt-24">
          <Reveal className="mb-6 flex items-baseline justify-between gap-6">
            <h3 className="label">Toolkit</h3>
            <p className="meta">what i build with</p>
          </Reveal>
          <ol className="border-t border-line">
            {Object.entries(stack).map(([group, items], i) => (
              <Reveal as="li" key={group} delay={i * 0.04} className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-6">
                <span className="meta md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <h4 className="text-fs-2 font-semibold tracking-[-0.02em] md:col-span-4">{group}</h4>
                <p className="meta text-fg-soft md:col-span-7">{items.join(' · ')}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
