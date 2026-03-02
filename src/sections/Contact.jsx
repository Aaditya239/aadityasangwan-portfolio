import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

function FloatingInput({ id, label, type = 'text', value, onChange, required = false, disabled = false }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => setFocused(e.target.value.length > 0 ? true : false)}
        required={required}
        disabled={disabled}
        className="peer w-full rounded-xl border border-divider bg-secondaryBg/60 px-4 pt-5 pb-2 text-textPrimary placeholder-transparent outline-none transition focus:border-accent focus:bg-secondaryBg/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder={label}
        autoComplete="off"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-3 inline-flex select-none px-1 text-sm text-textMuted transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-textSecondary"
      >
        {label}
      </label>
    </div>
  )
}

function FloatingTextarea({ id, label, value, onChange, required = false, disabled = false }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={5}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="peer w-full rounded-xl border border-divider bg-secondaryBg/60 px-4 pt-5 pb-3 text-textPrimary placeholder-transparent outline-none transition focus:border-accent focus:bg-secondaryBg/80 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-3 inline-flex select-none px-1 text-sm text-textMuted transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-focus:text-textSecondary"
      >
        {label}
      </label>
    </div>
  )
}

function IconButton({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.03, opacity: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="inline-flex items-center justify-center rounded-xl border border-divider bg-secondaryBg/60 p-3 text-textPrimary transition hover:border-accent hover:text-accentHover hover:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {children}
    </motion.a>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState({ type: null, message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setFeedback({ type: null, message: '' })

    try {
      const response = await fetch('https://formspree.io/f/mrepkkbg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      if (response.ok) {
        setFeedback({
          type: 'success',
          message: "Message sent! I'll get back to you soon.",
        })
        setForm({ name: '', email: '', message: '' })
        // Auto-clear success message after 5 seconds
        setTimeout(() => setFeedback({ type: null, message: '' }), 5000)
      } else {
        setFeedback({
          type: 'error',
          message: 'Something went wrong. Please try again.',
        })
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.section
      id="contact"
      className="section bg-primaryBg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <SectionHeading
        eyebrow="Contact"
        title="Let’s build something exceptional"
        subtitle="Open to new opportunities and meaningful collaborations."
      />

      <div className="grid gap-10 md:grid-cols-2">
        {/* Left — personal note & details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="card p-8"
        >
          <p className="max-w-md text-lg text-textSecondary">
            I keep things clean and intentional. If you have a modern idea or a role I’d be a fit for, I’d love to talk.
          </p>

          <div className="mt-8 space-y-3 text-textSecondary">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-textMuted">Email</span>
              <a href="mailto:aadityasangwan239@gmail.com" className="text-accent hover:text-accentHover">aadityasangwan239@gmail.com</a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-textMuted">Location</span>
              <span>India</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-textMuted">Availability</span>
              <span>Open to opportunities</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://github.com/Aaditya239" target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
            <a href="https://www.linkedin.com/in/aaditya-sangwan-2097a3315/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>

            {/* New minimal outline icons */}
            <IconButton href="https://www.instagram.com/aadi0.020/" label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M17.5 6.5h.01" />
              </svg>
            </IconButton>

            <IconButton href="https://x.com/Aaditya1157968" label="Twitter / X">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7" />
                <path d="M7 7l10 10" />
              </svg>
            </IconButton>
          </div>
        </motion.div>

        {/* Right — refined form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="card p-6 sm:p-8"
        >
          <div className="grid gap-5">
            <FloatingInput id="name" label="Your name" value={form.name} onChange={handleChange} required disabled={isLoading} />
            <FloatingInput id="email" type="email" label="Email address" value={form.email} onChange={handleChange} required disabled={isLoading} />
            <FloatingTextarea id="message" label="Your message" value={form.message} onChange={handleChange} required disabled={isLoading} />
          </div>

          {/* Feedback message */}
          {feedback.type && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                feedback.type === 'success'
                  ? 'border border-green-500/30 bg-green-500/10 text-green-400'
                  : 'border border-red-500/30 bg-red-500/10 text-red-400'
              }`}
            >
              {feedback.message}
            </motion.div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-textMuted">By sending, you consent to be contacted back.</p>
            <motion.button
              whileHover={!isLoading ? { y: -2 } : {}}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              type="submit"
              disabled={isLoading}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* fine divider */}
      <div className="pointer-events-none mt-16 h-px w-full bg-divider" />
    </motion.section>
  )
}
