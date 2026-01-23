import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/*********************** Animated Space Background ************************/
function rand(min, max) { return Math.random() * (max - min) + min }

function AnimatedSpaceBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const lastCometRef = useRef(0)
  const starsRef = useRef([])
  const cometsRef = useRef([])
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let mounted = true

    const STAR_COUNT = 160
    const COMET_INTERVAL_MS = 5500
    const DPR_LIMIT = 2

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT)
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // regenerate stars
      starsRef.current = Array.from({ length: STAR_COUNT }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.4),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.0005, 0.0012),
        baseAlpha: rand(0.2, 0.5),
      }))
      cometsRef.current = []
    }

    function spawnComet(time) {
      const { innerWidth: w, innerHeight: h } = window
      const startX = rand(-0.1 * w, 0.2 * w)
      const startY = rand(0.6 * h, 1.1 * h)
      const speed = rand(40, 80)
      const angle = -Math.PI / 4
      const life = rand(2500, 4200)
      cometsRef.current.push({
        x: startX, y: startY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        born: time, life,
      })
    }

    function draw(time) {
      if (!mounted) return
      const { innerWidth: w, innerHeight: h } = window
      // clear with primaryBg
      ctx.fillStyle = '#0B0F14'
      ctx.fillRect(0, 0, w, h)

      // stars
      for (const s of starsRef.current) {
        let alpha = s.baseAlpha
        if (!shouldReduceMotion) {
          alpha = s.baseAlpha + 0.15 * Math.sin(s.phase + time * s.speed)
        }
        ctx.globalAlpha = Math.max(0.08, Math.min(0.6, alpha))
        ctx.fillStyle = '#6B7280' // textMuted
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // comets
      if (!shouldReduceMotion && time - lastCometRef.current > COMET_INTERVAL_MS && cometsRef.current.length < 2) {
        spawnComet(time)
        lastCometRef.current = time
      }

      const nextComets = []
      for (const c of cometsRef.current) {
        const age = time - c.born
        const t = Math.min(1, age / c.life)
        const dt = 1 / 60
        c.x += c.vx * dt * 0.5
        c.y += c.vy * dt * 0.5

        const grad = ctx.createLinearGradient(c.x - c.vx * 0.01, c.y - c.vy * 0.01, c.x - c.vx * 0.2, c.y - c.vy * 0.2)
        grad.addColorStop(0, 'rgba(156,163,175,0.6)') // textSecondary
        grad.addColorStop(1, 'rgba(156,163,175,0)')

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(c.x - c.vx * 0.15, c.y - c.vy * 0.15)
        ctx.stroke()

        ctx.globalAlpha = 0.7 * (1 - t)
        ctx.fillStyle = 'rgba(156,163,175,0.5)'
        ctx.beginPath()
        ctx.arc(c.x, c.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        if (age < c.life) nextComets.push(c)
      }
      cometsRef.current = nextComets

      rafRef.current = requestAnimationFrame(draw)
    }

    function start() {
      resize()
      if (!shouldReduceMotion) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        draw(0) // static paint
      }
    }

    start()
    window.addEventListener('resize', resize)
    return () => {
      mounted = false
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [shouldReduceMotion])

  return (
    <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden />
  )
}

/********************************** Hero **********************************/

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Software Engineer',
]

const name = 'Aaditya Sangwan'

export default function Hero() {
  const [displayedName, setDisplayedName] = useState('')
  const [nameComplete, setNameComplete] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  // Name typing animation
  useEffect(() => {
    if (displayedName.length < name.length) {
      const delay = displayedName.length === 0 ? 400 : 120 // 400ms delay before starting, 120ms per letter
      const timer = setTimeout(() => {
        setDisplayedName(name.slice(0, displayedName.length + 1))
      }, delay)
      return () => clearTimeout(timer)
    } else if (displayedName.length === name.length && !nameComplete) {
      // Add a small delay after typing completes before showing roles
      const timer = setTimeout(() => {
        setNameComplete(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [displayedName, nameComplete])

  // Role animation - starts only after name is complete
  useEffect(() => {
    if (!nameComplete) return

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 4000) // Change role every 4 seconds
    return () => clearInterval(interval)
  }, [nameComplete])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-primaryBg">
      {/* Animated cinematic background */}
      <AnimatedSpaceBackground />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-radial opacity-[0.35]" />

      <div className="relative mx-auto flex min-h-screen w-full items-center container-px">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-full text-left md:max-w-2xl lg:max-w-3xl"
        >
          {/* Left-aligned: name, role, CTA */}
          <div className="relative z-10">
            {/* Typing animation for name */}
            <h1 className="font-display text-left text-5xl leading-[1.1] tracking-[-0.02em] text-textPrimary sm:text-6xl md:text-7xl lg:text-8xl min-h-[1.1em]">
              {displayedName}
            </h1>

            {/* Looping role animation - starts after name completes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={nameComplete ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="mt-6 min-h-12 sm:mt-8 sm:min-h-14 md:mt-10 md:min-h-16"
            >
              {nameComplete && (
                <motion.div
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="text-xl font-medium text-blue-400 sm:text-2xl md:text-3xl lg:text-4xl"
                >
                  {roles[currentRoleIndex]}
                </motion.div>
              )}
            </motion.div>

            <div className="mt-12 sm:mt-14 md:mt-16">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-divider bg-secondaryBg/60 px-6 py-3 text-textPrimary shadow-soft backdrop-blur transition-all hover:bg-secondaryBg/80 sm:px-8 sm:py-4 sm:text-lg"
              >
                View Work <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
