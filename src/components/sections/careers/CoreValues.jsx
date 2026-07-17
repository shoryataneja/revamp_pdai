import { motion } from 'framer-motion'
import { useTheme } from '@hooks/useTheme'
import { coreValues } from '@data/careers'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

function describeArc(cx, cy, r, startAngle, endAngle) {
  const toRad = a => (a * Math.PI) / 180
  const x1 = cx + r * Math.cos(toRad(startAngle))
  const y1 = cy + r * Math.sin(toRad(startAngle))
  const x2 = cx + r * Math.cos(toRad(endAngle))
  const y2 = cy + r * Math.sin(toRad(endAngle))
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`
}

function ValueCard({ icon: Icon, label, isLight }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-6 rounded-2xl p-8"
      style={{
        background: isLight ? 'rgba(124,58,237,0.07)' : 'rgba(124,58,237,0.12)',
        border: `1px solid ${isLight ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.22)'}`,
      }}
    >
      {/* Segmented ring icon */}
      <div className="relative shrink-0 flex items-center justify-center" style={{ width: 72, height: 72 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="absolute inset-0">
          {[0, 90, 180, 270].map((angle, i) => (
            <path
              key={i}
              d={describeArc(36, 36, 32, angle + 6, angle + 79)}
              stroke={`rgba(124,58,237,${isLight ? 0.35 : 0.5})`}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </svg>
        <div
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{ width: 46, height: 46, background: 'var(--color-purple)' }}
        >
          <Icon size={20} color="#fff" strokeWidth={1.75} />
        </div>
      </div>

      <span
        className="text-lg font-semibold leading-snug"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export default function CoreValues() {
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
          Our core <span style={{ color: 'var(--color-purple-accent)' }}>values</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {coreValues.map(v => (
          <ValueCard key={v.label} {...v} isLight={isLight} />
        ))}
      </motion.div>
    </div>
  )
}
