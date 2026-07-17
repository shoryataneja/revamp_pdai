import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import CaseStudyCard from './case-studies/CaseStudyCard'
import { caseStudies } from '@data/caseStudies'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function CaseStudies({ onOpenStudy }) {
  return (
    <SectionWrapper id="case-studies" wrapperClassName="overflow-hidden">
      {/* Background orb */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 600, height: 600, top: '30%', left: '60%', transform: 'translate(-50%,-50%)', opacity: 0.12 }}
      />

      <div className="relative z-10 flex flex-col gap-16">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-4 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-heading" style={{ fontSize: 'var(--text-h2)' }}>
            Work we're{' '}
            <span style={{ color: 'var(--color-purple-accent)' }}>proud of</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-body max-w-xl"
            style={{ fontSize: '1.0625rem' }}
          >
            Real products built for real problems. Here's a look at two of the solutions we've shipped.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} onOpen={onOpenStudy} index={i} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
