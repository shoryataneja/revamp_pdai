import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { useTheme } from '@hooks/useTheme'

const EASE = [0.16, 1, 0.3, 1]

/* ── Inline SVG logo mark ───────────────────────────────────────── */
function ProductLogo({ logoPath, accent, accentRgb }) {
  return (
    <div
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
      style={{
        background: `rgba(${accentRgb}, 0.1)`,
        border: `1px solid rgba(${accentRgb}, 0.25)`,
        boxShadow: `0 0 16px rgba(${accentRgb}, 0.15)`,
      }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={accent}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {logoPath.split(' M').map((segment, i) => (
          <path key={i} d={i === 0 ? segment : `M${segment}`} />
        ))}
      </svg>
    </div>
  )
}

/* ── Tag pill chip ──────────────────────────────────────────────── */
function TagPill({ label, accent, accentRgb }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{
        background: `rgba(${accentRgb}, 0.1)`,
        border: `1px solid rgba(${accentRgb}, 0.2)`,
        color: accent,
      }}
    >
      {label}
    </span>
  )
}

/* ── Card ───────────────────────────────────────────────────────── */
/**
 * Reusable product card.
 * @param {object} product - product data object from products.js
 * @param {number} index   - used for stagger delay
 */
export default function ProductCard({ product, index }) {
  const { name, tagline, description, tags, accent, accentRgb, logoPath, href, isCTA } = product
  const { theme } = useTheme()
  const isLight = theme === 'light'

  /* Subtle 3-D tilt on mouse move */
  const cardRef = useRef(null)
  const mouseX  = useMotionValue(0)
  const mouseY  = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (isCTA) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
      >
        <a
          href={href}
          className="group relative flex h-full flex-col items-center justify-center gap-6 rounded-2xl p-8 text-center cursor-pointer"
          style={{
            border: `2px dashed rgba(${accentRgb}, 0.35)`,
            background: `rgba(${accentRgb}, 0.03)`,
            minHeight: 280,
            transition: 'border-color 300ms, background 300ms',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.7)`
            e.currentTarget.style.background = `rgba(${accentRgb}, 0.07)`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = `rgba(${accentRgb}, 0.35)`
            e.currentTarget.style.background = `rgba(${accentRgb}, 0.03)`
          }}
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, rgba(${accentRgb}, 0.08) 0%, transparent 70%)`,
              transition: 'opacity 400ms',
            }}
          />
          <div
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: `rgba(${accentRgb}, 0.12)`,
              border: `1px solid rgba(${accentRgb}, 0.3)`,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h3
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {description}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
              background: `rgba(${accentRgb}, 0.12)`,
              border: `1px solid rgba(${accentRgb}, 0.3)`,
              color: accent,
            }}
          >
            Let's Talk <ArrowUpRight size={14} />
          </span>
        </a>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: EASE, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="group relative flex h-full flex-col rounded-2xl p-6 cursor-default"
        aria-label={name}
      >
        {/* Glass base */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isLight ? '#FFFFFF' : 'rgba(18, 18, 26, 0.6)',
            border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45, 45, 66, 0.7)'}`,
            boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)' : 'none',
          }}
        />

        {/* Hover: accent border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ border: `1px solid rgba(${accentRgb}, 0.4)`, transition: 'opacity 350ms' }}
        />

        {/* Hover: top glow sweep */}
        <div
          className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${accentRgb}, 0.7), transparent)`,
            transition: 'opacity 350ms',
          }}
        />

        {/* Hover: corner radial glow */}
        <div
          className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${accentRgb}, 0.18) 0%, transparent 70%)`,
            filter: 'blur(16px)',
            transition: 'opacity 400ms',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col gap-5">
          {/* Logo */}
          <ProductLogo logoPath={logoPath} accent={accent} accentRgb={accentRgb} />

          {/* Name */}
          <div className="flex flex-col gap-1">
            <h3
              className="text-2xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {name}
            </h3>
            <span className="text-xs font-medium" style={{ color: `rgba(${accentRgb}, 0.7)` }}>
              {tagline}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            {description}
          </p>

          {/* Tag pills */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <TagPill key={tag} label={tag} accent={accent} accentRgb={accentRgb} />
              ))}
            </div>
          )}

          {/* Spacer pushes CTA to bottom */}
          <div className="flex-1" />

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(90deg, rgba(${accentRgb}, 0.3) 0%, transparent 80%)` }}
          />

          {/* Visit Page CTA */}
          <a
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200"
            style={{ color: accent }}
            aria-label={`Visit ${name} page`}
          >
            Visit Page
            <motion.span
              className="inline-flex"
              animate={{ x: 0, y: 0 }}
              whileHover={{ x: 2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={15} strokeWidth={2.25} />
            </motion.span>
          </a>
        </div>
      </motion.article>
    </motion.div>
  )
}
