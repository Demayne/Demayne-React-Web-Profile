import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiCode, FiDatabase, FiCpu } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'

const Home = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.05, triggerOnce: true })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const skills = [
    { icon: <FiCode />, name: 'Frontend', tech: 'React, JavaScript, HTML5, CSS3' },
    { icon: <FiDatabase />, name: 'Backend', tech: 'Node.js, Express, Django, Python' },
    { icon: <FiCpu />, name: 'Full Stack', tech: 'MERN Stack, REST APIs, JWT' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-indigo-900/50 to-purple-900/50 overflow-hidden" ref={heroRef}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)' }}></div>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)' }}></div>
        
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? 'visible' : 'hidden'}
        >
          <motion.div className="flex flex-col gap-6" variants={itemVariants}>
            <motion.div
              className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-sm font-medium text-indigo-400 w-fit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <span>Full Stack Developer</span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-100" variants={itemVariants}>
              Hi, I'm <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-display">Demayne Govender</span>
            </motion.h1>
            <motion.p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl px-2" variants={itemVariants}>
              Full-Stack Engineer delivering scalable web solutions and enterprise automation systems. Top-ranked graduate with a proven track record of architecting and deploying 15+ production applications across modern technology stacks.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap px-2" variants={itemVariants}>
              <Link to="/projects" className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base touch-manipulation">
                View My Work
                <FiArrowRight />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-gray-800 text-indigo-400 font-semibold rounded-lg border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white transition-all duration-300 text-sm sm:text-base touch-manipulation">
                Get In Touch
              </Link>
            </motion.div>
            <motion.div className="flex gap-3 sm:gap-4 mt-4 px-2" variants={itemVariants}>
              <a
                href="https://github.com/Demayne"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-gray-800 text-gray-100 text-xl transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/50 touch-manipulation"
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/demayne-govender-452890316"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-gray-800 text-gray-100 text-xl transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/50 touch-manipulation"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="mailto:govender.demayne@gmail.com"
                className="flex items-center justify-center w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-gray-800 text-gray-100 text-xl transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/50 touch-manipulation"
                aria-label="Email"
              >
                <FiMail />
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex justify-center items-center"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="w-full max-w-md h-64 sm:h-80 lg:h-96 flex items-center justify-center bg-gray-800 rounded-2xl shadow-2xl shadow-indigo-500/20 p-4 sm:p-6 lg:p-8 relative overflow-hidden border border-gray-700 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent animate-shine"></div>
              <img src="/Demayne Govender Logo.png" alt="Demayne Govender Logo" className="w-full h-full object-contain relative z-10 brightness-110" />
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-7 h-7 border-r-2 border-b-2 border-indigo-400 rotate-45"></div>
        </motion.div>
      </section>

      {/* Skills Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900" ref={skillsRef}>
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate={skillsInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-100 font-display px-4" variants={itemVariants}>
            What I Do
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg shadow-indigo-900/20 text-center border border-gray-700 hover:shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="text-4xl sm:text-5xl text-indigo-400 mb-3 sm:mb-4 flex justify-center">{skill.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-100">{skill.name}</h3>
                <p className="text-gray-300 text-xs sm:text-sm">{skill.tech}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-display px-4">Let's Build Something Amazing Together</h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 px-4">I'm always open to discussing new projects and opportunities.</p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 text-base sm:text-lg touch-manipulation">
            Start a Conversation
            <FiArrowRight />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
