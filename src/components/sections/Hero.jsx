import { motion } from 'framer-motion'
import HeroCopy from './hero/HeroCopy'
import AIDashboard from './hero/AIDashboard'

const EASE = [0.16, 1, 0.3, 1]

/* Subtle dot-grid SVG background */
const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E")`

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* ── Background layers ── */}

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: DOT_GRID, backgroundSize: '32px 32px' }}
      />

      {/* Primary purple orb — top left */}
      <motion.div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 700, height: 700, top: '-20%', left: '-15%' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Accent orb — bottom right */}
      <motion.div
        className="glow-orb glow-orb-accent pointer-events-none"
        style={{ width: 500, height: 500, bottom: '-10%', right: '-10%' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Subtle mid orb — centre */}
      <motion.div
        className="glow-orb pointer-events-none"
        style={{
          width: 400,
          height: 400,
          top: '30%',
          left: '40%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-bg-primary))',
        }}
      />

      {/* ── Content ── */}
      <div className="container-site relative z-10 w-full pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left — copy */}
          <HeroCopy />

          {/* Right — dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 48, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="flex justify-center lg:justify-end"
          >
            {/* Floating ring decoration behind dashboard */}
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.15) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />
              <AIDashboard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
