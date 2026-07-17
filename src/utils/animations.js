/* Premium easing — matches CSS --ease-smooth */
const smooth = [0.16, 1, 0.3, 1]
const spring = { type: 'spring', stiffness: 300, damping: 30 }

/** Fade up — standard entrance */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smooth },
  },
}

/** Fade down */
export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smooth },
  },
}

/** Fade in — pure opacity */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: smooth } },
}

/** Slide in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smooth } },
}

/** Slide in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smooth } },
}

/** Scale up — for cards and modals */
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: smooth },
  },
}

/** Stagger container — wraps children that animate in sequence */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

/** Stagger container — slower, for hero sections */
export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

/** Spring pop — for badges and small UI elements */
export const springPop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring,
  },
}

/** Blur in — premium entrance with blur */
export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: smooth },
  },
}

/** Line reveal — for horizontal dividers */
export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: smooth },
  },
}

/** Shared viewport config — use with whileInView */
export const viewport = { once: true, margin: '-80px' }
