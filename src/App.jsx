import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen bg-primaryBg">
      {/* Ambient background gradients */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-hero-gradient opacity-90" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-grid-radial" />

      <Header />

      <AnimatePresence mode="wait">
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </AnimatePresence>

      <footer className="section pt-8 text-center text-sm text-zinc-400">
        Crafted with care by Aaditya Sangwan
      </footer>
    </div>
  )
}
