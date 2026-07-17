import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import Divider from '@ui/Divider'
import ShowcaseRow from './showcase/ShowcaseRow'
import { showcases } from '@data/showcases'

export default function ProductShowcase() {
  return (
    <SectionWrapper id="work" wrapperClassName="overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 560, height: 560, top: '10%', left: '-12%', opacity: 0.18 }}
      />
      <div
        className="glow-orb pointer-events-none"
        style={{
          width: 480,
          height: 480,
          bottom: '5%',
          right: '-10%',
          opacity: 0.15,
          background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-20 lg:gap-28">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Product Showcase"
          title="Built for Real-World Scale"
          subtitle="Two flagship products, purpose-built for the industries that need AI the most."
        />

        {/* Showcase rows */}
        {showcases.map((showcase, i) => (
          <div key={showcase.id} className="flex flex-col gap-20 lg:gap-28">
            <ShowcaseRow showcase={showcase} reverse={i % 2 !== 0} />

            {/* Divider between rows, not after the last */}
            {i < showcases.length - 1 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              >
                <Divider />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
