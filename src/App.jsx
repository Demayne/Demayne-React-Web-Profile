import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import CursorTrail from './components/CursorTrail'
import BackToTop from './components/BackToTop'
import FloatingSocial from './components/FloatingSocial'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
  const location = useLocation()
  const showFloatingSocial = location.pathname !== '/contact'

  return (
    <div className="App overflow-x-hidden" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <CursorTrail />
      <Navigation />
      {showFloatingSocial && <FloatingSocial />}
      <main id="main-content" role="main" className="overflow-x-hidden" style={{ maxWidth: '100vw' }}>
        <Suspense fallback={
          <div className="loading-screen" aria-label="Loading page">
            <div className="loader" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <BackToTop />
    </div>
  )
}

export default App
