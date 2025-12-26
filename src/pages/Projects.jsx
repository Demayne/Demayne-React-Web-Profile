import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiCode, FiDatabase, FiLayers } from 'react-icons/fi'
import SEO from '../components/SEO'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true })

  const projects = [
    {
      id: 1,
      title: 'Credential Management System',
      description: 'A comprehensive system for managing credentials securely with user authentication and role-based access control.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
      github: 'https://github.com/Demayne/Credential-Management-System',
      category: 'fullstack',
      featured: true,
    },
    {
      id: 2,
      title: 'Database Project Management System',
      description: 'Full-featured project management application with database integration, task tracking, and team collaboration features.',
      tech: ['React', 'MySQL', 'Node.js', 'Express', 'REST API'],
      github: 'https://github.com/Demayne/Database-Project-Management-System',
      category: 'fullstack',
      featured: true,
    },
    {
      id: 3,
      title: 'Github User Search App',
      description: 'Interactive application for searching GitHub users, displaying profiles, repositories, and user statistics with a modern UI.',
      tech: ['React', 'GitHub API', 'JavaScript', 'CSS3'],
      github: 'https://github.com/Demayne/Github-User-Search-App',
      category: 'frontend',
      featured: true,
    },
    {
      id: 4,
      title: 'React Hangman Game',
      description: 'Classic hangman game built with React, featuring state management, animations, and an engaging user experience.',
      tech: ['React', 'JavaScript', 'CSS3', 'State Management'],
      github: 'https://github.com/Demayne/react-hangman-game',
      category: 'frontend',
      featured: false,
    },
    {
      id: 5,
      title: 'Time Sheet Email System',
      description: 'Automated Python system that processes timesheet emails, populates databases, calculates payments, and routes approvals. Eliminated manual data entry, saving 15+ hours monthly.',
      tech: ['Python', 'Automation Anywhere', 'Email Parsing', 'Database'],
      github: 'https://github.com/Demayne',
      category: 'automation',
      featured: true,
    },
    {
      id: 6,
      title: 'Live Project Portfolio',
      description: 'Continuously updated portfolio showcasing real-world full-stack projects with React, Laravel, MySQL, AJAX, Node.js, Express, and Authentication.',
      tech: ['React', 'Laravel', 'MySQL', 'AJAX', 'Node.js', 'Express'],
      github: 'https://github.com/Demayne/Demayne',
      category: 'fullstack',
      featured: false,
    },
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'automation', label: 'Automation' },
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'fullstack':
        return <FiLayers />
      case 'frontend':
        return <FiCode />
      case 'automation':
        return <FiDatabase />
      default:
        return <FiCode />
    }
  }

  return (
    <>
      <SEO
        title="Projects | Demayne Govender - Full-Stack Engineer Portfolio"
        description="Explore 15+ production-ready full-stack applications built with React, Node.js, Python, MongoDB, and MySQL. View my portfolio of web development projects."
        keywords="React Projects, Node.js Projects, Full Stack Projects, Web Development Portfolio, JavaScript Projects, Python Projects, MERN Stack Projects"
        ogImage="https://demayne-govender-portfolio.vercel.app/Demayne%20Govender%20Logo.png"
      />
      <section className="pt-20 sm:pt-24 min-h-screen bg-gray-900 overflow-x-hidden px-0" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.header className="text-center mb-8 sm:mb-12 px-2" variants={itemVariants}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-100 font-display leading-tight">
            My Projects
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
            A collection of projects showcasing my full-stack development capabilities,
            from frontend interfaces to backend systems and automation solutions.
          </p>
        </motion.header>

        <motion.div 
          className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 flex-wrap px-2" 
          variants={itemVariants}
          role="tablist"
          aria-label="Project category filters"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50'
                  : 'bg-gray-800/50 text-gray-300 border-2 border-gray-700/50 active:border-indigo-500 active:text-indigo-400'
              }`}
              onClick={() => setFilter(category.id)}
              aria-pressed={filter === category.id}
              role="tab"
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 px-2" 
          variants={containerVariants}
          role="list"
          aria-label="Projects"
        >
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              className={`bg-gray-800/50 p-4 sm:p-5 lg:p-8 rounded-lg sm:rounded-xl border transition-colors duration-200 relative overflow-hidden ${
                project.featured ? 'border-2 border-indigo-500 bg-gradient-to-br from-indigo-500/10 to-purple-500/10' : 'border-gray-700/50'
              }`}
              variants={itemVariants}
              role="listitem"
            >
              <div className={`absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-600 to-purple-600 ${
                project.featured ? 'opacity-100' : 'opacity-0'
              }`} aria-hidden="true" />
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-indigo-500/20 rounded-lg sm:rounded-xl text-2xl sm:text-3xl lg:text-4xl text-indigo-400 border border-indigo-500/30 flex-shrink-0" aria-hidden="true">
                  {getCategoryIcon(project.category)}
                </div>
                {project.featured && (
                  <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg shadow-indigo-500/50 flex-shrink-0">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-gray-100 leading-tight break-words">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 sm:mb-6 flex-grow break-words">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6" role="list" aria-label="Technologies used">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-md sm:rounded-full text-xs text-indigo-400 font-medium" role="listitem">
                    {tech}
                  </span>
                ))}
              </div>
              {project.id !== 5 && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-700 text-gray-100 rounded-lg font-medium transition-colors duration-200 active:bg-indigo-500 active:text-white border border-gray-600 active:border-indigo-500 text-xs sm:text-sm min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-label={`View ${project.title} code on GitHub`}
                >
                  <FiGithub aria-hidden="true" />
                  View Code
                </a>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.section 
          className="text-center py-8 sm:py-10 lg:py-12 bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-700/50 px-4 sm:px-6" 
          variants={itemVariants}
          aria-labelledby="github-cta"
        >
          <p id="github-cta" className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 break-words">
            Want to see more? Check out my GitHub profile for additional projects and contributions.
          </p>
          <a
            href="https://github.com/Demayne"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md active:shadow-lg transition-all duration-200 text-sm sm:text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Visit GitHub profile"
          >
            <FiGithub aria-hidden="true" />
            Visit GitHub
          </a>
        </motion.section>
      </motion.div>
    </section>
    </>
  )
}

export default Projects
