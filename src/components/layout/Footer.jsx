import { motion } from 'framer-motion'
import { FiInstagram, FiLinkedin } from 'react-icons/fi'
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@data/siteConfig'
import { products } from '@data/products'
import Divider from '@ui/Divider'
import { useTheme } from '@hooks/useTheme'

const EASE = [0.16, 1, 0.3, 1]

const quickLinks = [
  { label: 'Home',     href: '#hero'     },
  { label: 'Products', href: '#products' },
  { label: 'Careers',  href: '#careers'  },
  { label: 'Contact',  href: '#contact'  },
]

const socialLinks = [
  { icon: FiLinkedin,  href: siteConfig.social.linkedin,  label: 'LinkedIn'  },
  { icon: FiInstagram, href: siteConfig.social.instagram, label: 'Instagram' },
]

const contactDetails = [
  {
    icon: MapPin,
    lines: [siteConfig.address.line1, siteConfig.address.line2, siteConfig.address.line3],
    href: null,
  },
  {
    icon: Mail,
    lines: [siteConfig.email],
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    lines: [siteConfig.phone],
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    muted: false,
  },
]

/* ── Column heading ─────────────────────────────────────────────── */
function ColHeading({ children }) {
  return (
    <h4
      className="mb-5 text-xs font-semibold uppercase tracking-widest"
      style={{ color: 'var(--color-purple-accent)' }}
    >
      {children}
    </h4>
  )
}

/* ── Animated link ──────────────────────────────────────────────── */
function FooterLink({ href, children, external = false }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group inline-flex items-center gap-1 text-sm transition-all duration-200"
      style={{ color: 'var(--color-subtle)' }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-subtle)')}
    >
      {children}
      {external && (
        <ArrowUpRight
          size={11}
          className="opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100"
        />
      )}
    </a>
  )
}

/* ── Social icon button ─────────────────────────────────────────── */
function SocialBtn({ icon: Icon, href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-250"
      style={{
        background: 'rgba(128,128,128,0.06)',
        border: '1px solid var(--color-card-border)',
        color: 'var(--color-subtle)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(124,58,237,0.12)'
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.35)'
        e.currentTarget.style.color = 'var(--color-purple-accent)'
        e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(128,128,128,0.06)'
        e.currentTarget.style.borderColor = 'var(--color-card-border)'
        e.currentTarget.style.color = 'var(--color-subtle)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Icon size={15} />
    </a>
  )
}

/* ── Main footer ────────────────────────────────────────────────── */
export default function Footer() {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Subtle ambient orb */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 300, bottom: 0, left: '30%', opacity: 0.08, filter: 'blur(60px)' }}
      />

      <Divider />

      {/* Glass panel */}
      <div
        className="relative"
        style={{
          background: isLight ? '#F8FAFC' : 'rgba(14,14,20,0.85)',
          backdropFilter: isLight ? 'none' : 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: isLight ? 'none' : 'blur(24px) saturate(160%)',
        }}
      >
        {/* ── Main grid ── */}
        <div className="container-site pt-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr]"
          >

            {/* ── Col 1: Brand ── */}
            <div className="flex flex-col gap-5">
              {/* Logo mark + name */}
              <a href="#hero" className="inline-flex items-center gap-2.5 self-start">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-purple) 0%, var(--color-purple-accent) 100%)',
                    boxShadow: '0 0 16px rgba(124,58,237,0.45)',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  PD
                </span>
                <span
                  className="text-sm font-semibold leading-tight"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  Popular Digital AI
                </span>
              </a>

              {/* Tagline */}
              <p className="text-sm leading-relaxed max-w-[260px]" style={{ color: 'var(--color-subtle)' }}>
                {siteConfig.description}
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2 pt-1">
                {socialLinks.map(s => (
                  <SocialBtn key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div>
              <ColHeading>Quick Links</ColHeading>
              <ul className="flex flex-col gap-3">
                {quickLinks.map(({ label, href }) => (
                  <li key={href}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 3: Products ── */}
            <div>
              <ColHeading>Products</ColHeading>
              <ul className="flex flex-col gap-3">
                {products.map(({ id, name, href }) => (
                  <li key={id}>
                    <FooterLink href={href}>{name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Col 4: Contact ── */}
            <div>
              <ColHeading>Contact</ColHeading>
              <ul className="flex flex-col gap-4">
                {contactDetails.map(({ icon: Icon, lines, href, muted }) => {
                  const inner = (
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                        style={{
                          background: 'rgba(124,58,237,0.1)',
                          border: '1px solid rgba(168,85,247,0.18)',
                        }}
                      >
                        <Icon size={12} style={{ color: 'var(--color-purple-accent)' }} strokeWidth={2} />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        {lines.map((line, i) => (
                          <span
                            key={i}
                            className="text-sm leading-snug"
                            style={{
                              color: muted
                                ? 'var(--color-subtle)'
                                : i === 0
                                  ? 'var(--color-muted)'
                                  : 'var(--color-subtle)',
                              fontStyle: muted ? 'italic' : 'normal',
                            }}
                          >
                            {line}
                          </span>
                        ))}
                        {muted && (
                          <span className="text-xs" style={{ color: 'rgba(71,85,105,0.7)' }}>
                            (to be updated)
                          </span>
                        )}
                      </div>
                    </div>
                  )

                  return (
                    <li key={lines[0]}>
                      {href ? (
                        <a
                          href={href}
                          className="block transition-opacity duration-200 hover:opacity-80"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="container-site pb-8">
          <Divider className="mb-6" />
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
              © {new Date().getFullYear()} Popular Digital AI Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms of Service'].map(label => (
                <a
                  key={label}
                  href="#"
                  className="text-xs transition-fast"
                  style={{ color: 'var(--color-subtle)' }}
                  onMouseEnter={e => (e.target.style.color = 'var(--color-muted)')}
                  onMouseLeave={e => (e.target.style.color = 'var(--color-subtle)')}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
