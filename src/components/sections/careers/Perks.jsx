import { motion } from 'framer-motion'
import { useTheme } from '@hooks/useTheme'
import { perks } from '@data/careers'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

function PerkCard({ icon: Icon, title, description, isLight }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-5 rounded-2xl p-6"
      style={{
        background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.6)'}`,
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: 'var(--color-purple)' }}
      >
        <Icon size={18} color="#fff" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-2">
        <h4
          className="font-semibold leading-snug"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1.0625rem' }}
        >
          {title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Perks() {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <div className="flex flex-col gap-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="flex flex-col items-center gap-3 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-heading" style={{ fontSize: 'var(--text-h2)' }}>
          More reasons to love{' '}
          <span style={{ color: 'var(--color-purple-accent)' }}>Popular Digital AI</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {perks.map(p => (
          <PerkCard key={p.title} {...p} isLight={isLight} />
        ))}
      </motion.div>
    </div>
  )
}
