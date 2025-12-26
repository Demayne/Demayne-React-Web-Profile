import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiAward, FiCode, FiDownload, FiEye, FiLayers, FiDatabase, FiShield, FiCloud, FiTool, FiExternalLink } from 'react-icons/fi'
import SEO from '../components/SEO'

const About = () => {
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

  // Streamlined work experience - only key highlights
  const workExperience = [
    {
      title: 'Full-Stack Web & Software Engineer',
      company: 'HyperionDev Bootcamp',
      period: 'Jun 2023 - Nov 2025',
      highlights: [
        'Architected 15+ production-ready full-stack applications (React, Node.js, MongoDB, MySQL)',
        'Built scalable microservices with JWT auth, RESTful APIs, and responsive UI/UX',
        'Ranked #1 in class across Software Engineering and Full-Stack Web Development programs',
      ],
    },
    {
      title: 'Junior Software Developer',
      company: 'CIBA Industries',
      period: 'Aug 2023 - Dec 2023',
      highlights: [
        'Engineered automated payroll system reducing processing time by 85% (4+ hours → 5 minutes)',
        'Optimized RPA infrastructure improving uptime from 70% to 99.7%, freeing 20+ hours weekly',
      ],
    },
    {
      title: 'Logistics & Invoicing Coordinator',
      company: 'Barnes Black Logistics',
      period: 'Oct 2024 - Present',
      highlights: [
        'Manage 50+ daily shipments with 99.5% on-time delivery through data-driven optimization',
        'Streamline invoicing workflows achieving 100% accuracy via automated reconciliation',
      ],
    },
  ]

  // Core tech stack - what recruiters scan for
  const coreTechStack = {
    'Frontend': ['React', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS', 'Redux'],
    'Backend': ['Node.js', 'Express.js', 'Python', 'Django', 'RESTful APIs'],
    'Databases': ['MongoDB', 'MySQL', 'SQLite', 'Database Design'],
    'Cloud & DevOps': ['Docker', 'CI/CD', 'Git', 'GitHub', 'Azure (In Progress)'],
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
          <motion.a
            href="/Demayne_Govender_Resume.pdf"
            download="Demayne_Govender_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg active:scale-95 transition-all duration-200 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Download resume PDF"
          >
            <FiDownload aria-hidden="true" />
            Download Resume
          </motion.a>
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

        {/* Certifications - Simplified */}
        <motion.section 
          className="mb-8 sm:mb-12 lg:mb-16 bg-gray-800/50 p-4 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="certificates-heading"
        >
          <h2 id="certificates-heading" className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-100 flex items-center gap-2 sm:gap-3 font-display">
            <FiAward className="text-indigo-400 text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true" />
            <span>Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-2 border-gray-700 sm:hover:border-indigo-500 transition-colors duration-200 flex flex-col"
                variants={itemVariants}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-100 mb-1 leading-tight break-words">
                      {cert.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-indigo-400 font-medium break-words">{cert.issuer}</p>
                  </div>
                  {cert.badge && (
                    <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-400 px-2 py-0.5 sm:py-1 rounded-full border border-indigo-500/30 flex-shrink-0 whitespace-nowrap">
                      {cert.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-3 sm:mb-4">{cert.date}</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-3 sm:pt-4">
                  {cert.pdf && (
                    <motion.a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-indigo-600 text-white rounded-lg active:bg-indigo-700 transition-colors text-sm font-medium flex-1 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      whileTap={{ scale: 0.98 }}
                      aria-label={`View ${cert.title} certificate`}
                    >
                      <FiEye aria-hidden="true" />
                      View
                    </motion.a>
                  )}
                  {cert.portfolio && (
                    <motion.a
                      href={cert.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-purple-600 text-white rounded-lg active:bg-purple-700 transition-colors text-sm font-medium flex-1 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      whileTap={{ scale: 0.98 }}
                      aria-label={`View ${cert.title} portfolio`}
                    >
                      <FiExternalLink aria-hidden="true" />
                      Portfolio
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </article>
    </>
  )
}

export default About
