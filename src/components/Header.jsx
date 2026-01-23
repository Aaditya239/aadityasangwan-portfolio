import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  const closeMenu = () => setIsMenuOpen(false)

  const handleNavClick = (e) => {
    closeMenu()
  }

  // Mobile menu variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      pointerEvents: 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      pointerEvents: 'none',
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  }

  // Mobile menu item variants for stagger
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        delay: i * 0.05,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glass background with blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-primaryBg/95 via-primaryBg/90 to-primaryBg/80 backdrop-blur-md" />
      
      {/* Optional subtle border glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative container-px py-4 sm:py-5">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <motion.a
            href="#home"
            onClick={handleNavClick}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-white hover:text-purple-400 transition"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-sm font-bold">
              AS
            </span>
            <span className="hidden sm:inline">Aaditya</span>
          </motion.a>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="hidden gap-1 md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick}
                className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>

          {/* Desktop CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA Buttons */}
            <motion.a
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              Open to Work
            </motion.a>

            <motion.a
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
              href="#projects"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 transition-all duration-200 hover:bg-purple-500/20 hover:text-purple-200 hover:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              View Work
            </motion.a>

            {/* Mobile Menu Toggle - Hamburger Icon (Three Lines) */}
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="md:hidden relative h-10 w-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              {/* Hamburger Icon - Three horizontal lines */}
              <div className="flex flex-col gap-1.5 w-5">
                <motion.div
                  className="h-0.5 w-full bg-white rounded-full"
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <motion.div
                  className="h-0.5 w-full bg-white rounded-full"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
                <motion.div
                  className="h-0.5 w-full bg-white rounded-full"
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Glass effect dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden border-t border-white/10 bg-gradient-to-b from-primaryBg/80 to-primaryBg/60 backdrop-blur-lg"
          >
            <div className="container-px py-4 space-y-2">
              {/* Mobile Navigation Links */}
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="block rounded-lg px-4 py-3 text-base font-medium text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {item.label}
                </motion.a>
              ))}

              {/* Mobile CTA Buttons */}
              <motion.div
                custom={navItems.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex gap-2 pt-2"
              >
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="flex-1 rounded-lg px-4 py-3 text-center text-sm font-medium text-zinc-300 bg-white/5 transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  Open to Work
                </a>
                <a
                  href="#projects"
                  onClick={handleNavClick}
                  className="flex-1 rounded-lg px-4 py-3 text-center text-sm font-medium text-purple-300 border border-purple-500/40 bg-purple-500/10 transition-all duration-200 hover:bg-purple-500/20 hover:text-purple-200"
                >
                  View Work
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
