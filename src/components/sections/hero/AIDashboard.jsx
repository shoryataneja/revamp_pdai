import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { dashboardMetrics, dashboardActivity, sparklinePoints } from '@data/hero'

const EASE = [0.16, 1, 0.3, 1]

/* ── Status dot ─────────────────────────────────────────────────── */
function StatusDot({ status }) {
  const colors = {
    running:  '#A855F7',
    complete: '#34D399',
    queued:   '#475569',
  }
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {status === 'running' && (
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: colors[status] }}
        />
      )}
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ background: colors[status] }}
      />
    </span>
  )
}

/* ── Sparkline SVG ──────────────────────────────────────────────── */
function Sparkline({ points }) {
  const w = 120, h = 36
  const min = Math.min(...points)
  const max = Math.max(...points)
  const norm = points.map(p => h - ((p - min) / (max - min)) * (h - 4) - 2)
  const step = w / (points.length - 1)
  const d = norm.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${y}`).join(' ')
  const fill = norm.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${y}`).join(' ')
    + ` L ${(points.length - 1) * step} ${h} L 0 ${h} Z`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#sparkFill)" />
      <motion.path
        d={d}
        stroke="#A855F7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 1.2 }}
      />
    </svg>
  )
}

/* ── Animated counter ───────────────────────────────────────────── */
function AnimatedValue({ value }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {value}
    </motion.span>
  )
}

/* ── Progress bar ───────────────────────────────────────────────── */
function ProgressBar({ progress, status, delay }) {
  const color = status === 'complete' ? '#34D399' : status === 'queued' ? '#475569' : '#A855F7'
  return (
    <div
      className="h-1 w-full rounded-full overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: color, boxShadow: status === 'running' ? `0 0 8px ${color}` : 'none' }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      />
    </div>
  )
}

/* ── Main dashboard ─────────────────────────────────────────────── */
export default function AIDashboard() {
  /* Simulate live metric ticking */
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000)
    return () => clearInterval(id)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.6 } },
  }
  const itemVariants = {
    hidden:   { opacity: 0, y: 20, scale: 0.97 },
    visible:  { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-[520px] select-none"
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(168,85,247,0.1) 50%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Dashboard shell */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(14, 14, 20, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(45, 45, 66, 0.8)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.12)',
        }}
      >
        {/* Title bar */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{ borderColor: 'rgba(45,45,66,0.6)' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {['#FF5F57','#FEBC2E','#28C840'].map(c => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <span className="text-xs ml-2" style={{ color: 'var(--color-subtle)', fontFamily: 'var(--font-body)' }}>
              AI Operations Center
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <StatusDot status="running" />
            <span className="text-xs" style={{ color: 'var(--color-purple-accent)' }}>Live</span>
          </div>
        </motion.div>

        <div className="p-5 flex flex-col gap-5">
          {/* Metrics grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            {dashboardMetrics.map(({ label, value, delta, up }) => (
              <div
                key={label}
                className="rounded-xl p-3.5 flex flex-col gap-1.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(45,45,66,0.5)' }}
              >
                <span className="text-xs" style={{ color: 'var(--color-subtle)' }}>{label}</span>
                <span
                  className="text-xl font-semibold"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
                >
                  <AnimatedValue value={value} key={tick} />
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: up ? '#34D399' : '#F87171' }}
                >
                  {delta}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Sparkline card */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(45,45,66,0.5)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs" style={{ color: 'var(--color-subtle)' }}>Throughput (24h)</span>
              <span className="text-xs font-semibold" style={{ color: '#34D399' }}>↑ 18.4%</span>
            </div>
            <Sparkline points={sparklinePoints} />
          </motion.div>

          {/* Activity list */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <span className="text-xs font-medium" style={{ color: 'var(--color-subtle)' }}>
              Active Pipelines
            </span>
            {dashboardActivity.map(({ label, status, progress }, i) => (
              <div key={label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusDot status={status} />
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{label}</span>
                  </div>
                  <span className="text-xs tabular-nums" style={{ color: 'var(--color-subtle)' }}>
                    {progress}%
                  </span>
                </div>
                <ProgressBar progress={progress} status={status} delay={0.8 + i * 0.1} />
              </div>
            ))}
          </motion.div>

          {/* Bottom status bar */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between pt-1"
          >
            <div className="flex items-center gap-1.5">
              <StatusDot status="running" />
              <span className="text-xs" style={{ color: 'var(--color-subtle)' }}>
                All systems operational
              </span>
            </div>
            <span className="text-xs tabular-nums" style={{ color: 'var(--color-subtle)' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
