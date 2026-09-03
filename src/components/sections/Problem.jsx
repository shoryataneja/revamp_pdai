import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import VideoPlaceholder from './hero/VideoPlaceholder'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Problem() {
  return (
    <SectionWrapper id="problem" wrapperClassName="overflow-hidden">
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 500, top: '0%', left: '50%', transform: 'translateX(-50%)', opacity: 0.14 }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col gap-5"
        >
          <motion.h2
            variants={fadeUp}
            className="text-heading"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            Your CRM knows a lead arrived. Why is your team still the one that has to act?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-body"
            style={{ fontSize: '1.0625rem' }}
          >
            Every new lead creates another manual chain: noticing, calling, chasing, and updating.
            Prizm360 automates the repeatable layer so your next action doesn&apos;t depend on manual memory.
          </motion.p>
        </motion.div>

        {/* Right: video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-center justify-center"
        >
          <VideoPlaceholder />
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
