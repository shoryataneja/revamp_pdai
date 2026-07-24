import { motion } from 'framer-motion'
import Divider from '@ui/Divider'
import { clientsByIndustry } from '@data/clients'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'
import { useTheme } from '@hooks/useTheme'

const INDUSTRY_ICONS = {
  EdTech: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Automotives: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h10l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <circle cx="7.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" />
    </svg>
  ),
  'Fleet Management': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
}

export default function TrustedBy() {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <section
      id="trusted-by"
      className="relative w-full overflow-hidden py-20"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      {/* Subtle centre glow */}
      <div
        className="glow-orb pointer-events-none"
        style={{
          width: 600, height: 300,
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-12">
        <Divider />

        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-3 text-center px-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-heading"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            We serve these{' '}
            <span style={{ color: 'var(--color-purple-accent)' }}>companies</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm"
            style={{ color: 'var(--color-subtle)', maxWidth: 480 }}
          >
            Trusted by businesses across industries to build and deploy intelligent AI solutions.
          </motion.p>
        </motion.div>

        {/* Industry cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="container-site grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          {clientsByIndustry.map(({ id, industry, companies }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className="flex flex-col gap-5 rounded-2xl p-6"
              style={{
                background: isLight ? '#ffffff' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.55)'}`,
                boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {/* Industry label */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(168,85,247,0.2)',
                    color: 'var(--color-purple-accent)',
                  }}
                >
                  {INDUSTRY_ICONS[industry]}
                </div>
                <span
                  className="font-semibold text-sm tracking-wide uppercase"
                  style={{ color: 'var(--color-purple-accent)', fontFamily: 'var(--font-heading)', letterSpacing: '0.06em' }}
                >
                  {industry}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)' }} />

              {/* Company names */}
              <div className="flex flex-col gap-2.5">
                {companies.map(name => (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 text-sm font-medium"
                    style={{ color: 'var(--color-text)' }}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: 'var(--color-purple-accent)' }}
                    />
                    {name}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Divider />
      </div>
    </section>
  )
}
