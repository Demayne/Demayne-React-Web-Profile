import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
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
  const [isConfigured, setIsConfigured] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  
  const mountedRef = useRef(true)
  const successTimerRef = useRef(null)

  // Email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '')
  }

  // Initialize EmailJS and check configuration
  useEffect(() => {
    mountedRef.current = true

    const initEmailJS = async () => {
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        if (!serviceId || !templateId || !publicKey) {
          console.error('EmailJS environment variables missing')
          setError('Contact form is temporarily unavailable. Please contact me directly via email.')
          setIsConfigured(false)
          return
        }

        // Initialize EmailJS only once
        if (!window.emailjsInitialized) {
          emailjs.init(publicKey)
          window.emailjsInitialized = true
          console.log('EmailJS initialized successfully')
        }

        setIsConfigured(true)
      } catch (err) {
        console.error('EmailJS initialization error:', err)
        setError('Failed to initialize contact form. Please try again later.')
        setIsConfigured(false)
      } finally {
        if (mountedRef.current) {
          setIsInitializing(false)
        }
      }
    }

    initEmailJS()

    return () => {
      mountedRef.current = false
      // Clear any pending timers
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
      }
    }
  }, [])

  // Handle success message timeout
  useEffect(() => {
    if (isSubmitted) {
      successTimerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setIsSubmitted(false)
        }
      }, 5000)
    }

    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
      }
    }
  }, [isSubmitted])

  // Form validation
  const validateForm = useCallback(() => {
    const { name, email, subject, message } = formData

    if (!name.trim()) {
      return { valid: false, error: 'Name is required' }
    }
    
    if (!email.trim()) {
      return { valid: false, error: 'Email is required' }
    }
    
    if (!validateEmail(email)) {
      return { valid: false, error: 'Please enter a valid email address' }
    }
    
    if (!subject.trim()) {
      return { valid: false, error: 'Subject is required' }
    }
    
    if (!message.trim()) {
      return { valid: false, error: 'Message is required' }
    }
    
    if (message.length > 2000) {
      return { 
        valid: false, 
        error: `Message is too long. Maximum 2000 characters. You have ${message.length} characters.`
      }
    }

    return { valid: true, error: null }
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    const sanitizedValue = name === 'email' ? value : sanitizeInput(value)
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue,
    }))

    // Clear error when user starts typing
    if (error && !error.includes('temporarily unavailable') && !error.includes('not configured')) {
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (isSubmitting || !isConfigured) {
      return
    }

    // Validate form
    const validation = validateForm()
    if (!validation.valid) {
      setError(validation.error)
      
      // Focus the first invalid field
      const { name, email, subject, message } = formData
      if (!name.trim()) {
        document.getElementById('name')?.focus()
      } else if (!email.trim() || !validateEmail(email)) {
        document.getElementById('email')?.focus()
      } else if (!subject.trim()) {
        document.getElementById('subject')?.focus()
      } else if (!message.trim() || message.length > 2000) {
        document.getElementById('message')?.focus()
      }
      
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

      if (!serviceId || !templateId) {
        throw new Error('Email service configuration error')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }
      )

      if (mountedRef.current) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Announce success for screen readers
        const announcement = document.getElementById('success-announcement')
        if (announcement) {
          announcement.textContent = 'Message sent successfully'
          setTimeout(() => announcement.textContent = '', 1000)
        }
      }

    } catch (err) {
      console.error('Contact form error:', err)
      
      if (mountedRef.current) {
        setIsSubmitting(false)
        
        let errorMessage = 'Sorry, there was an error sending your message. Please try again later.'
        
        if (err.text) {
          if (err.text.includes('Invalid template') || err.text.includes('Invalid service')) {
            errorMessage = 'Email service configuration error. Please contact me directly.'
          } else if (err.text.includes('Quota exceeded') || err.text.includes('rate limit')) {
            errorMessage = 'Daily message limit reached. Please try again tomorrow or contact me directly.'
          } else if (err.text.includes('Invalid user_id')) {
            errorMessage = 'Email service configuration error. Please contact the site administrator.'
          } else {
            // Limit error message length
            errorMessage = err.text.length > 100 ? errorMessage : err.text
          }
        } else if (err.message) {
          errorMessage = err.message
        }
        
        setError(errorMessage)
        
        // Announce error for screen readers
        const announcement = document.getElementById('error-announcement')
        if (announcement) {
          announcement.textContent = errorMessage
          setTimeout(() => announcement.textContent = '', 1000)
        }
      }
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Hidden live region for screen reader announcements
  const LiveRegion = () => (
    <div className="sr-only" aria-live="assertive" aria-atomic="true">
      <div id="success-announcement"></div>
      <div id="error-announcement"></div>
    </div>
  )

  return (
    <>
      <SEO
        title="Contact | Demayne Govender - Full-Stack Engineer"
        description="Get in touch with Demayne Govender, Full-Stack Engineer. Available for freelance projects, collaborations, and opportunities. React, Node.js, Python developer."
        keywords="Contact Full Stack Developer, Hire React Developer, Web Developer Contact, Software Engineer Contact, Freelance Developer"
        ogImage="https://demayne-govender-portfolio.vercel.app/Demayne%20Govender%20Logo.png"
        type="website"
        url="/contact"
      />
      
      <LiveRegion />
      
      <section 
        className="pt-20 sm:pt-24 min-h-screen bg-gray-900 relative px-0" 
        ref={ref}
        aria-labelledby="contact-heading"
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.header 
            className="text-center mb-8 sm:mb-12 px-2" 
            variants={itemVariants}
          >
            <h1 
              id="contact-heading" 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-100 font-display break-words leading-tight"
            >
              Get In Touch
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed break-words px-2">
              I'm always open to discussing new projects, creative ideas, or opportunities
              to be part of your vision. Let's connect!
            </p>
          </motion.header>

          <div className="flex justify-center px-2">
            <motion.section 
              className="bg-gray-800/50 p-4 sm:p-6 lg:p-10 rounded-lg sm:rounded-xl border border-gray-700/50 w-full max-w-2xl" 
              variants={itemVariants} 
              aria-labelledby="contact-form-heading"
            >
              <h2 
                id="contact-form-heading" 
                className="text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 text-gray-100 font-display"
              >
                Send a Message
              </h2>
              
              {isInitializing && (
                <motion.div
                  className="flex items-start gap-3 p-4 bg-blue-500/20 border-2 border-blue-500/50 rounded-lg text-blue-400 font-medium mb-6 text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="status"
                >
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                  <span>Initializing contact form...</span>
                </motion.div>
              )}
              
              {!isConfigured && !isInitializing && (
                <motion.div
                  className="flex items-start gap-3 p-4 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-lg text-yellow-400 font-medium mb-6 text-sm sm:text-base"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  <FiAlertCircle className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold mb-1">Contact Form Unavailable</p>
                    <p className="text-yellow-300/80">
                      Please contact me directly at <span className="font-mono">your-email@example.com</span>
                    </p>
                  </div>
                </motion.div>
              )}
              
              {isSubmitted && (
                <motion.div
                  className="flex items-start gap-3 p-4 bg-green-500/20 border-2 border-green-500/50 rounded-lg text-green-400 font-medium mb-6 text-sm sm:text-base"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  role="alert"
                  aria-live="assertive"
                >
                  <FiCheckCircle className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="flex-1">
                    Message sent successfully! I'll get back to you soon. This message will disappear in 5 seconds.
                  </span>
                </motion.div>
              )}
              
              {error && !isSubmitted && (
                <motion.div
                  className="flex items-start gap-3 p-4 bg-red-500/20 border-2 border-red-500/50 rounded-lg text-red-400 font-medium mb-6 text-sm sm:text-base"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  aria-live="assertive"
                >
                  <FiAlertCircle className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="flex-1 break-words">{error}</span>
                </motion.div>
              )}
              
              <form 
                onSubmit={handleSubmit} 
                className="space-y-4 sm:space-y-6" 
                noValidate
                aria-describedby={error ? "error-message" : undefined}
              >
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="name" className="font-semibold text-gray-100 text-xs sm:text-sm">
                    Name <span className="text-red-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
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
                    aria-invalid={!!error && error.includes('Name')}
                    disabled={isSubmitting || !isConfigured}
                  />
                </div>
                
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="email" className="font-semibold text-gray-100 text-xs sm:text-sm">
                    Email <span className="text-red-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    title="Please enter a valid email address (example@domain.com)"
                    placeholder="your.email@example.com"
                    className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg text-sm sm:text-base font-sans transition-all duration-200 bg-gray-900 text-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-gray-800 focus:ring-2 sm:focus:ring-4 focus:ring-indigo-500/20 min-h-[44px] w-full"
                    aria-required="true"
                    aria-invalid={!!error && error.includes('email')}
                    autoComplete="email"
                    disabled={isSubmitting || !isConfigured}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    We'll never share your email with anyone else.
                  </p>
                </div>
                
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="subject" className="font-semibold text-gray-100 text-xs sm:text-sm">
                    Subject <span className="text-red-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
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
                    aria-invalid={!!error && error.includes('Subject')}
                    disabled={isSubmitting || !isConfigured}
                  />
                </div>
                
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                    <label htmlFor="message" className="font-semibold text-gray-100 text-xs sm:text-sm break-words">
                      Message <span className="text-gray-400 font-normal text-xs">(max 2000)</span>
                      <span className="text-red-400 ml-1" aria-hidden="true">*</span>
                      <span className="sr-only">(required, maximum 2000 characters)</span>
                    </label>
                    <span 
                      className={`text-xs font-medium ${
                        formData.message.length > 2000 
                          ? 'text-red-400' 
                          : formData.message.length > 1800
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}
                      aria-live="polite"
                    >
                      <span className="sr-only">Character count:</span>
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
                    disabled={isSubmitting || !isConfigured}
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
                  disabled={isSubmitting || !isConfigured}
                  whileTap={{ scale: 0.98 }}
                  aria-label={isSubmitting ? "Sending message..." : "Send message"}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : !isConfigured ? (
                    'Form Unavailable'
                  ) : (
                    <>
                      <FiSend aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline">
                    privacy policy
                  </a>
                  . Your data will be used solely to respond to your inquiry.
                </p>
              </form>
            </motion.section>
          </div>
          
          
        </motion.div>
      </section>
    </>
  )
}

export default Contact