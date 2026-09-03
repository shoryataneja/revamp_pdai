import { motion } from 'framer-motion'
import { Timer } from 'lucide-react'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import { demoHeading, benchmark } from '@data/demo'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'
import { useTheme } from '@hooks/useTheme'

export default function Demo() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <SectionWrapper id="demo" wrapperClassName="overflow-hidden">
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 560, height: 560, top: '30%', left: '60%', transform: 'translate(-50%,-50%)', opacity: 0.14 }}
      />

      <div className="relative z-10 flex flex-col gap-16">
        <SectionHeading
          title={demoHeading.title}
          subtitle={demoHeading.subtitle}
        />

        {/* Stopwatch benchmark panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto w-full max-w-2xl"
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: isLight ? '#ffffff' : 'rgba(14,14,20,0.85)',
              backdropFilter: 'blur(24px)',
              border: `1px solid ${isLight ? 'rgba(124,58,237,0.15)' : 'rgba(45,45,66,0.8)'}`,
              boxShadow: isLight
                ? '0 4px 24px rgba(124,58,237,0.08), 0 1px 3px rgba(0,0,0,0.06)'
                : '0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.12)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b"
              style={{ borderColor: isLight ? 'rgba(124,58,237,0.12)' : 'rgba(45,45,66,0.6)' }}
            >
              <div className="flex items-center gap-2.5">
                <Timer size={16} style={{ color: 'var(--color-purple-accent)' }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                >
                  Stopwatch Test
                </span>
              </div>
              <span className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                Lead → Action
              </span>
            </div>

            {/* Benchmark rows */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col"
            >
              {benchmark.map(({ event, latency, state }, i) => (
                <motion.div
                  key={event}
                  variants={fadeUp}
                  className="flex items-center gap-4 px-4 py-3 sm:px-6 sm:py-4"
                  style={{
                    background: i % 2 === 0
                      ? isLight ? 'rgba(124,58,237,0.03)' : 'rgba(255,255,255,0.02)'
                      : 'transparent',
                    borderTop: i !== 0 ? `1px solid ${isLight ? 'rgba(124,58,237,0.08)' : 'rgba(45,45,66,0.4)'}` : 'none',
                  }}
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {event}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      {state}
                    </span>
                  </div>
                  <span
                    className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold tabular-nums"
                    style={{
                      background: 'rgba(124,58,237,0.12)',
                      border: '1px solid rgba(168,85,247,0.25)',
                      color: 'var(--color-purple-accent)',
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {latency}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
