import React from 'react'
import { motion } from 'framer-motion'

export default function HorizontalProjectCard({ project }) {
  return (
    <motion.a
      href={project.href || '#'}
      target={project.href ? '_blank' : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative aspect-[16/10] w-[85vw] max-w-xl snap-start overflow-hidden rounded-3xl border border-divider bg-cardBg shadow-card sm:w-[32rem] lg:w-[40rem]"
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.6,0,1)] group-hover:scale-[1.04]"
      />

      {/* Overlay (gradient using primary/secondary) */}
      <div className="absolute inset-0 bg-gradient-to-t from-primaryBg/80 via-primaryBg/10 to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-center gap-2 pb-3">
          {(project.tags || []).slice(0, 2).map((t) => (
            <span key={t} className="inline-flex items-center rounded-full border border-divider bg-secondaryBg/80 px-2.5 py-1 text-[11px] font-medium text-textSecondary">
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-textPrimary sm:text-3xl">
          {project.title}
        </h3>
      </div>

      {/* Hover lift + subtle accent glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-500 group-hover:opacity-100" style={{ boxShadow: '0 0 0 1px rgba(59,130,246,0.15), 0 0 80px 8px rgba(59,130,246,0.15)'}} />
    </motion.a>
  )
}
