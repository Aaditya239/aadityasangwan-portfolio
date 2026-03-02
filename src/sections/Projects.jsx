import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const projects = [
  {
    title: 'FarmCare',
    description: 'A farmer-focused platform designed to improve access to information and support better decision-making.',
    features: [
      'Live mandi crop prices based on location',
      'Tools tailored for farmers\' daily needs',
      'Simple, accessible interface for rural users',
      'Future-ready support for AI-based assistance',
    ],
    tags: ['Impact', 'Agriculture'],
    link: '',
  },
  {
    title: 'Unsaid',
    description: 'An anonymous space where people can share thoughts and emotions freely in a safe and non-judgmental environment.',
    features: [
      'Anonymous emotion and thought sharing',
      'Focus on mental well-being and self-expression',
      'Calm, distraction-free experience',
      'Designed to encourage openness and connection',
    ],
    tags: ['Wellness', 'Community'],
    link: 'https://unsaid-client-six.vercel.app/',
  },
]

function ProjectBlock({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className="card p-8 sm:p-10 hover:border-accent/30 transition-colors duration-300"
    >
      {/* Title */}
      <h3 className="font-display text-2xl sm:text-3xl text-textPrimary tracking-tight">
        {project.title}
      </h3>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="mt-5 text-base text-textSecondary leading-relaxed">
        {project.description}
      </p>

      {/* Features */}
      <div className="mt-6 space-y-2">
        <p className="text-xs uppercase tracking-widest text-textMuted font-medium">Key Features</p>
        <ul className="space-y-2">
          {project.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-textSecondary">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional CTA or link hint */}
      <div className="mt-6 pt-6 border-t border-divider">
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accentHover transition"
          >
            Learn more <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="section"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <SectionHeading
        eyebrow="My Works"
        title="Built with purpose"
        subtitle="Two projects focused on real needs and real people."
      />

      {/* Responsive grid: 1 column on mobile, 2 columns on desktop */}
      <div className="grid gap-6 md:gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectBlock key={project.title} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  )
}
