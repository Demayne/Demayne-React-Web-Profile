import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 transition-all duration-300 ${
          isScrolled ? 'shadow-lg shadow-indigo-900/20 bg-gray-900/98' : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative z-50">
          <Link to="/" className="flex items-center gap-3 text-gray-100 font-bold text-xl hover:scale-105 transition-transform z-50 relative" onClick={() => setIsMobileMenuOpen(false)}>
            <img src="/Demayne Govender Logo.png" alt="Demayne Govender Logo" className="h-10 w-auto object-contain brightness-110" />
            <span className="font-display">Demayne Govender</span>
          </Link>

          <ul className={`${
            isMobileMenuOpen ? 'flex' : 'hidden'
          } md:flex items-center gap-6 md:gap-8 list-none md:static fixed left-0 top-[70px] right-0 flex-col md:flex-row w-full md:w-auto bg-gray-900 md:bg-transparent shadow-xl md:shadow-none py-8 md:py-0 transition-all duration-300 z-50 border-b border-gray-800 md:border-0 max-h-[calc(100vh-70px)] overflow-y-auto`}>
          {navLinks.map((link) => (
            <li key={link.path} className="relative">
              <Link
                to={link.path}
                className={`relative text-gray-300 font-medium text-base md:text-base transition-colors duration-300 py-3 md:py-2 block w-full md:w-auto text-center md:text-left touch-manipulation ${
                  isActive(link.path) ? 'text-indigo-400' : 'hover:text-indigo-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

          <button
            className="md:hidden bg-transparent border-none text-gray-100 text-2xl cursor-pointer p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>
    </>
  )
}

export default Navigation

