import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Differentiation() {
  return (
    <SectionWrapper
      id="differentiation"
      wrapperClassName="overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div
        className="glow-orb glow-orb-accent pointer-events-none"
        style={{ width: 480, height: 480, top: '10%', right: '-10%', opacity: 0.15 }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 text-center"
      >
        <motion.h2 variants={fadeUp} className="text-heading" style={{ fontSize: 'var(--text-h2)' }}>
          AI calling is a feature. The workflow is{' '}
          <span className="gradient-text">the product</span>.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-body max-w-2xl"
          style={{ fontSize: '1.0625rem' }}
        >
          A phone call is easy to compare. We connect that call to your business systems.
          Your CRM records what happened; we help make something happen.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  )
}
