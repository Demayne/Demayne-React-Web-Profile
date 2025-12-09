import { useEffect, useRef } from 'react'

const CursorTrail = () => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Code symbols for the trail
    const codeSymbols = [
      '<', '>', '{', '}', '[', ']', '(', ')',
      '/', '\\', '*', '+', '-', '=', '|', '&',
      '%', '#', '@', '!', '?', ':', ';', '"',
      "'", '`', '~', '^', '&', '|', '&&', '||',
      '=>', '==', '===', '!=', '!==', '++', '--',
      '{}', '[]', '()', '/*', '*/', '//'
    ]

    // Color palette for the symbols
    const colors = [
      '#6366f1', // Indigo
      '#8b5cf6', // Purple
      '#ec4899', // Pink
      '#f59e0b', // Amber
      '#10b981', // Emerald
      '#3b82f6', // Blue
      '#f97316', // Orange
      '#06b6d4', // Cyan
    ]

    // Particle class with code symbols
    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
        this.size = Math.random() * 16 + 12 // Font size
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.life = 1
        this.decay = Math.random() * 0.02 + 0.02
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= this.decay
        this.size *= 0.98
        this.rotation += this.rotationSpeed
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.life
        ctx.fillStyle = this.color
        ctx.font = `bold ${this.size}px 'Courier New', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.fillText(this.symbol, 0, 0)
        ctx.restore()
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // Create new particles at mouse position
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push(
          new Particle(e.clientX, e.clientY)
        )
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i]
        particle.update()
        particle.draw()

        // Remove dead particles
        if (particle.life <= 0 || particle.size <= 8) {
          particlesRef.current.splice(i, 1)
        }
      }

      // Limit particle count
      if (particlesRef.current.length > 100) {
        particlesRef.current.splice(0, particlesRef.current.length - 100)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default CursorTrail

