import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import { useCounter } from '@hooks/useCounter'
import { useTheme } from '@hooks/useTheme'
import { stats, statsHeading } from '@data/stats'
import { staggerContainer, fadeUp, viewport } from '@utils/animations'

const EASE = [0.16, 1, 0.3, 1]

function StatCard({ icon: Icon, value, suffix, label, description, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCounter(value, 1800, inView)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
      className="group relative flex flex-col gap-6 rounded-2xl p-8 overflow-hidden"
      style={{
        background: isLight ? '#FFFFFF' : 'rgba(20, 20, 26, 0.55)',
        border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45, 45, 66, 0.7)'}`,
        boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Hover border glow — separate layer so it doesn't affect layout */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          border: '1px solid rgba(168, 85, 247, 0.35)',
          transition: 'opacity 300ms',
        }}
      />

      {/* Top-right ambient glow on hover */}
      <div
        className="absolute -top-12 -right-12 h-32 w-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transition: 'opacity 400ms',
        }}
      />

      {/* Icon */}
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: 'rgba(124, 58, 237, 0.12)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        }}
      >
        <Icon size={22} style={{ color: 'var(--color-purple-accent)' }} strokeWidth={1.75} />
      </div>

      {/* Counter */}
      <div className="flex flex-col gap-1">
        <div className="flex items-end gap-0.5 leading-none">
          <span
            className="tabular-nums"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, var(--color-text) 30%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {count}
          </span>
          <span
            className="mb-1.5 text-3xl font-bold"
            style={{
              fontFamily: 'var(--font-heading)',
              background: 'linear-gradient(135deg, var(--color-text) 30%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {suffix}
          </span>
        </div>

        <span
          className="text-lg font-semibold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          {label}
        </span>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, rgba(168,85,247,0.3) 0%, transparent 100%)',
        }}
      />

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {description}
      </p>
    </motion.div>
  )
}

/* ── Section ────────────────────────────────────────────────────── */
export default function Stats() {
  return (
    <SectionWrapper
      id="stats"
      wrapperClassName="overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      {/* Background orb */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.25 }}
      />

      <div className="relative z-10 flex flex-col gap-16">
        {/* Heading */}
        <SectionHeading
          eyebrow={statsHeading.eyebrow}
          title={statsHeading.title}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
