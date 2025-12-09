import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

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
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate message length - 10 characters minimum (allows short professional messages)
    if (formData.message.trim().length < 10) {
      setError('Please provide at least a brief message (10 characters minimum).')
      setIsSubmitting(false)
      return
    }

    if (formData.message.length > 2000) {
      setError('Message must be less than 2000 characters.')
      setIsSubmitting(false)
      return
    }

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email service not configured. Please contact the site administrator.')
      }

      // Initialize EmailJS with public key
      emailjs.init(publicKey)

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      )

      // Success
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setIsSubmitted(false), 5000)

    } catch (err) {
      console.error('Contact form error:', err)
      setIsSubmitting(false)
      
      // More specific error messages
      let errorMessage = 'Sorry, there was an error sending your message. Please try again later.'
      
      if (err.text) {
        // EmailJS specific errors
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

  const contactInfo = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'govender.demayne@gmail.com',
      link: 'mailto:govender.demayne@gmail.com',
    },
    {
      icon: <FiMapPin />,
      label: 'Location',
      value: 'Pretoria, Gauteng, ZA',
      link: null,
    },
  ]

  const socialLinks = [
    {
      icon: <FiGithub />,
      label: 'GitHub',
      url: 'https://github.com/Demayne',
    },
    {
      icon: <FiLinkedin />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/demayne-govender-452890316',
    },
  ]

  return (
    <div className="pt-24 min-h-screen bg-gray-900" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl font-bold mb-4 text-gray-100 font-display">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision. Let's connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Info */}
          <motion.div className="bg-gray-800 p-10 rounded-2xl shadow-lg shadow-indigo-900/20 border border-gray-700" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8 text-gray-100 font-display">Contact Information</h2>
            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gray-800 rounded-xl border-l-4 border-indigo-500 transition-all duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-2xl text-indigo-400 flex-shrink-0 mt-1">{info.icon}</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{info.label}</span>
                    {info.link ? (
                      <a href={info.link} className="text-base text-gray-100 font-medium hover:text-indigo-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-base text-gray-100 font-medium">{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-100">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-gray-800 border-2 border-gray-700 rounded-xl text-gray-100 text-2xl transition-all duration-300 hover:bg-indigo-500 hover:border-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/50"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="lg:col-span-2 bg-gray-800 p-10 rounded-2xl shadow-lg shadow-indigo-900/20 border border-gray-700" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8 text-gray-100 font-display">Send a Message</h2>
            {isSubmitted && (
              <motion.div
                className="flex items-center gap-3 p-4 bg-green-500/20 border-2 border-green-500/50 rounded-lg text-green-400 font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FiCheckCircle className="text-xl" />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}
            {error && (
              <motion.div
                className="flex items-center gap-3 p-4 bg-red-500/20 border-2 border-red-500/50 rounded-lg text-red-400 font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>{error}</span>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-gray-100 text-sm">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="px-4 py-3 border-2 border-gray-700 rounded-lg text-base font-sans transition-all duration-300 bg-gray-900 text-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-gray-100 text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="px-4 py-3 border-2 border-gray-700 rounded-lg text-base font-sans transition-all duration-300 bg-gray-900 text-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-semibold text-gray-100 text-sm">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="px-4 py-3 border-2 border-gray-700 rounded-lg text-base font-sans transition-all duration-300 bg-gray-900 text-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="message" className="font-semibold text-gray-100 text-sm">
                    Message <span className="text-gray-400 font-normal">(10-2000 characters)</span>
                  </label>
                  <span className={`text-xs font-medium ${
                    formData.message.trim().length < 10 && formData.message.length > 0
                      ? 'text-red-400' 
                      : formData.message.length > 2000 
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
                  rows="6"
                  minLength={10}
                  maxLength={2000}
                  placeholder="Hi! I'm interested in working with you..."
                  className={`px-4 py-3 border-2 rounded-lg text-base font-sans transition-all duration-300 bg-gray-900 text-gray-100 resize-y min-h-[150px] focus:outline-none focus:ring-4 ${
                    formData.message.length > 0 && formData.message.trim().length < 10
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : formData.message.length > 2000
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`}
                ></textarea>
                {formData.message.length > 0 && formData.message.trim().length < 10 && (
                  <p className="text-xs text-red-400 mt-1">
                    Please provide a brief message ({10 - formData.message.trim().length} more characters needed).
                  </p>
                )}
                {formData.message.length > 2000 && (
                  <p className="text-xs text-red-400 mt-1">
                    Message is too long. Maximum 2000 characters. You have {formData.message.length} characters.
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Contact
