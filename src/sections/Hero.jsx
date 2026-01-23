import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import profilePhoto from '../assets/profile.jpg'

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

// Natural typing timing with micro-variations
const getTypingDelay = (index) => {
  // Longer pause between first name and last name (after "Aaditya")
  if (index === 7) return 180 // Pause after first name
  // Slight natural variation for different characters
  if (index === 0) return 400 // Initial delay before typing starts
  if ([4, 8, 14].includes(index)) return 140 // Slight pause at natural word boundaries
  return 90 + Math.random() * 50 // Natural variation between 90-140ms
}

export default function Hero() {
  const [displayedName, setDisplayedName] = useState('')
  const [nameComplete, setNameComplete] = useState(false)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  // Realistic name typing animation with natural timing
  useEffect(() => {
    if (displayedName.length < name.length) {
      const delay = getTypingDelay(displayedName.length)
      const timer = setTimeout(() => {
        setDisplayedName(name.slice(0, displayedName.length + 1))
      }, delay)
      return () => clearTimeout(timer)
    } else if (displayedName.length === name.length && !nameComplete) {
      // Subtle delay after typing completes before showing roles
      const timer = setTimeout(() => {
        setNameComplete(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [displayedName, nameComplete])

  // Role animation - starts only after name is complete
  useEffect(() => {
    if (!nameComplete) return

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 4500) // 4.5 second duration (0.5s transition + 4s display)
    return () => clearInterval(interval)
  }, [nameComplete])

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-primaryBg">
      {/* Animated cinematic background */}
      <AnimatedSpaceBackground />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-hero-gradient opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-radial opacity-[0.35]" />

      <div className="relative mx-auto flex min-h-screen w-full items-center justify-center container-px">
        <div className="grid w-full items-center gap-8 lg:grid-cols-2 lg:gap-8">
          {/* Left side: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            {/* Left-aligned: name, role, CTA */}
            <div className="relative z-10">
              {/* Typing animation for name - with text shadow and caret */}
              <h1 className="font-display text-5xl leading-[1.15] tracking-[-0.02em] text-textPrimary sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold min-h-[1.15em] drop-shadow-[0_0_30px_rgba(167,139,250,0.35)]">
                {displayedName}
                {displayedName.length < name.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                    className="ml-1 text-purple-400"
                    aria-hidden
                  >
                    |
                  </motion.span>
                )}
              </h1>

              {/* Looping role animation - elegant vertical slide + fade */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={nameComplete ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="mt-6 min-h-16 sm:mt-8 sm:min-h-20 md:mt-10 lg:min-h-24"
              >
                {nameComplete && (
                  <motion.div
                    key={currentRoleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-2xl font-semibold text-purple-400 sm:text-3xl md:text-4xl lg:text-4xl tracking-tight"
                  >
                    {roles[currentRoleIndex]}
                  </motion.div>
                )}
              </motion.div>

              {/* Subtle spacer and CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="mt-10 flex flex-col gap-4 sm:mt-12 md:mt-14 lg:flex-row"
              >
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center lg:justify-start gap-2 rounded-xl border border-divider bg-secondaryBg/60 px-6 py-3 text-textPrimary shadow-soft backdrop-blur transition-all hover:bg-secondaryBg/80 sm:px-8 sm:py-4 sm:text-lg"
                >
                  View Work <span aria-hidden>→</span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side: Profile Image - Circular with premium animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Animated circular container with enhanced shadow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative h-80 w-80 sm:h-96 sm:w-96 overflow-hidden rounded-full border border-divider/50 bg-gradient-to-br from-white/8 to-primaryBg/40 shadow-[0_20px_60px_-15px_rgba(167,139,250,0.3)]"
              >
                {/* Profile image with subtle zoom */}
                <motion.img 
                  src={profilePhoto} 
                  alt="Aaditya Sangwan profile photo" 
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                  className="h-full w-full object-cover object-top"
                />
                
                {/* Subtle dark overlay for premium blend */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-primaryBg/8 to-primaryBg/30"
                />
              </motion.div>
              
              {/* Enhanced animated subtle glow accent */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="pointer-events-none absolute -inset-8 rounded-full opacity-50 blur-3xl"
                style={{ boxShadow: '0 0 100px 16px rgba(167,139,250,0.15)' }}
              />

              {/* Animated ring for premium feel */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute -inset-10 rounded-full border border-purple-500/15"
              />

              {/* About description below circular image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                className="mt-8 text-center max-w-sm"
              >
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Full-stack developer building clean, intuitive digital experiences. Passionate about solving real problems with thoughtful code and intentional design.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
