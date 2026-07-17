import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp } from '@utils/animations'
import { useTheme } from '@hooks/useTheme'

export default function CaseStudyCard({ study, onOpen, index }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const { icon: Icon, product, category, tagline, overview, accent, accentRgb, impact } = study

  return (
    <motion.div
      variants={fadeUp}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.55)'}`,
        boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)' : 'none',
        transition: 'box-shadow 300ms, border-color 300ms',
      }}
      onClick={() => onOpen(study)}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.45)`
        e.currentTarget.style.boxShadow = isLight
          ? `0 4px 24px rgba(${accentRgb}, 0.12)`
          : `0 0 0 1px rgba(${accentRgb}, 0.2)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isLight ? '#E2E8F0' : 'rgba(45,45,66,0.55)'
        e.currentTarget.style.boxShadow = isLight ? '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)' : 'none'
      }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, rgba(${accentRgb},0.3))` }} />

      <div className="flex flex-col gap-6 p-8">
        {/* Icon + category */}
        <div className="flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{ background: `rgba(${accentRgb}, 0.1)`, border: `1px solid rgba(${accentRgb}, 0.2)` }}
          >
            <Icon size={22} style={{ color: accent }} strokeWidth={1.75} />
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: `rgba(${accentRgb}, 0.08)`, color: accent }}
          >
            {category}
          </span>
        </div>

        {/* Title + tagline */}
        <div className="flex flex-col gap-2">
          <h3
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {product}
          </h3>
          <p className="text-sm font-medium" style={{ color: accent }}>
            {tagline}
          </p>
        </div>

        {/* Overview excerpt */}
        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: 'var(--color-muted)' }}
        >
          {overview}
        </p>

        {/* Impact metrics */}
        <div
          className="grid grid-cols-3 gap-4 rounded-xl p-4"
          style={{ background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)', border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.4)'}` }}
        >
          {impact.map(({ metric, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 text-center">
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: accent }}
              >
                {metric}
              </span>
              <span className="text-xs leading-tight" style={{ color: 'var(--color-muted)' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
          Read Case Study
          <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.div>
  )
}
