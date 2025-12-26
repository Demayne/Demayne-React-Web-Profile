import { lazy } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiCode, FiDatabase, FiCpu } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import SEO from '../components/SEO'

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const skills = [
    { icon: <FiCode />, name: 'Frontend', tech: 'React, JavaScript, HTML5, CSS3' },
    { icon: <FiDatabase />, name: 'Backend', tech: 'Node.js, Express, Django, Python' },
    { icon: <FiCpu />, name: 'Full Stack', tech: 'MERN Stack, REST APIs, JWT' },
  ]

  return (
    <>
      <SEO
        title="Demayne Govender | Full-Stack Engineer - Portfolio"
        description="Full-Stack Engineer delivering scalable web solutions and enterprise automation systems. Top-ranked graduate with 15+ production applications. React, Node.js, Python developer."
        keywords="Full Stack Developer, React Developer, JavaScript, Python, Node.js, Web Developer, Software Engineer, Portfolio, South Africa, MERN Stack"
        ogImage="https://demayne-govender-portfolio.vercel.app/Demayne%20Govender%20Logo.png"
      />
      <div className="pt-20">
      <section 
        className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-indigo-900/30 to-purple-900/30 overflow-hidden py-8 sm:py-12 lg:py-0" 
        ref={heroRef}
        aria-label="Hero section"
      >
        <div className="absolute inset-0 opacity-10 sm:opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)' }} aria-hidden="true" />
        <div className="absolute inset-0 opacity-10 sm:opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)' }} aria-hidden="true" />
        
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
        >
          {/* Mobile-First Content Layout */}
          <motion.div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center" variants={itemVariants}>
            {/* Main Content - Always First */}
            <motion.div className="flex flex-col gap-5 sm:gap-6 text-center lg:text-left w-full" variants={itemVariants}>
              {/* Badge */}
              <motion.div
                className="inline-block px-3 sm:px-4 py-1.5 bg-indigo-500/10 border border-indigo-400/20 rounded-full text-xs sm:text-sm font-medium text-indigo-400 w-fit mx-auto lg:mx-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <span>Full Stack Developer</span>
              </motion.div>
              
              {/* Name - Prominent */}
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight text-gray-100 break-words"
                variants={itemVariants}
              >
                Hi, I'm <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-display">Demayne Govender</span>
              </motion.h1>
              
              {/* Value Proposition - Key Info */}
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 break-words font-medium"
                variants={itemVariants}
              >
                Full-Stack Engineer delivering scalable web solutions and enterprise automation systems. Top-ranked graduate with a proven track record of architecting and deploying 15+ production applications across modern technology stacks.
              </motion.p>
              
              {/* CTAs - Prominent */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start pt-2"
                variants={itemVariants}
              >
                <Link 
                  to="/projects" 
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg active:shadow-xl transition-all duration-200 text-sm sm:text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  View My Work
                  <FiArrowRight aria-hidden="true" />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-indigo-400 font-semibold rounded-lg border-2 border-indigo-500 active:bg-indigo-500 active:text-white transition-all duration-200 text-sm sm:text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Get In Touch
                </Link>
              </motion.div>
              
              {/* Social Links */}
              <motion.div 
                className="flex gap-4 justify-center lg:justify-start pt-2"
                variants={itemVariants}
                role="list"
                aria-label="Social links"
              >
                <a
                  href="https://github.com/Demayne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-gray-100 text-xl transition-colors duration-200 active:bg-indigo-500 active:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 min-w-[48px] min-h-[48px]"
                  aria-label="GitHub profile"
                >
                  <FiGithub aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/demayne-govender-452890316"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-gray-100 text-xl transition-colors duration-200 active:bg-indigo-500 active:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 min-w-[48px] min-h-[48px]"
                  aria-label="LinkedIn profile"
                >
                  <FiLinkedin aria-hidden="true" />
                </a>
                <a
                  href="mailto:govender.demayne@gmail.com"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-gray-100 text-xl transition-colors duration-200 active:bg-indigo-500 active:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 min-w-[48px] min-h-[48px]"
                  aria-label="Send email"
                >
                  <FiMail aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
            
            {/* Logo - Hidden on Mobile, Shown on Tablet+ */}
            <motion.div
              className="hidden md:flex lg:flex justify-center items-center order-first lg:order-last"
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-full max-w-sm lg:max-w-md h-72 lg:h-96 flex items-center justify-center bg-gray-800/50 rounded-2xl shadow-2xl shadow-indigo-500/10 p-6 lg:p-8 relative overflow-hidden border border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent" aria-hidden="true" />
                <img 
                  src="/Demayne Govender Logo.png" 
                  alt="Demayne Govender - Full-Stack Engineer Portfolio Logo" 
                  className="w-full h-full object-contain relative z-10 brightness-110"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-hidden="true"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 border-r-2 border-b-2 border-indigo-400/60 rotate-45" />
        </motion.div>
      </section>

      <section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900" 
        ref={skillsRef}
        aria-labelledby="skills-heading"
      >
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={skillsInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 
            id="skills-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 text-gray-100 font-display leading-tight"
            variants={itemVariants}
          >
            What I Do
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-gray-800/50 p-5 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl text-center border border-gray-700/50 sm:hover:border-indigo-500/50 transition-colors duration-200"
                variants={itemVariants}
              >
                <div className="text-3xl sm:text-4xl text-indigo-400 mb-3 sm:mb-4 flex justify-center" aria-hidden="true">
                  {skill.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-100 leading-tight">{skill.name}</h3>
                <p className="text-xs sm:text-sm text-gray-400 break-words">{skill.tech}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center"
        aria-labelledby="cta-heading"
      >
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display leading-tight break-words">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 break-words">
            I'm always open to discussing new projects and opportunities.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-semibold rounded-lg active:bg-gray-50 transition-colors duration-200 text-sm sm:text-base md:text-lg min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            Start a Conversation
            <FiArrowRight aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </div>
    </>
  )
}

export default Home
