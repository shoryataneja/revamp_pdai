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

const stats = [
  { value: '200+', label: 'Enterprise Clients' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '10×', label: 'Faster Deployment' },
]

export default function HeroCopy() {
  const { heading, subheading, description, cta } = heroContent

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 lg:gap-8"
    >
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

      {/* Subheading */}
      <motion.p
        variants={item}
        className="text-lg font-medium sm:text-xl"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
      >
        {subheading}
      </motion.p>

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
        <Button as="a" href={cta.primary.href} size="lg">
          {cta.primary.label}
          <ArrowRight size={16} />
        </Button>
        <Button as="a" href={cta.secondary.href} size="lg" variant="secondary">
          {cta.secondary.label}
        </Button>
      </motion.div>

      {/* Trust stats */}
      <motion.div
        variants={item}
        className="flex flex-wrap items-center gap-6 pt-2"
      >
        {stats.map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-3">
            {i > 0 && (
              <span className="h-6 w-px" style={{ background: 'var(--color-border-bright)' }} />
            )}
            <div className="flex flex-col">
              <span
                className="text-xl font-bold leading-none"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                {value}
              </span>
              <span className="text-xs mt-0.5" style={{ color: 'var(--color-subtle)' }}>
                {label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
