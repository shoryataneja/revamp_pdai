import { motion } from 'framer-motion'
import { FiInstagram, FiLinkedin } from 'react-icons/fi'
import { contactInfo } from '@data/contact'
import { siteConfig } from '@data/siteConfig'
import { useTheme } from '@hooks/useTheme'

const EASE = [0.16, 1, 0.3, 1]

const socialLinks = [
  { icon: FiLinkedin,  href: siteConfig.social.linkedin,  label: 'LinkedIn'  },
  { icon: FiInstagram, href: siteConfig.social.instagram, label: 'Instagram' },
]

function InfoCard({ item, index }) {
  const { icon: Icon, label, lines, href } = item
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const cardBg = isLight ? '#FFFFFF' : 'rgba(255,255,255,0.03)'
  const cardBorder = isLight ? '#E2E8F0' : 'rgba(45,45,66,0.6)'

  const content = (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      className="group flex items-start gap-4 rounded-xl p-4 transition-all duration-300"
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(124,58,237,0.06)'
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.25)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = cardBg
        e.currentTarget.style.borderColor = cardBorder
      }}
    >
      {/* Icon */}
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{
          background: 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(168,85,247,0.2)',
        }}
      >
        <Icon size={16} style={{ color: 'var(--color-purple-accent)' }} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-subtle)' }}>
          {label}
        </span>
        {lines.map((line, i) => (
          <span
            key={i}
            className="text-sm leading-snug"
            style={{ color: i === 0 ? 'var(--color-text)' : 'var(--color-muted)' }}
          >
            {line}
          </span>
        ))}
      </div>
    </motion.div>
  )

  return href ? (
    <a href={href} className="block" aria-label={label}>{content}</a>
  ) : (
    <div>{content}</div>
  )
}

/* ── Map placeholder ────────────────────────────────────────────── */
function MapPlaceholder() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
      className="relative overflow-hidden rounded-xl"
      style={{
        height: 160,
        background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.6)'}`,
        boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Dot-grid map texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(168,85,247,0.4) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Pin */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{
            background: 'var(--color-purple)',
            boxShadow: '0 0 20px rgba(124,58,237,0.6)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
          Bengaluru, Karnataka
        </span>
      </div>
    </motion.div>
  )
}

/* ── Main info panel ────────────────────────────────────────────── */
export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: EASE }}
        className="flex flex-col gap-2"
      >
        <span className="text-eyebrow">Company Information</span>
        <h3
          className="text-xl font-semibold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          Popular Digital AI
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Building intelligent, reliable, and scalable AI solutions for enterprises worldwide.
        </p>
      </motion.div>

      {/* Info cards */}
      <div className="flex flex-col gap-3">
        {contactInfo.map((item, i) => (
          <InfoCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Map placeholder */}
      <MapPlaceholder />

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        className="flex items-center gap-3 pt-1"
      >
        <span className="text-xs" style={{ color: 'var(--color-subtle)' }}>Follow us</span>
        <div
          className="h-px flex-1"
          style={{ background: 'var(--color-border-bright)' }}
        />
        <div className="flex items-center gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
              style={{
                background: 'rgba(128,128,128,0.06)',
                border: '1px solid var(--color-border-bright)',
                color: 'var(--color-subtle)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.1)'
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'
                e.currentTarget.style.color = 'var(--color-purple-accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(128,128,128,0.06)'
                e.currentTarget.style.borderColor = 'var(--color-border-bright)'
                e.currentTarget.style.color = 'var(--color-subtle)'
              }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
