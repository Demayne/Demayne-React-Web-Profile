import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { sections } from '../data/content'
import { scrollToY } from '../lib/smoothScroll'

// Every section has a real URL (/about, /projects, ...). Navigating to one is
// handled by Home, which scrolls to the matching section.
export const HOME_PATHS = ['/', ...sections.map((s) => s.path)]

export const sectionForPath = (pathname) => sections.find((s) => s.path === pathname)?.id

// Where each section "starts" for navigation purposes. The About scene is pinned,
// so land a little way in, once the first words have drifted into view.
export function sectionScrollY(id) {
  const el = document.getElementById(id)
  if (!el) return null
  const top = el.getBoundingClientRect().top + window.scrollY
  return id === 'about' ? top + window.innerHeight * 0.45 : top
}

export function scrollToSection(id, options) {
  const y = sectionScrollY(id)
  if (y !== null) scrollToY(y, options)
}

export function useGoToSection() {
  const navigate = useNavigate()
  return useCallback(
    (event, path) => {
      if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1)) return
      event?.preventDefault()
      navigate(path, { state: { smooth: true } })
    },
    [navigate],
  )
}
