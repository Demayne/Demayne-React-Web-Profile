import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = event.target.closest('nav')
      const button = event.target.closest('button[aria-label="Toggle menu"]')
      if (isMobileMenuOpen && !nav && !button) {
        setIsMobileMenuOpen(false)
      }
    }
    
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-indigo-900/10 bg-gray-900/98' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-3 text-gray-100 font-bold text-lg hover:opacity-80 transition-opacity z-50 relative min-w-0"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Demayne Govender - Home"
          >
            <img 
              src="/Demayne Govender Logo.png" 
              alt="" 
              className="h-10 w-auto object-contain brightness-110 flex-shrink-0" 
              width="40"
              height="40"
              loading="eager"
            />
            <span className="font-display truncate">Demayne Govender</span>
          </Link>

          <ul 
            className={`${
              isMobileMenuOpen ? 'flex' : 'hidden'
            } md:flex items-center gap-8 list-none md:static fixed left-0 top-[72px] right-0 flex-col md:flex-row w-full md:w-auto bg-gray-900 md:bg-transparent shadow-xl md:shadow-none py-8 md:py-0 transition-all duration-300 z-50 border-b border-gray-800 md:border-0 max-h-[calc(100vh-72px)] overflow-y-auto`}
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.path} className="relative">
                <Link
                  to={link.path}
                  className={`relative text-gray-300 font-medium text-base transition-colors duration-300 py-3 md:py-2 block w-full md:w-auto text-center md:text-left ${
                    isActive(link.path) ? 'text-indigo-400' : 'hover:text-indigo-400 focus:text-indigo-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                      layoutId="nav-indicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden bg-transparent border-none text-gray-100 text-2xl cursor-pointer p-2 z-50 relative touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
            onClick={(e) => {
              e.stopPropagation()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </motion.div>
          </button>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation
