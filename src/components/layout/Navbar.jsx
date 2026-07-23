import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { navLinks } from '@data/navigation'
import { siteConfig } from '@data/siteConfig'
import Button from '@ui/Button'
import { cn } from '@utils/cn'
import { useTheme } from '@hooks/useTheme'

const EASE = [0.16, 1, 0.3, 1]

const mobileMenuVariants = {
  closed: {
    clipPath: 'inset(0% 0% 100% 0%)',
    opacity: 0,
    transition: { duration: 0.4, ease: EASE },
  },
  open: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.45, ease: EASE },
  },
}

const mobileLinkVariants = {
  closed: { opacity: 0, x: -16 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE, delay: 0.05 + i * 0.06 },
  }),
}

const mobileCtaVariants = {
  closed: { opacity: 0, y: 12 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE, delay: 0.35 },
  },
}

function HamburgerIcon({ isOpen }) {
  return (
    <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="block h-px w-5 origin-center rounded-full"
        style={{ background: 'var(--color-text)' }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="block h-px w-5 origin-center rounded-full"
        style={{ background: 'var(--color-text)' }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="block h-px w-5 origin-center rounded-full"
        style={{ background: 'var(--color-text)' }}
      />
    </div>
  )
}

function NavLink({ href, label, onClick, isPage }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-0.5 text-sm py-1"
      style={{
        color: hovered ? 'var(--color-text)' : isPage ? 'var(--color-purple-accent)' : 'var(--color-muted)',
        transition: 'color 200ms',
      }}
    >
      {label}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="absolute -bottom-0.5 left-0 right-0 h-px origin-left rounded-full"
        style={{ background: 'var(--color-purple-accent)' }}
      />
    </a>
  )
}

function ThemeToggle({ theme, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-fast focus-ring"
      style={{
        background: 'rgba(128,128,128,0.08)',
        border: '1px solid var(--color-border-bright)',
        color: 'var(--color-muted)',
      }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle }       = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const navBg = theme === 'dark'
    ? 'rgba(11, 11, 15, 0.75)'
    : 'rgba(248, 250, 252, 0.85)'

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Background layer */}
        <motion.div
          animate={{
            backgroundColor: scrolled ? navBg : 'rgba(0,0,0,0)',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px) saturate(100%)',
            borderBottomColor: scrolled ? 'var(--color-border-bright)' : 'rgba(45,45,66,0)',
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0 border-b"
          style={{ WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)' }}
        />

        <nav className="container-site relative flex items-center justify-between py-4 md:py-5">
          {/* Logo */}
          <a href="#hero" className="relative z-10 flex items-center gap-2" onClick={closeMenu}>
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, var(--color-purple) 0%, var(--color-purple-accent) 100%)',
                boxShadow: '0 0 12px rgba(124, 58, 237, 0.5)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              PD
            </span>
            <span
              className="text-base font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              Popular Digital AI
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map(({ label, href, isPage }) => (
              <li key={href}>
                <NavLink href={href} label={label} isPage={isPage} />
              </li>
            ))}
          </ul>

          {/* Desktop — theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle theme={theme} toggle={toggle} />
            <Button as="a" href="#contact" size="sm">
              Contact Us
            </Button>
          </div>

          {/* Mobile — theme toggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} toggle={toggle} />
            <button
              className="relative z-10 focus-ring rounded-md p-1.5"
              onClick={() => setIsOpen(v => !v)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <HamburgerIcon isOpen={isOpen} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ background: 'var(--color-bg-primary)' }}
          >
            <div
              className="glow-orb glow-orb-purple pointer-events-none"
              style={{ width: 400, height: 400, top: -100, right: -100, opacity: 0.5 }}
            />

            <div className="flex flex-1 flex-col justify-center container-site">
              <ul className="flex flex-col gap-1">
                {navLinks.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <a
                      href={href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between py-4 border-b"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <span
                        className="text-3xl font-semibold tracking-tight transition-smooth"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                      >
                        {label}
                      </span>
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="text-sm"
                        style={{ color: 'var(--color-purple-accent)' }}
                      >
                        ↗
                      </motion.span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={mobileCtaVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="mt-10"
              >
                <Button as="a" href="#contact" size="lg" className="w-full justify-center" onClick={closeMenu}>
                  Contact Us
                </Button>
              </motion.div>
            </div>

            <motion.div
              variants={mobileCtaVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="container-site pb-8"
            >
              <p className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                © {new Date().getFullYear()} Popular Digital AI
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
