import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import { roadmapHeading, implementationSteps, roadmapPhases } from '@data/roadmap'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

function StatusBadge({ live, status }) {
  const liveStyles = {
    background: 'rgba(52, 211, 153, 0.12)',
    border: '1px solid rgba(52, 211, 153, 0.3)',
    color: '#34D399',
  }
  const upcomingStyles = {
    background: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    color: 'var(--color-purple-accent)',
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={live ? liveStyles : upcomingStyles}
    >
      {live && <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#34D399' }} />}
      {status}
    </span>
  )
}

export default function Roadmap() {
  return (
    <SectionWrapper id="roadmap" wrapperClassName="overflow-hidden">
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 500, top: '-5%', right: '-8%', opacity: 0.15 }}
      />

      <div className="relative z-10 flex flex-col gap-16">
        <SectionHeading
          title={roadmapHeading.title}
          subtitle={roadmapHeading.subtitle}
        />

        {/* Implementation steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {implementationSteps.map(({ step, title, description }) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="flex flex-col gap-2 rounded-2xl p-5"
              style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: 'var(--color-purple-accent)', fontFamily: 'var(--font-heading)' }}
              >
                {step}
              </span>
              <h3 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                {title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap phases */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto flex w-full max-w-3xl flex-col gap-4"
        >
          {roadmapPhases.map(({ id, phase, capability, status, live }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className="flex flex-col gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{
                background: live ? 'rgba(52,211,153,0.04)' : 'var(--color-card-bg)',
                border: live ? '1px solid rgba(52,211,153,0.22)' : '1px solid var(--color-card-border)',
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-subtle)' }}>
                  {phase}
                </span>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                  {capability}
                </h3>
              </div>
              <StatusBadge live={live} status={status} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
