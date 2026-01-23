import React, { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Premium typing + font transition for the hero name.
 * 1) Types the name in the default sans font.
 * 2) After completion + a small pause, crossfades to "Bitcount Single"
 *    with subtle letter-spacing easing for a cinematic feel.
 * Respects reduced motion: renders final state with a soft fade only.
 */
export default function NameTyping({
  text = 'Aaditya Sangwan',
  typingDelay = 120, // ms per char (slow & smooth)
  startDelay = 200,  // initial pause before typing
  holdAfterType = 400, // pause before font transition
}) {
  const shouldReduceMotion = useReducedMotion()

  const [displayText, setDisplayText] = useState(shouldReduceMotion ? text : '')
  const [doneTyping, setDoneTyping] = useState(shouldReduceMotion)
  const [showBitcount, setShowBitcount] = useState(shouldReduceMotion)

  useEffect(() => {
    if (shouldReduceMotion) return

    let mounted = true
    const chars = Array.from(text)

    const startTimer = setTimeout(() => {
      let i = 0
      const typeNext = () => {
        if (!mounted) return
        setDisplayText((prev) => prev + chars[i])
        i += 1
        if (i < chars.length) {
          setTimeout(typeNext, typingDelay)
        } else {
          setDoneTyping(true)
          setTimeout(() => {
            if (mounted) setShowBitcount(true)
          }, holdAfterType)
        }
      }
      typeNext()
    }, startDelay)

    return () => {
      mounted = false
      clearTimeout(startTimer)
    }
  }, [text, typingDelay, startDelay, holdAfterType, shouldReduceMotion])

  // Layer 1: typed default sans
  // Layer 2: Bitcount font — crossfade + tracking transition
  return (
    <div className="relative inline-block">
      {/* Typed layer (default sans) */}
      <motion.span
        aria-label={text}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="font-display text-left text-5xl leading-[0.95] tracking-[-0.02em] text-textPrimary sm:text-7xl md:text-8xl"
        style={{
          // Ensure text remains readable during typing
          willChange: 'contents',
        }}
      >
        {displayText}
      </motion.span>

      {/* Bitcount layer (overlaid), fades in once typing is done */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, filter: 'blur(2px)', letterSpacing: '-0.04em' }}
        animate={showBitcount ? { opacity: 1, filter: 'blur(0px)', letterSpacing: '-0.02em' } : {}}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        className="font-bitcount pointer-events-none absolute inset-0 select-none text-left text-5xl leading-[0.95] text-textPrimary sm:text-7xl md:text-8xl"
        style={{
          // match container flow; no cursor, no selection, cinematic overlay
          display: 'inline-block',
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}
