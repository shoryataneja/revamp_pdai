import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import { workflowHeading, workflowSteps } from '@data/workflow'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Workflow() {
  return (
    <SectionWrapper id="work" wrapperClassName="overflow-hidden">
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 560, height: 560, top: '10%', left: '-12%', opacity: 0.18 }}
      />

      <div className="relative z-10 flex flex-col gap-16">
        <SectionHeading
          title={workflowHeading.title}
          subtitle={workflowHeading.subtitle}
        />

        {/* Step flow */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {workflowSteps.map(({ step, title, description }, i) => (
            <motion.div key={step} variants={fadeUp} className="relative flex flex-col gap-3">
              {/* Connector (desktop) */}
              {i < workflowSteps.length - 1 && (
                <div
                  className="absolute top-5 left-[calc(50%+2.5rem)] hidden h-px lg:block"
                  style={{
                    width: 'calc(100% - 5rem)',
                    background:
                      'linear-gradient(90deg, rgba(124,58,237,0.5), rgba(124,58,237,0.1))',
                  }}
                />
              )}

              <div className="flex flex-col gap-3 rounded-2xl p-5" style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    background: 'rgba(124,58,237,0.12)',
                    border: '1px solid rgba(168,85,247,0.25)',
                    color: 'var(--color-purple-accent)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {step}
                </span>
                <h3 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                  {title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
