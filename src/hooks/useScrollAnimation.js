import { useInView } from 'framer-motion'
import { useRef } from 'react'

/**
 * Returns a ref and animation variants for scroll-triggered entrance.
 * @param {object} options - useInView options
 */
export function useScrollAnimation(options = { once: true, margin: '-80px' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, options)

  const variants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return { ref, variants, animate: isInView ? 'visible' : 'hidden' }
}
