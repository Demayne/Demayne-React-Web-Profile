import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiAward, FiCode, FiMail, FiMapPin, FiDownload, FiEye, FiLayers, FiDatabase, FiShield, FiCloud, FiTool, FiTrendingUp, FiCpu, FiExternalLink } from 'react-icons/fi'

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

  const workExperience = [
    {
      title: 'Logistics & Invoicing Coordinator',
      company: 'Barnes Black Logistics (Internship)',
      location: 'Johannesburg, Gauteng, South Africa',
      period: 'Oct 2024 - Present',
      description: [
        'Orchestrate end-to-end logistics operations managing 50+ daily shipments, ensuring 99.5% on-time delivery rate through data-driven process optimization',
        'Streamline invoicing workflows handling monthly billing volume with 100% accuracy through automated reconciliation and validation systems',
        'Identify and document automation opportunities in supply chain workflows, creating technical specifications for process improvement initiatives',
        'Leverage data analysis skills to optimize routing algorithms and reduce operational costs by 12% through strategic process improvements',
        'Collaborate with cross-functional teams to implement technology solutions improving operational efficiency and client satisfaction metrics',
      ],
    },
    {
      title: 'Full-Stack Web & Software Engineer',
      company: 'HyperionDev Bootcamp',
      location: 'Remote',
      period: 'Jun 2023 - Nov 2025',
      description: [
        'Achieved #1 ranking across Software Engineering and Full-Stack Web Development bootcamps, demonstrating mastery of Python, Java, JavaScript, SQL, and modern web frameworks',
        'Architected and developed 15+ production-ready full-stack applications using React, Node.js, Express.js, MongoDB, and MySQL, implementing RESTful APIs, authentication systems, and responsive UI/UX designs',
        'Designed and implemented machine learning pipelines using Python (NumPy, pandas, scikit-learn), improving model accuracy by 20% and enabling data-driven decision making across multiple projects',
        'Built scalable microservices architecture handling concurrent user requests, implementing JWT authentication, role-based access control, and secure API endpoints',
        'Applied software engineering best practices including test-driven development (TDD), code reviews, version control (Git), and CI/CD pipelines for automated deployment',
        'Collaborated in agile development environments, participating in sprint planning, daily standups, and code reviews while delivering features on tight deadlines',
      ],
    },
    {
      title: 'Junior Software Developer',
      company: 'CIBA Industries',
      location: 'Pretoria, Gauteng, South Africa',
      period: 'Aug 2023 - Dec 2023',
      description: [
        'Engineered automated Time Sheet Email Processing System using Python and Automation Anywhere, reducing manual payroll processing by 85% and cutting processing time from 4+ hours to under 5 minutes',
        'Developed robust email parsing algorithm with 99.9% accuracy extracting hours, rates, and payment details, eliminating human error and reducing payroll discrepancies by 95%',
        'Optimized existing RPA bot infrastructure improving system reliability from 70% to 99.7% uptime, resulting in 30% efficiency gain and freeing 20+ hours weekly for strategic engineering initiatives',
        'Implemented comprehensive error handling, logging, and monitoring systems ensuring 99.9% data accuracy and enabling proactive issue resolution',
        'Collaborated with stakeholders to gather requirements, design technical solutions, and deliver automation projects that directly impacted business KPIs',
      ],
    },
  ]

  const skills = {
    Languages: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML5', 'CSS3'],
    Frontend: ['React', 'React Hooks', 'Redux', 'Tailwind CSS', 'Bootstrap', 'AJAX', 'DOM Manipulation', 'Responsive Design'],
    Backend: ['Node.js', 'Express.js', 'Django', 'RESTful APIs', 'GraphQL', 'Microservices Architecture', 'Server-Side Rendering'],
    Databases: ['MongoDB', 'Mongoose', 'MySQL', 'SQLite', 'Database Design', 'Query Optimization', 'Data Modeling'],
    'Auth & Security': ['JWT', 'OAuth 2.0', 'bcrypt', 'API Security', 'Encryption', 'Role-Based Access Control (RBAC)'],
    'Cloud & DevOps': ['Azure (Cloud Practitioner) – In Progress', 'Docker', 'CI/CD', 'Git', 'GitHub', 'Version Control', 'Automated Testing'],
    'Tools & Frameworks': ['Automation Anywhere', 'UiPath', 'Robocorp', 'Postman', 'npm', 'Webpack', 'Vite'],
    Practices: ['Agile/Scrum', 'TDD', 'Code Review', 'Refactoring', 'Design Patterns', 'SOLID Principles'],
    'Data Science': ['NumPy', 'pandas', 'scikit-learn', 'Data Analysis', 'Machine Learning', 'Statistical Modeling'],
  }

  const certificates = [
    {
      title: 'Full Stack Web & Software Engineer Graduate - Ranked #1 in Class',
      issuer: 'HyperionDev',
      date: 'Nov 2025',
      description: 'Achieved top ranking across comprehensive curriculum covering software engineering fundamentals, full-stack development, algorithms, data structures, and modern web technologies. Completed advanced projects demonstrating expertise in React, Node.js, Python, Java, SQL, and cloud technologies.',
      pdf: '/Full_Stack_Certificate.pdf',
      portfolio: 'https://www.hyperiondev.com/portfolio/DG23030008394/',
    },
    {
      title: 'Certified Advanced RPA Professional',
      issuer: 'Automation Anywhere',
      date: 'Nov 2023',
      description: 'Advanced certification in Robotic Process Automation (RPA) development, implementation, and optimization. Expertise in designing scalable automation solutions for enterprise environments.',
      pdf: '/AA_RPA_Certificate.pdf',
    },
  ]

  return (
    <div className="pt-20 sm:pt-24 min-h-screen bg-gray-900 overflow-x-hidden px-2 sm:px-0" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.header className="text-center mb-12 sm:mb-16" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-100 font-display">About Me</h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            I'm a Full-Stack Engineer passionate about transforming ideas into scalable web solutions and enterprise automation systems. With hands-on experience architecting and deploying 15+ production-ready applications, I specialize in building robust systems using modern technology stacks including React, Node.js, Python, and cloud technologies. I thrive on solving complex challenges and collaborating with teams to deliver solutions that drive measurable business impact. Always eager to learn, grow, and contribute to innovative projects that make a difference.
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

        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-16 max-w-4xl mx-auto" 
          variants={itemVariants}
          aria-label="Contact information"
        >
          <div className="bg-gray-800/50 p-6 rounded-xl flex items-start gap-4 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 min-w-0">
            <FiMail className="text-3xl text-indigo-400 flex-shrink-0 mt-1" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email</h3>
              <a 
                href="mailto:govender.demayne@gmail.com" 
                className="text-base text-gray-100 font-medium hover:text-indigo-400 transition-colors break-words break-all focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              >
                govender.demayne@gmail.com
              </a>
            </div>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl flex items-start gap-4 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 min-w-0">
            <FiMapPin className="text-3xl text-indigo-400 flex-shrink-0 mt-1" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Location</h3>
              <p className="text-base text-gray-100 font-medium break-words">Pretoria, Gauteng, ZA</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12 sm:mb-16 bg-gray-800/50 p-6 lg:p-10 rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="work-experience-heading"
        >
          <h2 id="work-experience-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-gray-100 flex items-center gap-3 font-display">
            <FiBriefcase className="text-indigo-400 text-3xl" aria-hidden="true" />
            Work Experience
          </h2>
          <div className="relative pl-4 sm:pl-8">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-600 to-purple-600"></div>
            {workExperience.map((exp, index) => (
              <motion.div
                key={index}
                className="relative mb-8 sm:mb-12 pl-6 sm:pl-8"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="absolute -left-[0.875rem] sm:-left-[1.625rem] top-2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-indigo-600 border-2 sm:border-4 border-white shadow-[0_0_0_2px_rgb(99,102,241)] sm:shadow-[0_0_0_3px_rgb(99,102,241)]"></div>
                <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border-l-2 sm:border-l-4 border-indigo-500">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2 sm:gap-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">{exp.title}</h3>
                    <span className="text-sm text-gray-300 font-medium bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-indigo-400 font-semibold mb-1">{exp.company}</p>
                  {exp.location && <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">{exp.location}</p>}
                  <ul className="list-none space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="pl-5 sm:pl-6 relative text-sm sm:text-base text-gray-300 leading-relaxed">
                        <span className="absolute left-0 text-indigo-400 font-bold">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mb-12 sm:mb-16 bg-gray-800/50 p-6 lg:p-10 rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="achievements-heading"
        >
          <h2 id="achievements-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-gray-100 flex items-center gap-3 font-display">
            <FiAward className="text-indigo-400 text-3xl" aria-hidden="true" />
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 rounded-xl border border-indigo-500/30"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Academic Excellence</h3>
              <p className="text-gray-300 text-sm">Ranked #1 in class across Software Engineering and Full-Stack Web Development bootcamps</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 rounded-xl border border-indigo-500/30"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Automation Impact</h3>
              <p className="text-gray-300 text-sm">Developed systems reducing manual work by 85% and processing time from hours to minutes</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 rounded-xl border border-indigo-500/30"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Portfolio</h3>
              <p className="text-gray-300 text-sm">Built and deployed 15+ full-stack applications demonstrating production-ready development capabilities</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12 sm:mb-16 bg-gray-800/50 p-6 lg:p-10 rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="skills-heading"
        >
          <h2 id="skills-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-gray-100 flex items-center gap-3 font-display">
            <FiCode className="text-indigo-400 text-3xl" aria-hidden="true" />
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => {
              // Icon mapping for each category
              const categoryIcons = {
                Languages: <FiCode className="text-2xl" />,
                Frontend: <FiLayers className="text-2xl" />,
                Backend: <FiDatabase className="text-2xl" />,
                Databases: <FiDatabase className="text-2xl" />,
                'Auth & Security': <FiShield className="text-2xl" />,
                'Cloud & DevOps': <FiCloud className="text-2xl" />,
                'Tools & Frameworks': <FiTool className="text-2xl" />,
                Practices: <FiTrendingUp className="text-2xl" />,
                'Data Science': <FiCpu className="text-2xl" />,
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
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-500"></div>
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 relative z-10">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                      {categoryIcons[category] || <FiCode className="text-xl sm:text-2xl" />}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors duration-300">
                      {category}
                    </h3>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10">
                    {skillList.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/20 transition-all duration-300 cursor-default group/skill touch-manipulation"
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
                        whileHover={{ 
                          scale: 1.1, 
                          y: -2,
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <span className="relative z-10">{skill}</span>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover/skill:from-indigo-500/20 group-hover/skill:to-purple-500/20 transition-all duration-300 blur-sm"></div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        <motion.section 
          className="mb-12 sm:mb-16 bg-gray-800/50 p-6 lg:p-10 rounded-2xl border border-gray-700/50" 
          variants={itemVariants}
          aria-labelledby="certificates-heading"
        >
          <h2 id="certificates-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-gray-100 flex items-center gap-3 font-display">
            <FiAward className="text-indigo-400 text-3xl" aria-hidden="true" />
            Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-xl border-2 border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-100">{cert.title}</h3>
                <p className="text-sm sm:text-base text-indigo-400 font-medium mb-2">{cert.issuer}</p>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">{cert.date}</p>
                {cert.description && (
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 sm:mb-6 flex-grow">{cert.description}</p>
                )}
                {(cert.pdf || cert.portfolio) && (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto pt-4">
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
                        View Certificate
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
                        View Portfolio
                      </motion.a>
                    )}
                    {cert.pdf && (
                      <motion.a
                        href={cert.pdf}
                        download
                        className="flex items-center justify-center gap-2 px-4 py-2.5 h-11 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium border border-gray-600 flex-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Download ${cert.title} certificate`}
                      >
                        <FiDownload aria-hidden="true" />
                        Download
                      </motion.a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}

export default About
