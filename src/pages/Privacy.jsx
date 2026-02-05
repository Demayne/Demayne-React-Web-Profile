import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiShield, FiLock, FiMail, FiGlobe, FiFileText } from 'react-icons/fi'
import SEO from '../components/SEO'

const Privacy = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

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

  const sections = [
    {
      icon: <FiShield className="text-2xl sm:text-3xl" />,
      title: 'Information We Collect',
      content: [
        'When you use the contact form, we collect:',
        '• Your name and email address',
        '• Subject and message content',
        '• Timestamp of your submission',
        '• Browser information (user agent) for technical purposes',
        '',
        'We do not collect sensitive personal information such as payment details, social security numbers, or financial information.',
      ],
    },
    {
      icon: <FiMail className="text-2xl sm:text-3xl" />,
      title: 'How We Use Your Information',
      content: [
        'Your information is used solely for the following purposes:',
        '• To respond to your inquiries and messages',
        '• To communicate with you regarding potential opportunities',
        '• To improve our services and user experience',
        '• To comply with legal obligations',
        '',
        'We do not sell, rent, or trade your personal information to third parties.',
      ],
    },
    {
      icon: <FiLock className="text-2xl sm:text-3xl" />,
      title: 'Data Storage and Security',
      content: [
        '• Contact form submissions are processed through EmailJS, a third-party email service',
        '• Your data is transmitted securely using industry-standard encryption',
        '• We implement appropriate technical and organizational measures to protect your data',
        '• Data is stored only as long as necessary to fulfill the purposes outlined in this policy',
        '• We retain contact form submissions for up to 2 years for record-keeping purposes',
      ],
    },
    {
      icon: <FiGlobe className="text-2xl sm:text-3xl" />,
      title: 'Third-Party Services',
      content: [
        'This website uses the following third-party services:',
        '',
        '**EmailJS** - Contact form email delivery service',
        '• Privacy Policy: https://www.emailjs.com/legal/privacy-policy/',
        '• Data is processed according to EmailJS\'s privacy practices',
        '',
        '**Vercel** - Website hosting and deployment',
        '• Privacy Policy: https://vercel.com/legal/privacy-policy',
        '',
        '**Google Analytics** (if applicable) - Website analytics',
        '• Used to understand website usage and improve user experience',
        '• You can opt-out using browser privacy settings',
      ],
    },
    {
      icon: <FiFileText className="text-2xl sm:text-3xl" />,
      title: 'Your Rights',
      content: [
        'You have the right to:',
        '• Request access to your personal data',
        '• Request correction of inaccurate data',
        '• Request deletion of your data',
        '• Object to processing of your data',
        '• Request data portability',
        '• Withdraw consent at any time',
        '',
        'To exercise these rights, please contact us using the contact form on this website.',
      ],
    },
  ]

  return (
    <>
      <SEO
        title="Privacy Policy | Demayne Govender - Full-Stack Engineer"
        description="Privacy Policy for Demayne Govender's portfolio website. Learn how we collect, use, and protect your personal information when you contact us."
        keywords="Privacy Policy, Data Protection, GDPR, Privacy, Data Security, Contact Form Privacy"
        ogImage="https://demayne-govender-portfolio.vercel.app/Demayne%20Govender%20Logo.png"
      />
      <article className="pt-20 sm:pt-24 min-h-screen bg-gray-900 overflow-x-hidden px-0" ref={ref}>
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 w-full"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.header className="text-center mb-10 sm:mb-12 lg:mb-16" variants={itemVariants}>
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 mb-6">
              <FiShield className="text-indigo-400 text-3xl sm:text-4xl" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-100 font-display leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mb-2">
              Last Updated: February 3, 2026
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you visit this portfolio website.
            </p>
          </motion.header>
          <div className="space-y-6 sm:space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                className="bg-gray-800/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-700/50"
                variants={itemVariants}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30 text-indigo-400 flex-shrink-0">
                    {section.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 font-display flex-1">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-2 sm:space-y-3 ml-0 sm:ml-16">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-sm sm:text-base text-gray-300 leading-relaxed ${
                        paragraph.startsWith('**') ? 'font-semibold text-indigo-400 mt-3' : ''
                      }`}
                      dangerouslySetInnerHTML={
                        paragraph.includes('**') || paragraph.includes('http')
                          ? {
                              __html: paragraph
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-400">$1</strong>')
                                .replace(
                                  /(https?:\/\/[^\s]+)/g,
                                  '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-indigo-400 hover:text-indigo-300 underline break-all">$1</a>'
                                ),
                            }
                          : undefined
                      }
                    >
                      {!paragraph.includes('**') && !paragraph.includes('http') ? paragraph : null}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.section
            className="mt-8 sm:mt-12 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 sm:p-6 rounded-xl border border-indigo-500/30"
            variants={itemVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 font-display">
              Cookies and Tracking
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
              This website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-300 ml-4">
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve website functionality</li>
            </ul>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-4">
              You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
            </p>
          </motion.section>

          <motion.section
            className="mt-8 sm:mt-12 bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700/50"
            variants={itemVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 font-display">
              Children's Privacy
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              This website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </motion.section>

          <motion.section
            className="mt-8 sm:mt-12 bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700/50"
            variants={itemVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 font-display">
              Changes to This Privacy Policy
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </motion.section>

          <motion.section
            className="mt-8 sm:mt-12 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 sm:p-6 rounded-xl border border-indigo-500/30"
            variants={itemVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 font-display">
              Contact Us
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights regarding your personal data, please contact us:
            </p>
            <div className="space-y-2 text-sm sm:text-base text-gray-300">
              <p>
                <strong className="text-indigo-400">Email:</strong>{' '}
                <a
                  href="mailto:govender.demayne@gmail.com"
                  className="text-indigo-400 hover:text-indigo-300 underline break-all"
                >
                  govender.demayne@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-indigo-400">Website:</strong>{' '}
                <a
                  href="/contact"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Contact Form
                </a>
              </p>
            </div>
          </motion.section>

          <motion.div
            className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-400"
            variants={itemVariants}
          >
            <p>
              This Privacy Policy is effective as of February 3, 2026 and complies with GDPR, CCPA, and other applicable privacy regulations.
            </p>
          </motion.div>
        </motion.div>
      </article>
    </>
  )
}

export default Privacy
