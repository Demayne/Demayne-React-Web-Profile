import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { FiBriefcase, FiAward, FiCode, FiEye, FiLayers, FiDatabase, FiCloud, FiTool, FiExternalLink, FiDownload, FiX } from 'react-icons/fi'
import SEO from '../components/SEO'

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

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

  // Work experience ordered: Logistics (current), CIBA, HyperionDev
  const workExperience = [
    {
      title: 'Logistics & Invoicing Coordinator',
      company: 'Barnes Black Logistics',
      period: 'Oct 2024 - Present',
      highlights: [
        'Manage 50+ daily shipments with 99.5% on-time delivery through data-driven optimization',
        'Streamline invoicing workflows achieving 100% accuracy via automated reconciliation',
        'Identify and document technical automation opportunities within supply chain workflows',
      ],
    },
    {
      title: 'Junior Software Developer',
      company: 'CIBA Industries',
      period: 'Aug 2023 - Dec 2023',
      highlights: [
        'Engineered automated payroll system reducing processing time by 85% (4+ hours → 5 minutes)',
        'Optimized RPA infrastructure improving uptime from 70% to 99.7%, freeing 20+ hours weekly',
        'Collaborated with stakeholders to design technical specifications and deliver automation projects',
      ],
    },
    {
      title: 'Full-Stack Web & Software Engineer',
      company: 'HyperionDev Bootcamp',
      period: 'Jun 2024 - Nov 2025',
      highlights: [
        'Architected 15+ production-ready full-stack applications (React, Node.js, MongoDB, MySQL)',
        'Built scalable microservices with JWT auth, RESTful APIs, and responsive UI/UX',
        'Ranked #1 in class across Software Engineering and Full-Stack Web Development programs',
      ],
    },
  ]

  // Core tech stack - what recruiters scan for
  const coreTechStack = {
    'Frontend': ['React', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'Redux'],
    'Backend': ['Node.js', 'Express.js', 'Python', 'Django', 'RESTful APIs'],
    'Databases': ['MongoDB', 'MySQL', 'SQLite', 'Database Design'],
    'Cloud & DevOps': ['Docker', 'CI/CD', 'Git', 'GitHub', 'Azure'],
    'Automation': ['Automation Anywhere', 'UiPath', 'RPA Development'],
  }

  const certificates = [
    {
      title: 'Full Stack Web & Software Engineer',
      issuer: 'HyperionDev',
      date: 'Nov 2025',
      badge: 'Ranked #1',
      pdf: '/Full_Stack_Certificate.pdf',
      portfolio: 'https://www.hyperiondev.com/portfolio/DG23030008394/',
    },
    {
      title: 'Software Engineer Bootcamp',
      issuer: 'HyperionDev',
      date: 'Jan 2024',
      badge: 'Ranked #2',
      pdf: '/Software_Engineer_Certificate.pdf',
      portfolio: 'https://www.hyperiondev.com/portfolio/DG24070015238/',
    },
    {
      title: 'Certified Advanced RPA Professional',
      issuer: 'Automation Anywhere',
      date: 'Nov 2023',
      pdf: '/AA_RPA_Certificate.pdf',
    },
  ]

  return (
    <>
      <SEO
        title="About Me | Demayne Govender - Full-Stack Engineer"
        description="Full-Stack Engineer specializing in scalable web applications and enterprise automation systems. 15+ production applications. React, Node.js, Python developer."
        keywords="Full Stack Developer, React Developer, JavaScript, Python, Node.js, Software Engineer, Portfolio, South Africa, Web Development, Full Stack Engineer"
        ogImage="https://demayne-govender-portfolio.vercel.app/Demayne%20Govender%20Logo.png"
      />
      <article className="pt-20 sm:pt-24 min-h-screen bg-gray-900 overflow-x-hidden px-0" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 w-full"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Hero Section - Value Proposition */}
        <motion.header className="text-center mb-10 sm:mb-12 lg:mb-16" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-100 font-display leading-tight">
            About Me
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-3 sm:mb-4 font-medium px-2">
            Full-Stack Engineer specializing in scalable web applications and enterprise automation systems.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-2">
            I architect and deploy production-ready solutions using React, Node.js, and Python. With 15+ applications in production, I focus on building systems that drive measurable business impact—from reducing operational costs by 85% to scaling microservices handling concurrent user loads.
          </p>
          <motion.button
            onClick={() => setIsResumeModalOpen(true)}
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-label="View resume"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.span
              className="relative z-10 flex items-center gap-2"
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <FiEye aria-hidden="true" className="text-lg" />
              <span>View Resume</span>
            </motion.span>
            <motion.span
              className="relative z-10 inline-block text-xl font-bold"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.header>

        {/* Core Tech Stack - What recruiters scan first */}
        <motion.section 
          className="mb-8 sm:mb-12 lg:mb-16 bg-gray-800/50 p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="tech-stack-heading"
        >
          <h2 id="tech-stack-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-100 flex items-center gap-2 sm:gap-3 font-display">
            <FiCode className="text-indigo-400 text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true" />
            <span>Core Tech Stack</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {Object.entries(coreTechStack).map(([category, skillList], categoryIndex) => {
              const categoryIcons = {
                Frontend: <FiLayers className="text-xl sm:text-2xl" />,
                Backend: <FiDatabase className="text-xl sm:text-2xl" />,
                Databases: <FiDatabase className="text-xl sm:text-2xl" />,
                'Cloud & DevOps': <FiCloud className="text-xl sm:text-2xl" />,
                Automation: <FiTool className="text-xl sm:text-2xl" />,
              }

              return (
                <motion.div
                  key={categoryIndex}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border border-gray-700 sm:hover:border-indigo-500/50 transition-colors duration-200 relative overflow-hidden"
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: Math.min(categoryIndex * 0.08, 0.4),
                        duration: 0.4,
                      },
                    },
                  }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 relative z-10">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30 text-indigo-400 flex-shrink-0">
                      {categoryIcons[category] || <FiCode className="text-xl sm:text-2xl" />}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-100 leading-tight">
                      {category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
                    {skillList.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md sm:rounded-lg text-xs font-medium text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Work Experience - Streamlined */}
        <motion.section 
          className="mb-8 sm:mb-12 lg:mb-16 bg-gray-800/50 p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="experience-heading"
        >
          <h2 id="experience-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-100 flex items-center gap-2 sm:gap-3 font-display">
            <FiBriefcase className="text-indigo-400 text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true" />
            <span>Experience</span>
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {workExperience.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-l-3 sm:border-l-4 border-indigo-500 transition-colors duration-200"
                variants={itemVariants}
              >
                <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-100 mb-1 leading-tight break-words">
                      {exp.title}
                    </h3>
                    <p className="text-base sm:text-lg text-indigo-400 font-medium break-words">{exp.company}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300 font-medium bg-indigo-500/20 px-2.5 sm:px-3 py-1 rounded-full border border-indigo-500/30 w-fit self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2 sm:space-y-2.5">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm sm:text-base text-gray-300 leading-relaxed flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-0.5 sm:mt-1 flex-shrink-0 text-xs sm:text-sm">▸</span>
                      <span className="flex-1">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Projects */}
        <motion.section
          className="mb-8 sm:mb-12 lg:mb-16 bg-gray-800/50 p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-700/50"
          variants={itemVariants}
          aria-labelledby="projects-heading"
        >
          <h2 id="projects-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-100 flex items-center gap-2 sm:gap-3 font-display">
            <FiCode className="text-indigo-400 text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true" />
            <span>Featured Projects</span>
          </h2>

          <motion.div
            className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-5 sm:p-6 lg:p-8 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-colors duration-200 overflow-hidden"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            whileHover={{ y: -2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-1">Credential Management System</h3>
                  <p className="text-sm text-indigo-400 font-medium">Full-Stack Web Application</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Live on Azure
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/40">
                    Featured
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-5">
                A centralized credential management platform enabling organizations to securely store, manage, and control access to system credentials across multiple organizational units. Features AES-256-CBC encryption at rest, JWT authentication with refresh token rotation, role-based access control, and a full audit trail for all credential access and modifications.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  'AES-256-CBC encrypted credential storage',
                  'Role-based access control (Admin / Management / User)',
                  'JWT auth with refresh token rotation & account lockout',
                  'Comprehensive audit logging for all credential access',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-indigo-400 font-bold mt-0.5 flex-shrink-0 text-xs">▸</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {['React 18', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'AES-256', 'Azure', 'Vite', 'SCSS'].map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-gray-800/80 border border-gray-700 rounded-md text-xs font-medium text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-700/50">
                <motion.a
                  href="https://github.com/Demayne/Credential-Management-System"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm font-semibold rounded-lg transition-colors duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="View Credential Management System on GitHub"
                >
                  <FiExternalLink aria-hidden="true" />
                  <span>View on GitHub</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Certifications - Modern Free-Flowing Layout */}
        <motion.section 
          className="mb-8 sm:mb-12 lg:mb-16" 
          variants={itemVariants}
          aria-labelledby="certificates-heading"
        >
          <h2 id="certificates-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-100 flex items-center gap-2 sm:gap-3 font-display px-4 sm:px-0">
            <FiAward className="text-indigo-400 text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true" />
            <span>Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {certificates.map((cert, index) => {
              const gradientColors = [
                'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
                'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
                'from-purple-500/20 via-pink-500/20 to-red-500/20',
              ]
              const borderColors = [
                'border-indigo-500/30 hover:border-indigo-400/60',
                'border-blue-500/30 hover:border-blue-400/60',
                'border-purple-500/30 hover:border-purple-400/60',
              ]
              const iconColors = [
                'text-indigo-400',
                'text-blue-400',
                'text-purple-400',
              ]
              
              return (
                <motion.div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-gray-700/50 hover:border-opacity-100 transition-all duration-300 flex flex-col overflow-hidden"
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                      },
                    },
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[index % 3]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex-1 min-w-0">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColors[index % 3]} border ${borderColors[index % 3]} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <FiAward className={`${iconColors[index % 3]} text-xl`} aria-hidden="true" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 leading-tight break-words group-hover:text-white transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-indigo-400 font-medium break-words">{cert.issuer}</p>
                      </div>
                      {cert.badge && (
                        <motion.span 
                          className="text-xs font-bold bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/40 flex-shrink-0 whitespace-nowrap backdrop-blur-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          {cert.badge}
                        </motion.span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-5">
                      <span className="text-xs text-gray-400 font-medium">{cert.date}</span>
                    </div>
                    
                    <div className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-gray-700/50">
                      {cert.pdf && (
                        <motion.a
                          href={cert.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-500 hover:to-indigo-600 transition-all duration-200 text-sm font-semibold min-h-[44px] shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`View ${cert.title} certificate`}
                        >
                          <FiEye aria-hidden="true" className="group-hover/btn:scale-110 transition-transform" />
                          <span>View Certificate</span>
                        </motion.a>
                      )}
                      {cert.portfolio && (
                        <motion.a
                          href={cert.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-500 hover:to-purple-600 transition-all duration-200 text-sm font-semibold min-h-[44px] shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          aria-label={`View ${cert.title} portfolio`}
                        >
                          <FiExternalLink aria-hidden="true" className="group-hover/btn:scale-110 transition-transform" />
                          <span>View Portfolio</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>
      </motion.div>
    </article>

    <AnimatePresence>
      {isResumeModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsResumeModalOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-5xl h-[90vh] bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-100">Resume</h2>
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.a
                  href="/Demayne_Govender_Resume.pdf"
                  download="Demayne_Govender_Resume.pdf"
                  className="group/btn flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 text-sm font-semibold min-h-[44px] shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Download resume"
                >
                  <FiDownload aria-hidden="true" className="group-hover/btn:animate-bounce" />
                  <span>Download</span>
                </motion.a>
                <motion.button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-100 hover:bg-gray-700 rounded-lg transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close resume viewer"
                >
                  <FiX className="text-xl" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src="/Demayne_Govender_Resume.pdf"
                className="w-full h-full border-0"
                title="Resume PDF Viewer"
                aria-label="Resume PDF viewer"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}

export default About
