import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@hooks/useTheme'
import { Sun, Moon } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const LAYOUTS = [1, 2, 3, 4, 5]

/* ── Theme toggle (reused pattern from Navbar) ──────────────────── */
function ThemeToggle({ theme, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-fast"
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

/* ── Placeholder section ────────────────────────────────────────── */
function LayoutSection({ num, sectionRef }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <section
      ref={sectionRef}
      id={`layout-${num}`}
      className="flex min-h-screen items-center justify-center px-6 py-24"
      style={{ background: num % 2 === 0 ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)' }}
    >
      {/* Ambient orb */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.12 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-xl w-full"
      >
        {/* Badge */}
        <span
          className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(168,85,247,0.25)',
            color: 'var(--color-purple-accent)',
          }}
        >
          Layout {num}
        </span>

        {/* Dashed placeholder box */}
        <div
          className="w-full rounded-2xl flex flex-col items-center justify-center gap-4 py-20 px-8"
          style={{
            border: '2px dashed rgba(168,85,247,0.2)',
            background: isLight ? 'rgba(124,58,237,0.02)' : 'rgba(124,58,237,0.04)',
          }}
        >
          {/* Grid icon */}
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: 'rgba(124,58,237,0.1)',
              border: '1px solid rgba(168,85,247,0.2)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple-accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              Layout {num}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-subtle)' }}>
              Placeholder for Hero Design
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function LayoutsPage() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'
  const [activeTab, setActiveTab] = useState(1)
  const [scrolled, setScrolled] = useState(false)
  const sectionRefs = useRef(LAYOUTS.map(() => null))

  // Track scroll to update active tab
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32)

      // Find which section is most in view
      let closest = 1
      let minDist = Infinity
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const dist = Math.abs(rect.top - 120)
        if (dist < minDist) { minDist = dist; closest = i + 1 }
      })
      setActiveTab(closest)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToLayout(num) {
    setActiveTab(num)
    const ref = sectionRefs.current[num - 1]
    if (ref) {
      const top = ref.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const navBg = isLight ? 'rgba(248,250,252,0.9)' : 'rgba(11,11,15,0.85)'

  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--color-bg-primary)' }}>

      {/* ── Top bar ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? navBg : 'rgba(0,0,0,0)',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)',
            borderBottomColor: scrolled ? 'var(--color-border-bright)' : 'rgba(45,45,66,0)',
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute inset-0 border-b"
        />

        <div className="container-site relative flex items-center justify-between py-4 md:py-5">
          {/* Back to home */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: 'var(--color-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Site
          </a>

          {/* Tab nav */}
          <nav className="hidden md:flex">
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {LAYOUTS.map(num => (
                <button
                  key={num}
                  onClick={() => scrollToLayout(num)}
                  className="relative px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                  style={{
                    color: activeTab === num ? 'var(--color-text)' : 'var(--color-subtle)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {activeTab === num && (
                    <motion.div
                      layoutId="layouts-tab-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(124,58,237,0.25)',
                        border: '1px solid rgba(124,58,237,0.35)',
                      }}
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                  <span className="relative z-10">Layout {num}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile tab select + theme toggle */}
          <div className="flex items-center gap-3">
            {/* Mobile: compact tab selector */}
            <div className="flex md:hidden gap-1">
              {LAYOUTS.map(num => (
                <button
                  key={num}
                  onClick={() => scrollToLayout(num)}
                  className="relative flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200"
                  style={{
                    background: activeTab === num ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${activeTab === num ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.08)'}`,
                    color: activeTab === num ? 'var(--color-text)' : 'var(--color-subtle)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
            <ThemeToggle theme={theme} toggle={toggle} />
          </div>
        </div>
      </motion.header>

      {/* ── Sections ── */}
      <main className="flex-1 pt-[72px]">
        {LAYOUTS.map((num, i) => (
          <LayoutSection
            key={num}
            num={num}
            sectionRef={el => { sectionRefs.current[i] = el }}
          />
        ))}
      </main>

      {/* ── Minimal footer ── */}
      <div
        className="container-site py-6 text-center text-xs"
        style={{
          color: 'var(--color-subtle)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        Internal review only — not part of the production website.
      </div>
    </div>
  )
}
