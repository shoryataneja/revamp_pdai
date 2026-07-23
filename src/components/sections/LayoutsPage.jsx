import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@hooks/useTheme'
import { Sun, Moon } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import teamPhoto1 from '@assets/images/team-photo-1.jpg'
import teamPhoto2 from '@assets/images/team-photo-2.jpg'
import culturePhoto1 from '@assets/images/culture-photo-1.jpg'
import culturePhoto3 from '@assets/images/culture-photo-3.jpg'
import culturePhoto5 from '@assets/images/culture-photo-5.jpg'

import heroVisual from '@assets/images/hero-visual.png'
import heroAudio from '@assets/images/hero-audio.mpeg'

const EASE = [0.16, 1, 0.3, 1]
const LAYOUTS = [1, 2, 3, 4]

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

/* ── Layout 1 ───────────────────────────────────────────────────── */
function Layout1({ sectionRef }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  function togglePlay() {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause() } else { a.play() }
    setPlaying(!playing)
  }

  function handleStop() {
    const a = audioRef.current
    if (!a) return
    a.pause()
    a.currentTime = 0
    setPlaying(false)
    setProgress(0)
    setCurrentTime(0)
  }

  function handleTimeUpdate() {
    const a = audioRef.current
    if (!a) return
    setCurrentTime(a.currentTime)
    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0)
  }

  function handleSeek(e) {
    const a = audioRef.current
    if (!a || !a.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    a.currentTime = pct * a.duration
  }

  function fmt(s) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <section
      ref={sectionRef}
      id="layout-1"
      className="relative flex min-h-screen items-center overflow-hidden px-6"
      style={{ background: '#0D0D12' }}
    >
      {/* Orbital rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[520, 760, 1020].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              border: '1px solid rgba(168,85,247,0.18)',
              transform: `rotate(${i * 22}deg)`,
            }}
          />
        ))}
      </div>

      {/* Floating orbs — pushed to edges away from content */}
      <div className="pointer-events-none absolute rounded-full" style={{ width: 120, height: 120, left: '2%', top: '12%', background: 'radial-gradient(circle at 40% 40%, #c084fc, #7c3aed)', filter: 'blur(18px)', opacity: 0.5 }} />
      <div className="pointer-events-none absolute rounded-full" style={{ width: 72, height: 72, right: '4%', bottom: '15%', background: 'radial-gradient(circle at 40% 40%, #e9d5ff, #a855f7)', filter: 'blur(12px)', opacity: 0.45 }} />

      {/* Glow */}
      <div className="pointer-events-none absolute" style={{ width: 700, height: 400, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />

      <audio
        ref={audioRef}
        src={heroAudio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0) }}
      />

      {/* Two-column layout */}
      <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">

        {/* Left: content */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-8 relative"
        >
          {/* Dark backdrop so text is always readable */}
          <div className="pointer-events-none absolute -inset-6 rounded-2xl" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(13,13,18,0.7) 0%, transparent 80%)' }} />
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.75rem, 5.5vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            AI Products That Power{' '}
            <span style={{ color: '#a855f7' }}>Modern Businesses</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'rgba(255,255,255,0.55)', maxWidth: '520px', lineHeight: 1.75 }}>
            From AI Agents and AI CRM to enterprise-grade custom AI solutions, we build intelligent products that automate operations, improve customer engagement, and accelerate business growth.
          </p>

          <div className="flex items-stretch gap-0" style={{ border: '1px solid rgba(168,85,247,0.35)', borderRadius: '0.5rem', overflow: 'hidden', width: 'fit-content' }}>
            <a
              href="#products"
              className="flex items-center justify-center px-10 py-4 text-sm font-semibold transition-opacity duration-200 hover:opacity-90"
              style={{ background: '#a855f7', color: '#0D0D12', fontFamily: 'var(--font-heading)', letterSpacing: '0.01em' }}
            >
              Explore AI Products
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center px-8 py-4 text-sm font-semibold transition-colors duration-200 hover:bg-white/5"
              style={{ background: '#0D0D12', color: '#ffffff', fontFamily: 'var(--font-heading)', borderLeft: '1px solid rgba(168,85,247,0.35)' }}
            >
              Build with Us
            </a>
          </div>
        </motion.div>

        {/* Right: audio player */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="flex items-center justify-center"
        >
          <div
            className="w-full"
            style={{
              maxWidth: 420,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(168,85,247,0.25)',
              borderRadius: '1.5rem',
              padding: '2rem',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 40px rgba(124,58,237,0.15)',
            }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'var(--font-heading)' }}>Product Overview</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Audio Message</p>
              </div>
              {/* Live indicator */}
              {playing && (
                <div className="ml-auto flex items-center gap-1.5">
                  {[1,2,3].map(b => (
                    <div
                      key={b}
                      style={{
                        width: 3, borderRadius: 99,
                        background: '#a855f7',
                        animation: `l1-bar${b} 0.8s ease-in-out infinite`,
                        animationDelay: `${b * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Waveform bars (decorative) */}
            <div className="flex items-center gap-0.5 mb-5" style={{ height: 48 }}>
              {Array.from({ length: 48 }, (_, i) => {
                const h = 20 + Math.sin(i * 0.7) * 12 + Math.sin(i * 1.3) * 8
                const filled = progress > 0 && (i / 48) * 100 < progress
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}px`,
                      borderRadius: 99,
                      background: filled ? '#a855f7' : 'rgba(168,85,247,0.2)',
                      transition: 'background 0.1s',
                    }}
                  />
                )
              })}
            </div>

            {/* Seek bar */}
            <div
              className="relative mb-3 cursor-pointer"
              style={{ height: 4, borderRadius: 99, background: 'rgba(168,85,247,0.15)' }}
              onClick={handleSeek}
            >
              <div
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                  borderRadius: 99,
                  transition: 'width 0.1s linear',
                }}
              />
              <div
                style={{
                  position: 'absolute', top: '50%',
                  left: `${progress}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 12, height: 12,
                  borderRadius: '50%',
                  background: '#a855f7',
                  boxShadow: '0 0 8px rgba(168,85,247,0.6)',
                }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between mb-6">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontVariantNumeric: 'tabular-nums' }}>{fmt(currentTime)}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontVariantNumeric: 'tabular-nums' }}>{duration ? fmt(duration) : '--:--'}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              {/* Stop */}
              <button
                onClick={handleStop}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="rgba(255,255,255,0.7)">
                  <rect x="1" y="1" width="10" height="10" rx="1.5" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  boxShadow: playing ? '0 0 24px rgba(168,85,247,0.5)' : '0 0 12px rgba(168,85,247,0.25)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {playing
                  ? <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><rect x="3" y="2" width="4" height="12" rx="1" /><rect x="9" y="2" width="4" height="12" rx="1" /></svg>
                  : <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M4 2.5l10 5.5-10 5.5V2.5z" /></svg>
                }
              </button>

              {/* Replay */}
              <button
                onClick={() => { if (audioRef.current) { audioRef.current.currentTime = 0; setProgress(0); setCurrentTime(0) } }}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Layout 2 ───────────────────────────────────────────────────── */
function Layout2({ sectionRef }) {
  return (
    <section
      ref={sectionRef}
      id="layout-2"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: '#F5F5F0' }}
    >
      {/* Subtle noise texture overlay */}
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)' }} />

      <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-8"
        >
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#0F172A',
            }}
          >
            Building the Future with{' '}
            <span style={{ color: '#7C3AED' }}>Enterprise AI</span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.75, maxWidth: '480px' }}>
            We create AI-powered products and custom software that help enterprises automate workflows, engage customers intelligently, and scale with confidence.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: '#7C3AED', color: '#ffffff', fontFamily: 'var(--font-heading)' }}
            >
              Explore Products
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: 'transparent',
                color: '#0F172A',
                fontFamily: 'var(--font-heading)',
                border: '1.5px solid #CBD5E1',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#7C3AED')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#CBD5E1')}
            >
              Our Services
            </a>
          </div>
        </motion.div>

        {/* Right: sandglass image composition */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="relative flex items-center justify-center"
          style={{ minHeight: '560px' }}
        >
          {/* Outer decorative ring — top circle */}
          <div
            className="absolute rounded-full"
            style={{
              width: 300, height: 300,
              top: '0%', left: '50%',
              transform: 'translateX(-50%)',
              border: '10px solid #7C3AED',
              zIndex: 2,
            }}
          />
          {/* Top photo */}
          <div
            className="absolute overflow-hidden rounded-full"
            style={{
              width: 280, height: 280,
              top: 'calc(0% + 10px)', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 3,
            }}
          >
            <img src={teamPhoto2} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
          </div>

          {/* Connector bar */}
          <div
            className="absolute"
            style={{
              width: 10, height: 60,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#7C3AED',
              zIndex: 4,
            }}
          />

          {/* Outer decorative ring — bottom circle */}
          <div
            className="absolute rounded-full"
            style={{
              width: 260, height: 260,
              bottom: '0%', left: '50%',
              transform: 'translateX(-50%)',
              border: '10px solid #7C3AED',
              zIndex: 2,
            }}
          />
          {/* Bottom photo */}
          <div
            className="absolute overflow-hidden rounded-full"
            style={{
              width: 240, height: 240,
              bottom: 'calc(0% + 10px)', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 3,
            }}
          >
            <img src={teamPhoto1} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
          </div>

          {/* Floating accent dot */}
          <div
            className="absolute rounded-full"
            style={{
              width: 20, height: 20,
              top: '48%', left: 'calc(50% + 140px)',
              background: '#a855f7',
              zIndex: 5,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 12, height: 12,
              top: '52%', left: 'calc(50% - 155px)',
              background: '#7C3AED',
              zIndex: 5,
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Layout 4 ───────────────────────────────────────────────────── */
const l4Styles = `
  @keyframes l4-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-14px) rotate(0.8deg); }
    66% { transform: translateY(-6px) rotate(-0.5deg); }
  }
  @keyframes l4-glow-pulse {
    0%, 100% { opacity: 0.55; }
    50% { opacity: 0.85; }
  }
  @keyframes l4-fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes l4-grid-drift {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(40px, 40px); }
  }
  .l4-float    { animation: l4-float 7s ease-in-out infinite; }
  .l4-glow-pulse { animation: l4-glow-pulse 4s ease-in-out infinite; }
  .l4-fade-up-1 { animation: l4-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
  .l4-fade-up-2 { animation: l4-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
  .l4-fade-up-3 { animation: l4-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
  .l4-fade-up-4 { animation: l4-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
`

function Layout4({ sectionRef }) {
  return (
    <section
      ref={sectionRef}
      id="layout-4"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
      style={{ background: '#06060A' }}
    >
      <style>{l4Styles}</style>

      {/* ── Grid background ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
          animation: 'l4-grid-drift 20s linear infinite',
        }}
      />
      {/* Grid fade-out vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #06060A 80%)',
        }}
      />

      {/* ── Background radial glows ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-center purple */}
        <div style={{
          position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)',
        }} />
        {/* Bottom-center large glow */}
        <div className="l4-glow-pulse" style={{
          position: 'absolute', bottom: '-5%', left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 500,
          background: 'radial-gradient(ellipse, rgba(109,40,217,0.22) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)',
        }} />
        {/* Left blue hint */}
        <div style={{
          position: 'absolute', top: '40%', left: '-5%',
          width: 400, height: 400,
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }} />
        {/* Right cyan hint */}
        <div style={{
          position: 'absolute', top: '35%', right: '-5%',
          width: 350, height: 350,
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)',
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center gap-7 text-center" style={{ maxWidth: 900 }}>

        {/* Badge */}
        <div
          className="l4-fade-up-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(168,85,247,0.25)',
            color: '#c084fc',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a855f7', display: 'inline-block' }} />
          Enterprise AI Platform
        </div>

        {/* Headline */}
        <h1
          className="l4-fade-up-2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.6rem, 6vw, 5.25rem)',
            fontWeight: 800,
            lineHeight: 1.06,
            letterSpacing: '-0.035em',
            color: '#ffffff',
            maxWidth: 860,
          }}
        >
          AI Products That Power{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 50%, #6366f1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Modern Businesses
          </span>
        </h1>

        {/* Sub heading */}
        <p
          className="l4-fade-up-3"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.175rem)',
            color: '#B5B5B5',
            lineHeight: 1.75,
            maxWidth: 680,
          }}
        >
          From AI Agents and AI CRM to enterprise-grade custom AI solutions, we build intelligent products that automate operations, improve customer engagement, and accelerate business growth.
        </p>

        {/* CTAs */}
        <div className="l4-fade-up-4 flex flex-wrap items-center justify-center gap-4 pt-1">
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#ffffff',
              borderRadius: 999,
              fontFamily: 'var(--font-heading)',
              boxShadow: '0 0 24px rgba(124,58,237,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(124,58,237,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Explore AI Products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 text-sm font-semibold transition-all duration-300"
            style={{
              background: 'transparent',
              color: '#ffffff',
              borderRadius: 999,
              fontFamily: 'var(--font-heading)',
              border: '1.5px solid rgba(168,85,247,0.45)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.8)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.45)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Build with Us
          </a>
        </div>
      </div>

      {/* ── Hero visual ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        className="relative z-10 mt-16 w-full"
        style={{ maxWidth: 900, margin: '4rem auto 0' }}
      >
        {/* Glow behind image */}
        <div
          className="l4-glow-pulse pointer-events-none absolute"
          style={{
            inset: '-40px',
            background: 'radial-gradient(ellipse at 50% 80%, rgba(109,40,217,0.35) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
        {/* Image container */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: '1.25rem',
            border: '1px solid rgba(168,85,247,0.2)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.1)',
            zIndex: 1,
          }}
        >
          {/* Top bar chrome strip */}
          <div
            className="flex items-center gap-1.5 px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(168,85,247,0.12)' }}
          >
            {['#EF4444','#F59E0B','#22C55E'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
            ))}
          </div>
          <img
            src={heroVisual}
            alt="AI Platform Dashboard"
            style={{ width: '100%', display: 'block', opacity: 0.92 }}
          />
          {/* Bottom fade into background */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '35%', background: 'linear-gradient(to top, #06060A 0%, transparent 100%)', pointerEvents: 'none' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

/* ── Layout 5 ───────────────────────────────────────────────────── */
function Layout5({ sectionRef }) {
  const photos = [
    { src: culturePhoto1, offset: '8%' },
    { src: culturePhoto3, offset: '0%' },
    { src: culturePhoto5, offset: '12%' },
  ]

  return (
    <section
      ref={sectionRef}
      id="layout-5"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: '#0D0D12' }}
    >
      {/* Corner arc decorations */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full" style={{ border: '1.5px solid rgba(124,58,237,0.3)' }} />
      <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full" style={{ border: '1.5px solid rgba(124,58,237,0.2)' }} />

      <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">

        {/* Left: content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col gap-8"
        >
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            AI That Works.{' '}
            <span style={{ color: '#a855f7' }}>Products That Scale.</span>{' '}Solutions That Deliver.
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '480px' }}>
            Popular Digital AI builds enterprise AI products like Agent AI and AI CRM while delivering custom AI software solutions that help businesses automate, engage customers, and grow faster.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: '#7C3AED', color: '#ffffff', fontFamily: 'var(--font-heading)' }}
            >
              Explore Products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background: 'transparent',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                border: '1.5px solid rgba(255,255,255,0.15)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#7C3AED' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              Book a Demo
            </a>
          </div>
        </motion.div>

        {/* Right: staggered arch/leaf photo cards */}
        <div className="relative flex items-center justify-center gap-4" style={{ minHeight: '520px' }}>
          {photos.map(({ src, offset }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
              className="relative flex-shrink-0"
              style={{ marginTop: offset, width: i === 1 ? 200 : 170 }}
            >
              {/* Purple accent block behind card */}
              <div
                className="absolute"
                style={{
                  width: '100%', height: '55%',
                  bottom: -10, left: -10,
                  background: '#5B21B6',
                  borderRadius: '0 0 999px 999px',
                  zIndex: 0,
                }}
              />
              {/* Arch-shaped photo card */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: '100%',
                  height: i === 1 ? 320 : 270,
                  borderRadius: '999px 999px 999px 999px',
                  border: '1.5px solid rgba(168,85,247,0.35)',
                  zIndex: 1,
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
                {/* Dark gradient overlay at bottom */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(13,13,18,0.7) 0%, transparent 50%)' }}
                />
              </div>
              {/* Diamond accent */}
              <div
                className="absolute"
                style={{
                  width: 16, height: 16,
                  right: -8, top: '55%',
                  background: '#a855f7',
                  transform: 'rotate(45deg)',
                  zIndex: 2,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Placeholder section (layout 5 fallback) ────────────────────── */
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
        <div
          className="w-full rounded-2xl flex flex-col items-center justify-center gap-4 py-20 px-8"
          style={{
            border: '2px dashed rgba(168,85,247,0.2)',
            background: isLight ? 'rgba(124,58,237,0.02)' : 'rgba(124,58,237,0.04)',
          }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple-accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
              Layout {num}
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-subtle)' }}>Placeholder for Hero Design</p>
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
          num === 1
            ? <Layout1 key={num} sectionRef={el => { sectionRefs.current[i] = el }} />
            : num === 2
            ? <Layout2 key={num} sectionRef={el => { sectionRefs.current[i] = el }} />
            : num === 3
            ? <Layout4 key={num} sectionRef={el => { sectionRefs.current[i] = el }} />
            : <Layout5 key={num} sectionRef={el => { sectionRefs.current[i] = el }} />
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
