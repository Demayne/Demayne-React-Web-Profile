import { useEffect, useRef } from 'react'

const CursorTrail = () => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef(null)
  const rafActiveRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    const codeSymbols = [
      '<', '>', '{', '}', '[', ']', '/', '*', '+', '-', '=', '|', '&', '%', '#', '@', '!', '?', ':', ';', '=>', '==', '==='
    ]

    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#3b82f6']

    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)]
        this.size = Math.random() * 12 + 10
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.life = 1
        this.decay = Math.random() * 0.015 + 0.015
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.08
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life -= this.decay
        this.size *= 0.99
        this.rotation += this.rotationSpeed
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.life * 0.6
        ctx.fillStyle = this.color
        ctx.font = `bold ${this.size}px 'Courier New', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.fillText(this.symbol, 0, 0)
        ctx.restore()
      }
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      if (particlesRef.current.length < 80) {
        for (let i = 0; i < 1; i++) {
          particlesRef.current.push(new Particle(e.clientX, e.clientY))
        }
      }
    }

    const animate = () => {
      if (!rafActiveRef.current) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i]
        particle.update()
        particle.draw()

        if (particle.life <= 0 || particle.size <= 6) {
          particlesRef.current.splice(i, 1)
        }
      }

      if (particlesRef.current.length > 80) {
        particlesRef.current.splice(0, particlesRef.current.length - 80)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      if (!rafActiveRef.current) {
        rafActiveRef.current = true
        animate()
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousemove', startAnimation, { once: true, passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resizeCanvas)
      rafActiveRef.current = false
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
      aria-hidden="true"
    />
  )
}

export default CursorTrail
