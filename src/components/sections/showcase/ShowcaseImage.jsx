import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/* ── KPI chip ───────────────────────────────────────────────────── */
function KpiChip({ label, value, delta, up, accent, accentRgb, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.4 + index * 0.07 }}
      className="flex flex-col gap-1 rounded-xl p-3"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <span className="text-xs" style={{ color: 'rgba(148,163,184,0.7)' }}>{label}</span>
      <span
        className="text-lg font-bold leading-none tabular-nums"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        {value}
      </span>
      <span className="text-xs font-medium" style={{ color: up ? '#34D399' : '#F87171' }}>
        {delta}
      </span>
    </motion.div>
  )
}

/* ── Bar chart ──────────────────────────────────────────────────── */
function BarChart({ bars, label, accent, accentRgb }) {
  const max = Math.max(...bars)
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs" style={{ color: 'rgba(148,163,184,0.6)' }}>{label}</span>
      <div className="flex items-end gap-1 h-14">
        {bars.map((val, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              background: `rgba(${accentRgb}, ${i === bars.length - 1 ? 0.9 : 0.35})`,
              boxShadow: i === bars.length - 1 ? `0 0 8px rgba(${accentRgb}, 0.5)` : 'none',
            }}
            initial={{ scaleY: 0, originY: 1 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.04 }}
          >
            <div style={{ height: `${(val / max) * 100}%`, minHeight: 4 }} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── Status badge ───────────────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    'In Stock':    { bg: 'rgba(52,211,153,0.12)',  color: '#34D399' },
    'Low Stock':   { bg: 'rgba(251,191,36,0.12)',  color: '#FBBF24' },
    'Critical':    { bg: 'rgba(248,113,113,0.12)', color: '#F87171' },
    'Urgent':      { bg: 'rgba(248,113,113,0.12)', color: '#F87171' },
    'In Progress': { bg: 'rgba(168,85,247,0.12)',  color: '#A855F7' },
    'Scheduled':   { bg: 'rgba(148,163,184,0.12)', color: '#94A3B8' },
    'Completed':   { bg: 'rgba(52,211,153,0.12)',  color: '#34D399' },
  }
  const style = map[status] ?? { bg: 'rgba(148,163,184,0.1)', color: '#94A3B8' }
  return (
    <span
      className="rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ background: style.bg, color: style.color }}
    >
      {status}
    </span>
  )
}

/* ── Main mock UI ───────────────────────────────────────────────── */
/**
 * @param {object} mock      - mock data from showcases.js
 * @param {string} accent    - hex accent color
 * @param {string} accentRgb - rgb string for rgba()
 */
export default function ShowcaseImage({ mock, accent, accentRgb }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative w-full"
      style={{ perspective: 1000 }}
    >
      {/* Outer glow halo */}
      <div
        className="absolute -inset-3 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(${accentRgb}, 0.18) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* Dashboard shell */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'rgba(12, 12, 18, 0.9)',
          backdropFilter: 'blur(24px)',
          border: `1px solid rgba(${accentRgb}, 0.2)`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(${accentRgb}, 0.08)`,
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <span
              className="ml-2 text-xs font-medium"
              style={{ color: 'rgba(148,163,184,0.6)', fontFamily: 'var(--font-body)' }}
            >
              {mock.title}
            </span>
          </div>
          {/* Live indicator */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: accent }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
            </span>
            <span className="text-xs" style={{ color: accent }}>Live</span>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* KPI grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {mock.kpis.map((kpi, i) => (
              <KpiChip key={kpi.label} {...kpi} accent={accent} accentRgb={accentRgb} index={i} />
            ))}
          </div>

          {/* Bar chart */}
          <div
            className="rounded-xl p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <BarChart bars={mock.bars} label={mock.barLabel} accent={accent} accentRgb={accentRgb} />
          </div>

          {/* Data table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-3 px-3 py-2 text-xs"
              style={{
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(148,163,184,0.5)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span>Name</span>
              <span className="text-center">Count</span>
              <span className="text-right">Status</span>
            </div>
            {mock.rows.map(({ name, stock, status }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.6 + i * 0.07 }}
                className="grid grid-cols-3 items-center px-3 py-2.5 text-xs"
                style={{
                  borderBottom: i < mock.rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  color: 'var(--color-muted)',
                }}
              >
                <span style={{ color: 'var(--color-text)' }}>{name}</span>
                <span className="text-center tabular-nums">{stock}</span>
                <span className="flex justify-end">
                  <StatusBadge status={status} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
