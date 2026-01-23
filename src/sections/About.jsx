import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import profilePhoto from '../assets/profile.jpg'

const aboutLines = [
  "I'm a web developer focused on building clean, thoughtful, and reliable digital experiences.",
  "I enjoy working across frontend and backend, turning ideas into practical products.",
  "With a strong foundation in computer science, I value structure, clarity, and maintainable code.",
  "I like building projects that solve real problems and make a meaningful impact.",
  "Always learning, always improving, and open to new challenges.",
]

export default function About() {
  const lineVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.08,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <section id="about" className="section">
      <SectionHeading
        eyebrow="About"
        title="Who I Am"
        subtitle="A student and web developer, continuously learning and building clean, reliable digital experiences.
"
        
      />

      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="card p-8"
        >
          <div className="space-y-4">
            {aboutLines.map((line, i) => (
              <motion.p
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={lineVariants}
                className={i === 0 ? 'text-base font-medium text-white leading-relaxed' : 'text-sm text-zinc-400 leading-relaxed'}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative overflow-hidden rounded-2xl border border-divider/40 bg-gradient-to-b from-white/5 to-primaryBg/30 shadow-lg">
            {/* Profile image with head-and-shoulders crop */}
            <img 
              src={profilePhoto} 
              alt="Aaditya Sangwan profile photo" 
              className="aspect-[3/4] w-full object-cover object-top"
            />
            
            {/* Subtle dark overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primaryBg/5 to-primaryBg/25" />
          </div>
          
          {/* Subtle glow accent */}
          <div className="pointer-events-none absolute -inset-2 rounded-2xl opacity-30 blur-3xl" style={{ boxShadow: '0 0 60px 8px rgba(59,130,246,0.08)' }} />
        </motion.div>
      </div>
    </section>
  )
}
