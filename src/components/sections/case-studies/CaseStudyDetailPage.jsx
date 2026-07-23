import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin } from 'lucide-react'
import { useTheme } from '@hooks/useTheme'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

const EASE = [0.16, 1, 0.3, 1]

function FeatureCard({ icon: Icon, title, desc, accent, accentRgb, isLight }) {
  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-6"
      style={{
        background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)'}`,
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `rgba(${accentRgb}, 0.1)`, border: `1px solid rgba(${accentRgb}, 0.2)` }}
      >
        <Icon size={18} style={{ color: accent }} strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-semibold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '0.9375rem' }}>
          {title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function CaseStudyDetailPage({ study, onClose }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const { icon: Icon, product, category, tagline, accent, accentRgb, overview, solution, whoItsFor, problem, features, impact, industry, client } = study

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex min-h-screen flex-col"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Sticky back bar */}
      <div
        className="sticky top-0 z-50 flex items-center px-6 py-4"
        style={{
          background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(11,11,15,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)'}`,
        }}
      >
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: accent, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Back to Case Studies
        </button>
      </div>

      {/* Hero banner */}
      <div
        className="relative overflow-hidden px-6 py-24"
        style={{
          background: isLight
            ? `linear-gradient(135deg, rgba(${accentRgb},0.08) 0%, rgba(${accentRgb},0.04) 100%)`
            : `linear-gradient(135deg, rgba(${accentRgb},0.2) 0%, rgba(${accentRgb},0.06) 100%)`,
        }}
      >
        {/* Orbs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: `rgba(${accentRgb},0.15)`, filter: 'blur(80px)' }} />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full"
          style={{ background: `rgba(${accentRgb},0.1)`, filter: 'blur(60px)' }} />

        <div className="container-site relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-3xl"
          >
            {/* Category pill */}
            <motion.span
              variants={fadeUp}
              className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{ background: `rgba(${accentRgb},0.12)`, border: `1px solid rgba(${accentRgb},0.25)`, color: accent }}
            >
              <Icon size={13} strokeWidth={2} /> {category}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--color-text)',
              }}
            >
              {product}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg font-medium"
              style={{ color: accent }}
            >
              {tagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="leading-relaxed max-w-2xl"
              style={{ color: 'var(--color-muted)', fontSize: '1.0625rem' }}
            >
              {overview}
            </motion.p>

            {/* Meta pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              {[{ label: industry }, { label: client }].map(({ label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm"
                  style={{
                    background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)'}`,
                    color: 'var(--color-muted)',
                  }}
                >
                  <MapPin size={12} /> {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Impact metrics bar */}
      <div
        className="border-y"
        style={{ borderColor: isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)' }}
      >
        <div className="container-site">
          <div className="grid grid-cols-3 divide-x" style={{ divideColor: isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)' }}>
            {impact.map(({ metric, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 py-8 text-center">
                <span
                  className="text-3xl font-bold"
                  style={{ fontFamily: 'var(--font-heading)', color: accent }}
                >
                  {metric}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-site py-20">
        <div className="flex flex-col gap-20">

          {/* Problem + Solution */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Problem */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-6 rounded-2xl p-8"
              style={{
                background: isLight ? '#FFF7F7' : 'rgba(239,68,68,0.04)',
                border: `1px solid ${isLight ? '#FEE2E2' : 'rgba(239,68,68,0.15)'}`,
              }}
            >
              <motion.h2
                variants={fadeUp}
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                The Challenge
              </motion.h2>
              <motion.ul variants={staggerContainer} className="flex flex-col gap-3">
                {problem.points.map((pt, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: '#EF4444' }}
                    />
                    {pt}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Solution */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col gap-6 rounded-2xl p-8"
              style={{
                background: isLight ? `rgba(${accentRgb},0.04)` : `rgba(${accentRgb},0.08)`,
                border: `1px solid rgba(${accentRgb},0.2)`,
              }}
            >
              <motion.h2
                variants={fadeUp}
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                Our Solution
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {solution.split('\n\n').map((para, i) => (
                  <span key={i}>{para}{i < solution.split('\n\n').length - 1 && <><br /><br /></>}</span>
                ))}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-2 rounded-xl p-4"
                style={{
                  background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(${accentRgb},0.15)`,
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: accent }}>Outcome</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{whoItsFor}</p>
              </motion.div>
            </motion.div>
          </div>



        </div>
      </div>
    </motion.div>
  )
}
