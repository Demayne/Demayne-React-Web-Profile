import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiCode, FiDatabase, FiLayers } from 'react-icons/fi'

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
    <div className="pt-24 min-h-screen bg-gray-900" ref={ref}>
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-5xl font-bold mb-4 text-gray-100 font-display">My Projects</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A collection of projects showcasing my full-stack development capabilities,
            from frontend interfaces to backend systems and automation solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div className="flex justify-center gap-4 mb-12 flex-wrap" variants={itemVariants}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50'
                  : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-indigo-500 hover:text-indigo-400'
              }`}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" variants={containerVariants}>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`bg-gray-800 p-8 rounded-2xl shadow-lg shadow-indigo-900/20 border transition-all duration-300 relative overflow-hidden ${
                project.featured ? 'border-2 border-indigo-500 bg-gradient-to-br from-indigo-500/10 to-purple-500/10' : 'border-gray-700'
              }`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 transition-transform duration-300 ${
                project.featured ? 'scale-x-100' : 'group-hover:scale-x-100'
              }`}></div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-500/20 rounded-xl text-4xl text-indigo-400 border border-indigo-500/30">
                  {getCategoryIcon(project.category)}
                </div>
                {project.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg shadow-indigo-500/50">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-100">{project.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-6 flex-grow">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs text-indigo-400 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              {project.id !== 5 && (
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-gray-100 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-500 hover:text-white border border-gray-600 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/50"
                  >
                    <FiGithub />
                    View Code
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center py-12 bg-gray-800 rounded-2xl shadow-lg shadow-indigo-900/20 border border-gray-700" variants={itemVariants}>
          <p className="text-lg text-gray-300 mb-6">Want to see more? Check out my GitHub profile for additional projects and contributions.</p>
          <a
            href="https://github.com/Demayne"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <FiGithub />
            Visit GitHub
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Projects
