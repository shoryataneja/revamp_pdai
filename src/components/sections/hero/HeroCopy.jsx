import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { heroContent } from '@data/hero'
import Button from '@ui/Button'

const EASE = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const item = {
  hidden:   { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible:  { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE } },
}

export default function HeroCopy() {
  const { eyebrow, heading, description, cta } = heroContent

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 lg:gap-8"
    >
      {/* Eyebrow badge */}
      <motion.span
        variants={item}
        className="text-eyebrow inline-flex items-center gap-2"
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-purple-accent)' }} />
        {eyebrow}
      </motion.span>

      {/* Heading */}
      <motion.div variants={item} className="flex flex-col gap-1">
        <h1 className="text-display">
          {/* Line 1 — plain white */}
          <span style={{ display: 'block' }}>{heading[0]}</span>
          {/* Line 2 — gradient highlight on key words */}
          <span style={{ display: 'block' }}>
            <span className="gradient-text">{heading[1]}</span>
          </span>
          {/* Line 3 — plain white */}
          <span style={{ display: 'block' }}>{heading[2]}</span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        variants={item}
        className="text-body max-w-lg"
        style={{ fontSize: '1.0625rem' }}
      >
        {description}
      </motion.p>

      {/* CTA buttons */}
      <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
        <Button as="a" href={cta.primary.href} size="lg" className="w-full sm:w-auto">
          {cta.primary.label}
          <ArrowRight size={16} />
        </Button>
        <Button as="a" href={cta.secondary.href} size="lg" variant="secondary" className="w-full sm:w-auto">
          {cta.secondary.label}
        </Button>
      </motion.div>
    </motion.div>
  )
}
