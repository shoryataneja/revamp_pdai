import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import ContactForm from './contact/ContactForm'
import ContactInfo from './contact/ContactInfo'
import { contactHeading } from '@data/contact'
import { useTheme } from '@hooks/useTheme'

const EASE = [0.16, 1, 0.3, 1]

export default function Contact() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <SectionWrapper
      id="contact"
      wrapperClassName="overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      {/* Ambient orbs */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 560, height: 560, bottom: '-10%', left: '-10%', opacity: 0.18 }}
      />
      <div
        className="glow-orb glow-orb-accent pointer-events-none"
        style={{ width: 400, height: 400, top: '-5%', right: '-8%', opacity: 0.12 }}
      />

      <div className="relative z-10 flex flex-col gap-16">
        {/* Section heading */}
        <SectionHeading
          eyebrow={contactHeading.eyebrow}
          title={contactHeading.title}
          subtitle={contactHeading.subtitle}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:gap-12 xl:gap-16">

          {/* ── Left: Contact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative rounded-2xl p-6 sm:p-8"
            style={{
              background: isLight ? '#FFFFFF' : 'rgba(18,18,26,0.6)',
              border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.7)'}`,
              boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)' : '0 24px 64px rgba(0,0,0,0.15)',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute inset-x-0 top-0 h-px rounded-t-2xl"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(168,85,247,0.6), transparent)',
              }}
            />

            {/* Form heading */}
            <div className="mb-7 flex flex-col gap-1">
              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                Send us a message
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                Fill in the form and we'll be in touch within one business day.
              </p>
            </div>

            <ContactForm />
          </motion.div>

          {/* ── Right: Company info ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
