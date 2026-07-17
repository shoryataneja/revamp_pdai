import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionWrapper from '@ui/SectionWrapper'
import { careersHero } from '@data/careers'
import CoreValues from './careers/CoreValues'
import Perks from './careers/Perks'
import OpenRoles from './careers/OpenRoles'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

export default function Careers({ onOpenJob }) {
  return (
    <SectionWrapper id="careers" wrapperClassName="overflow-hidden">
      {/* Background orb */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 500, top: '10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.18 }}
      />

      <div className="relative z-10 flex flex-col gap-24">
        {/* ── Hero ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-col items-center gap-8 text-center"
        >
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              maxWidth: '14ch',
            }}
          >
            {careersHero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-body max-w-xl"
            style={{ fontSize: '1.0625rem' }}
          >
            {careersHero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp}>
            <button
              onClick={() => {
                const el = document.getElementById('open-roles')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200"
              style={{
                border: '1px solid rgba(168,85,247,0.45)',
                color: 'var(--color-purple-accent)',
                background: 'rgba(124,58,237,0.06)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.14)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.8)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.06)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.45)'
              }}
            >
              View Open Roles <ArrowRight size={15} />
            </button>
          </motion.div>
        </motion.div>

        {/* ── Core Values ── */}
        <CoreValues />

        {/* ── Perks ── */}
        <Perks />

        {/* ── Open Roles ── */}
        <OpenRoles onOpen={onOpenJob} />
      </div>
    </SectionWrapper>
  )
}
