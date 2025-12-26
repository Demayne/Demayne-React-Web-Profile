import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiAward, FiCode, FiDownload, FiEye, FiLayers, FiDatabase, FiShield, FiCloud, FiTool, FiExternalLink } from 'react-icons/fi'

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
    <div className="pt-20 sm:pt-24 min-h-screen bg-gray-900 overflow-x-hidden px-2 sm:px-0" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Hero Section - Value Proposition */}
        <motion.header className="text-center mb-12 sm:mb-16" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-100 font-display">About Me</h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4 font-medium">
            Full-Stack Engineer specializing in scalable web applications and enterprise automation systems.
          </p>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            I architect and deploy production-ready solutions using React, Node.js, and Python. With 15+ applications in production, I focus on building systems that drive measurable business impact—from reducing operational costs by 85% to scaling microservices handling concurrent user loads.
          </p>
          <motion.a
            href="/Demayne_Govender_Resume.pdf"
            download="Demayne_Govender_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download resume PDF"
          >
            <FiDownload aria-hidden="true" />
            Download Resume
          </motion.a>
        </motion.header>

        {/* Core Tech Stack - What recruiters scan first */}
        <motion.section 
          className="mb-12 sm:mb-16 bg-gray-800/50 p-6 lg:p-10 rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="tech-stack-heading"
        >
          <h2 id="tech-stack-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-gray-100 flex items-center gap-3 font-display">
            <FiCode className="text-indigo-400 text-3xl" aria-hidden="true" />
            Core Tech Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(coreTechStack).map(([category, skillList], categoryIndex) => {
              const categoryIcons = {
                Frontend: <FiLayers className="text-2xl" />,
                Backend: <FiDatabase className="text-2xl" />,
                Databases: <FiDatabase className="text-2xl" />,
                'Cloud & DevOps': <FiCloud className="text-2xl" />,
                Automation: <FiTool className="text-2xl" />,
              }

              return (
                <motion.div
                  key={categoryIndex}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 relative overflow-hidden group"
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: categoryIndex * 0.1,
                        duration: 0.5,
                      },
                    },
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-500"></div>
                  
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                      {categoryIcons[category] || <FiCode className="text-2xl" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors duration-300">
                      {category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {skillList.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/20 transition-all duration-300"
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              delay: (categoryIndex * 0.1) + (skillIndex * 0.03),
                              duration: 0.3,
                            },
                          },
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Work Experience - Streamlined */}
        <motion.section 
          className="mb-12 sm:mb-16 bg-gray-800/50 p-6 lg:p-10 rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="experience-heading"
        >
          <h2 id="experience-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-gray-100 flex items-center gap-3 font-display">
            <FiBriefcase className="text-indigo-400 text-3xl" aria-hidden="true" />
            Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border-l-4 border-indigo-500 hover:border-indigo-400 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-1">{exp.title}</h3>
                    <p className="text-lg text-indigo-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-300 font-medium bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 w-fit">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm sm:text-base text-gray-300 leading-relaxed flex items-start gap-2">
                      <span className="text-indigo-400 font-bold mt-1 flex-shrink-0">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications - Simplified */}
        <motion.section 
          className="mb-12 sm:mb-16 bg-gray-800/50 p-6 lg:p-10 rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="certificates-heading"
        >
          <h2 id="certificates-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-gray-100 flex items-center gap-3 font-display">
            <FiAward className="text-indigo-400 text-3xl" aria-hidden="true" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border-2 border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-1">{cert.title}</h3>
                    <p className="text-sm text-indigo-400 font-medium">{cert.issuer}</p>
                  </div>
                  {cert.badge && (
                    <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/30">
                      {cert.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-4">{cert.date}</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-4">
                  {cert.pdf && (
                    <motion.a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
                      className="flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
    </div>
  )
}

export default About
