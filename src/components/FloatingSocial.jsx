import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const FloatingSocial = () => {
  const socialLinks = [
    {
      icon: <FiGithub />,
      label: 'GitHub',
      url: 'https://github.com/Demayne',
      color: 'hover:bg-gray-800',
    },
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/demayne-govender-452890316',
      color: 'hover:bg-blue-600',
    },
    {
      icon: <FiMail />,
      label: 'Email',
      url: 'mailto:govender.demayne@gmail.com',
      color: 'hover:bg-indigo-600',
    },
  ]

  return (
    <motion.div
      className="fixed left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3 lg:gap-4"
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      aria-label="Social media links"
      style={{ willChange: 'transform' }}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target={social.url.startsWith('mailto:') ? undefined : '_blank'}
          rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-100 text-lg lg:text-xl transition-all duration-300 ${social.color} hover:text-white hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
          whileHover={{ scale: 1.15, x: 6 }}
          whileTap={{ scale: 0.95 }}
          aria-label={social.label}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
          style={{ willChange: 'transform' }}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  )
}

export default FloatingSocial

