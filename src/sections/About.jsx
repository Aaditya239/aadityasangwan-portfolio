import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const aboutLines = [
  "I'm a full-stack web developer with a passion for building clean, intuitive, and performant digital experiences.",
  "My approach is simple: understand the problem deeply, then craft thoughtful solutions that work beautifully.",
  "I love the entire process—from design systems and component architecture to optimization and deployment.",
  "I believe great code is readable code. I prioritize maintainability, clarity, and intentional design.",
  "Beyond shipping features, I'm driven by solving real problems that make a meaningful difference.",
  "I'm constantly learning, exploring new technologies, and pushing my limits as an engineer."
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

      <div className="mx-auto max-w-3xl">
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
      </div>
    </section>
  )
}
