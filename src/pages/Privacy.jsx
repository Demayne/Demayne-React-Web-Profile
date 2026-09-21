import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Reveal, RevealLines } from '../components/motion'
import { profile } from '../data/content'

const UPDATED = 'February 3, 2026'

// Each block: optional intro, list items, optional note. Links are real elements, not injected HTML.
const policy = [
  {
    title: 'Information we collect',
    intro: 'When you use the contact form, we collect:',
    items: [
      'Your name and email address',
      'Subject and message content',
      'Timestamp of your submission',
    ],
    note: 'We do not collect sensitive personal information such as payment details, identity numbers or financial information.',
  },
  {
    title: 'How we use your information',
    intro: 'Your information is used solely to:',
    items: [
      'Respond to your enquiries and messages',
      'Communicate with you regarding potential opportunities',
      'Improve this website and its user experience',
      'Comply with legal obligations',
    ],
    note: 'We do not sell, rent or trade your personal information to third parties.',
  },
  {
    title: 'Data storage and security',
    items: [
      'Contact form submissions are processed through EmailJS, a third-party email service',
      'Your data is transmitted securely using industry-standard encryption',
      'We implement appropriate technical and organisational measures to protect your data',
      'Data is stored only as long as necessary to fulfil the purposes outlined in this policy',
      'We retain contact form submissions for up to 2 years for record-keeping purposes',
    ],
  },
  {
    title: 'Third-party services',
    intro: 'This website uses the following third-party services:',
    services: [
      { name: 'EmailJS', role: 'Contact form email delivery', href: 'https://www.emailjs.com/legal/privacy-policy/' },
      { name: 'Vercel', role: 'Website hosting and deployment', href: 'https://vercel.com/legal/privacy-policy' },
      { name: 'Google Fonts', role: 'Web font delivery', href: 'https://policies.google.com/privacy' },
    ],
  },
  {
    title: 'Your rights',
    intro: 'You have the right to:',
    items: [
      'Request access to your personal data',
      'Request correction of inaccurate data',
      'Request deletion of your data',
      'Object to processing of your data',
      'Request data portability',
      'Withdraw consent at any time',
    ],
    note: 'To exercise these rights, contact me using the details below.',
  },
  {
    title: 'Cookies and storage',
    intro:
      'This website does not set tracking cookies. It stores a single session flag in your browser so the intro animation only plays once per visit. You can clear it at any time through your browser settings.',
  },
  {
    title: 'Children’s privacy',
    intro:
      'This website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.',
  },
  {
    title: 'Changes to this policy',
    intro:
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. You are advised to review this policy periodically.',
  },
]

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Demayne Govender"
        description="How Demayne Govender's portfolio website collects, uses and protects your personal information when you get in touch."
      />
      <article className="pb-24 pt-[calc(72px+clamp(4rem,10vw,8rem))]">
        <div className="container-site">
          <header className="grid gap-8 border-b border-line pb-16 lg:grid-cols-12">
            <p className="label lg:col-span-3 lg:pt-4">Legal · Updated {UPDATED}</p>
            <div className="lg:col-span-9">
              <RevealLines as="h1" className="display-lg" lines={['Privacy policy']} animateOnMount />
              <Reveal as="p" delay={0.2} className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-soft">
                Your privacy matters. This policy explains how your personal information is collected, used and protected when you visit this portfolio.
              </Reveal>
            </div>
          </header>

          <ol>
            {policy.map((block, i) => (
              <li key={block.title} className="border-b border-line">
                <Reveal className="grid gap-6 py-12 lg:grid-cols-12">
                  <p className="font-mono text-xs text-accent lg:col-span-3 lg:pt-2">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="font-display text-2xl font-medium tracking-tight lg:col-span-3">{block.title}</h2>
                  <div className="space-y-4 leading-relaxed text-fg-soft lg:col-span-6">
                    {block.intro && <p>{block.intro}</p>}
                    {block.items && (
                      <ul className="space-y-2">
                        {block.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-[0.75em] h-px w-4 shrink-0 bg-line-strong" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {block.services && (
                      <ul className="divide-y divide-line border-y border-line">
                        {block.services.map((s) => (
                          <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                            <span>
                              <span className="text-fg">{s.name}</span> · {s.role}
                            </span>
                            <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-fg">
                              Privacy policy ↗
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                    {block.note && <p className="text-fg">{block.note}</p>}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-16 grid gap-6 lg:grid-cols-12">
            <h2 className="label lg:col-span-3">Questions</h2>
            <div className="lg:col-span-9">
              <p className="display-md">
                <a href={`mailto:${profile.email}`} className="link-underline break-all">
                  {profile.email}
                </a>
              </p>
              <p className="mt-6 text-sm text-fg-faint">
                Or use the{' '}
                <Link to="/contact" className="text-fg-soft underline underline-offset-4 hover:text-fg">
                  contact form
                </Link>
                . This policy is effective as of {UPDATED}.
              </p>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  )
}
