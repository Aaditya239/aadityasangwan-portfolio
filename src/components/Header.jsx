import React from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-night-950/40">
      <div className="section py-4">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-night-900/60 px-4 py-3 shadow-soft">
          <a href="#home" className="font-display text-lg font-semibold tracking-tight text-white">AS</a>

          <nav className="hidden gap-1 md:flex">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-ghost hidden sm:inline-flex">Open to Internships</a>
            <a href="#projects" className="btn-primary">View Work</a>
          </div>
        </div>
      </div>
    </header>
  )
}
