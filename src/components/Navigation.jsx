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

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 transition-all duration-300 ${
        isScrolled ? 'shadow-lg shadow-indigo-900/20 bg-gray-900/98' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-gray-100 font-bold text-xl hover:scale-105 transition-transform">
          <img src="/Demayne Govender Logo.png" alt="Demayne Govender Logo" className="h-10 w-auto object-contain brightness-110" />
          <span className="font-display">Demayne Govender</span>
        </Link>

        <ul className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } md:flex items-center gap-8 list-none md:static fixed left-0 top-[70px] flex-col md:flex-row w-full md:w-auto bg-gray-900 md:bg-transparent shadow-lg md:shadow-none py-8 md:py-0 transition-all duration-300 z-40`}>
          {navLinks.map((link) => (
            <li key={link.path} className="relative">
              <Link
                to={link.path}
                className={`relative text-gray-300 font-medium text-sm md:text-base transition-colors duration-300 py-2 block ${
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
          className="md:hidden bg-transparent border-none text-gray-100 text-2xl cursor-pointer p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </motion.nav>
  )
}

export default Navigation

