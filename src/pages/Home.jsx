import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import SEO from '../components/SEO'
import Intro from '../sections/Intro'
import About from '../sections/About'
import Work from '../sections/Work'
import Experience from '../sections/Experience'
import Contact from '../sections/Contact'
import { scrollToSection, sectionForPath } from '../hooks/useGoToSection'
import { scrollToY } from '../lib/smoothScroll'

const SEO_BY_SECTION = {
  about: { title: 'About | Demayne Govender, Full-Stack & BPM Engineer' },
  work: { title: 'Selected Work | Demayne Govender, Full-Stack Engineer' },
  experience: { title: 'Experience | Demayne Govender, Full-Stack Engineer' },
  contact: { title: 'Contact | Demayne Govender, Full-Stack Engineer' },
}

export default function Home({ ready }) {
  const location = useLocation()
  const reduce = useReducedMotion()
  const sectionId = sectionForPath(location.pathname)

  // Scroll to the section named by the URL: smoothly for in-page navigation,
  // instantly on a fresh load of a deep link (/projects, /contact, ...).
  useEffect(() => {
    if (!ready) return
    const immediate = !location.state?.smooth || reduce
    if (!sectionId) {
      if (location.state?.smooth) scrollToY(0, { immediate })
      return
    }
    // Let layout settle (fonts, pinned scenes) before measuring.
    const id = requestAnimationFrame(() => scrollToSection(sectionId, { immediate }))
    return () => cancelAnimationFrame(id)
    // location.key changes on every navigation, including repeat clicks on the same link
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, location.key])

  const seo = SEO_BY_SECTION[sectionId] || {}
  const description =
    'Demayne Govender is a full-stack software engineer in Johannesburg, South Africa, specialising in business process automation: low-code BPM workflows on Aurachain, RPA, and React, Node.js and Python applications. Azure certified, hands-on AWS.'

  return (
    <>
      <SEO
        title={seo.title || 'Demayne Govender | Full-Stack Engineer · Cloud & Business Process Automation'}
        description={description}
        canonicalPath="/"
        ogImage="https://demaynegovenderprofile.vercel.app/logo.png"
      />
      <Intro ready={ready} />
      <About />
      <Work />
      <Experience />
      <Contact />
    </>
  )
}
