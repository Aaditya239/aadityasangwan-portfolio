import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project }) {
  return (
    <motion.a
      href={project.href || '#'}
      target={project.href ? '_blank' : undefined}
      rel="noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group card overflow-hidden relative"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="mb-2 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
        <h3 className="font-display text-xl text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-zinc-400">{project.description}</p>

        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-300">
          {project.href && <span className="inline-flex items-center gap-2">Visit<span aria-hidden>→</span></span>}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="hover:underline">Code</a>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 0 120px 10px rgba(120,120,255,0.08)'}} />
    </motion.a>
  )
}
