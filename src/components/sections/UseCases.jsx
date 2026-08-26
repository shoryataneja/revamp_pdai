import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import Button from '@ui/Button'
import { useCasesHeading, useCases } from '@data/useCases'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function UseCases() {
  return (
    <SectionWrapper id="use-cases" wrapperClassName="overflow-hidden">
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 500, top: '-10%', right: '-8%', opacity: 0.2 }}
      />
      <div
        className="glow-orb glow-orb-accent pointer-events-none"
        style={{ width: 400, height: 400, bottom: '5%', left: '-6%', opacity: 0.15 }}
      />

      <div className="relative z-10 flex flex-col gap-14">
        <SectionHeading
          title={useCasesHeading.title}
          subtitle={useCasesHeading.subtitle}
        />

        {/* Use-case grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {useCases.map(({ id, icon: Icon, title, description }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className="group flex flex-col gap-4 rounded-2xl p-6 transition-colors duration-200"
              style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-card-border)' }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  color: 'var(--color-purple-accent)',
                }}
              >
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
                {title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>
                {description}
              </p>
            </motion.div>
          ))}

          {/* CTA card — completes the grid */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start justify-center gap-4 rounded-2xl p-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(168,85,247,0.06) 100%)',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
          >
            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
              Ready to automate your workflow?
            </h3>
            <Button as="a" href="#contact" size="md" className="w-full sm:w-auto">
              Automate Your Workflow
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
