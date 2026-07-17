import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '@ui/Button'

const EASE = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

/**
 * @param {object}  showcase  - single showcase entry from showcases.js
 */
export default function ShowcaseContent({ showcase }) {
  const { name, tagline, description, features, accent, accentRgb, cta } = showcase

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col gap-7"
    >
      {/* Name + tagline */}
      <motion.div variants={item} className="flex flex-col gap-2">
        <h2
          className="text-heading"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}
        >
          {name}
        </h2>
        <span
          className="text-sm font-medium uppercase tracking-widest"
          style={{ color: `rgba(${accentRgb}, 0.8)` }}
        >
          {tagline}
        </span>
      </motion.div>

      {/* Description */}
      <motion.p variants={item} className="text-body" style={{ fontSize: '1.0625rem' }}>
        {description}
      </motion.p>

      {/* Feature list */}
      <motion.ul variants={item} className="flex flex-col gap-3">
        {features.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-3">
            {/* Icon container */}
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
              style={{
                background: `rgba(${accentRgb}, 0.1)`,
                border: `1px solid rgba(${accentRgb}, 0.2)`,
              }}
            >
              <Icon size={13} style={{ color: accent }} strokeWidth={2} />
            </span>
            <span className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {text}
            </span>
          </li>
        ))}
      </motion.ul>

      {/* CTA */}
      <motion.div variants={item}>
        <Button
          as="a"
          href={cta.href}
          size="md"
          style={{
            background: accent,
            boxShadow: `0 0 24px rgba(${accentRgb}, 0.35)`,
          }}
          className="hover:opacity-90"
        >
          {cta.label}
          <ArrowRight size={15} />
        </Button>
      </motion.div>
    </motion.div>
  )
}
