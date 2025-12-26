import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend, FiCheckCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (formData.message.length > 2000) {
      setError('Message must be less than 2000 characters.')
      setIsSubmitting(false)
      return
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service not configured. Please contact the site administrator.')
      }

      emailjs.init(publicKey)

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      )

      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)

    } catch (err) {
      console.error('Contact form error:', err)
      setIsSubmitting(false)
      
      let errorMessage = 'Sorry, there was an error sending your message. Please try again later.'
      
      if (err.text) {
        if (err.text.includes('Invalid template ID') || err.text.includes('Invalid service ID')) {
          errorMessage = 'Email service configuration error. Please contact the site administrator.'
        } else if (err.text.includes('Quota exceeded')) {
          errorMessage = 'Email quota exceeded. Please try again later or contact me directly.'
        } else {
          errorMessage = err.text
        }
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <>
      <SEO
        title="Contact | Demayne Govender - Full-Stack Engineer"
        description="Get in touch with Demayne Govender, Full-Stack Engineer. Available for freelance projects, collaborations, and opportunities. React, Node.js, Python developer."
        keywords="Contact Full Stack Developer, Hire React Developer, Web Developer Contact, Software Engineer Contact, Freelance Developer"
        ogImage="https://demayne-govender-portfolio.vercel.app/Demayne%20Govender%20Logo.png"
      />
      <section className="pt-20 sm:pt-24 min-h-screen bg-gray-900 relative overflow-x-hidden px-0" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full overflow-x-hidden"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.header className="text-center mb-8 sm:mb-12 px-2 overflow-x-hidden" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-100 font-display break-words leading-tight">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed break-words px-2">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision. Let's connect!
          </p>
        </motion.header>

        <div className="flex justify-center px-2">
          <motion.section 
            className="bg-gray-800/50 p-4 sm:p-6 lg:p-10 rounded-lg sm:rounded-xl border border-gray-700/50 w-full max-w-2xl overflow-x-hidden" 
            variants={itemVariants} 
            aria-labelledby="contact-form-heading"
          >
          <h2 id="contact-form-heading" className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 text-gray-100 font-display">
            Send a Message
          </h2>
          
          {isSubmitted && (
            <motion.div
              className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-500/20 border-2 border-green-500/50 rounded-lg text-green-400 font-medium mb-4 sm:mb-6 text-sm sm:text-base"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
            >
              <FiCheckCircle className="text-lg sm:text-xl flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="flex-1">Message sent successfully! I'll get back to you soon.</span>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-red-500/20 border-2 border-red-500/50 rounded-lg text-red-400 font-medium mb-4 sm:mb-6 text-sm sm:text-base"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
            >
              <span className="flex-1 break-words">{error}</span>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 overflow-x-hidden" noValidate style={{ maxWidth: '100%' }}>
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="name" className="font-semibold text-gray-100 text-xs sm:text-sm">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg text-sm sm:text-base font-sans transition-all duration-200 bg-gray-900 text-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 focus:ring-2 sm:focus:ring-4 focus:ring-indigo-500/20 min-h-[44px] w-full"
                aria-required="true"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="email" className="font-semibold text-gray-100 text-xs sm:text-sm">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg text-sm sm:text-base font-sans transition-all duration-200 bg-gray-900 text-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 focus:ring-2 sm:focus:ring-4 focus:ring-indigo-500/20 min-h-[44px] w-full"
                aria-required="true"
                autoComplete="email"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="subject" className="font-semibold text-gray-100 text-xs sm:text-sm">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
                className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg text-sm sm:text-base font-sans transition-all duration-200 bg-gray-900 text-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 focus:ring-2 sm:focus:ring-4 focus:ring-indigo-500/20 min-h-[44px] w-full"
                aria-required="true"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <label htmlFor="message" className="font-semibold text-gray-100 text-xs sm:text-sm break-words">
                  Message <span className="text-gray-400 font-normal text-xs">(max 2000)</span> <span className="text-red-400">*</span>
                </label>
                <span className={`text-xs font-medium ${
                  formData.message.length > 2000 
                    ? 'text-red-400' 
                    : 'text-gray-400'
                }`}>
                  {formData.message.length} / 2000
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                maxLength={2000}
                placeholder="Hi! I'm interested in working with you..."
                className={`px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg text-sm sm:text-base font-sans transition-all duration-200 bg-gray-900 text-gray-100 resize-y min-h-[120px] sm:min-h-[150px] w-full focus:outline-none focus:ring-2 sm:focus:ring-4 ${
                  formData.message.length > 2000
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
                aria-required="true"
                aria-invalid={formData.message.length > 2000}
              />
              {formData.message.length > 2000 && (
                <p className="text-xs text-red-400 mt-1 break-words" role="alert">
                  Message is too long. Maximum 2000 characters. You have {formData.message.length} characters.
                </p>
              )}
            </div>
            
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md active:shadow-lg transition-all duration-200 text-sm sm:text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              aria-label="Send message"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FiSend aria-hidden="true" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
          </motion.section>
        </div>
      </motion.div>
    </section>
    </>
  )
}

export default Contact
