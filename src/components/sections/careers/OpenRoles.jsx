import { useState, useRef, useEffect } from 'react'
// activeJob state is lifted to App.jsx so JobDetailPage replaces the full page
import { motion } from 'framer-motion'
import { MapPin, ChevronDown, ArrowRight } from 'lucide-react'
import { useTheme } from '@hooks/useTheme'
import { openRoles } from '@data/careers'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'

const ROLE_TYPES = ['All', 'Full Time Employee', 'Direct Consultant', 'Intern']

function FilterDropdown({ value, onChange, isLight }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-150"
        style={{
          border: `1.5px solid ${open ? 'var(--color-purple-accent)' : (isLight ? '#CBD5E1' : 'rgba(45,45,66,0.8)')}`,
          color: 'var(--color-text)',
          background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.04)',
          minWidth: 180,
        }}
      >
        <span className="flex-1 text-left">{value === 'All' ? 'Role Type' : value}</span>
        <ChevronDown size={15} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms', color: 'var(--color-muted)' }} />
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 z-50 rounded-2xl overflow-hidden py-2 min-w-[200px]"
          style={{
            background: isLight ? '#FFFFFF' : '#1A1A24',
            border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.8)'}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          }}
        >
          {ROLE_TYPES.map(type => (
            <button
              key={type}
              onClick={() => { onChange(type); setOpen(false) }}
              className="w-full px-5 py-3 text-left text-sm transition-colors duration-100"
              style={{
                background: value === type ? (isLight ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.15)') : 'transparent',
                color: value === type ? 'var(--color-purple-accent)' : 'var(--color-text)',
                fontWeight: value === type ? 600 : 400,
              }}
              onMouseEnter={e => { if (value !== type) e.currentTarget.style.background = isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (value !== type) e.currentTarget.style.background = 'transparent' }}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function JobCard({ job, onOpen, isLight }) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
      style={{
        background: isLight ? '#FFFFFF' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.6)'}`,
        boxShadow: isLight ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="flex flex-col gap-2">
        <h3
          className="font-semibold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1.0625rem' }}
        >
          {job.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: 'var(--color-muted)' }}>
          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
          <span style={{ color: isLight ? '#CBD5E1' : 'rgba(45,45,66,0.8)' }}>|</span>
          <span>{job.type}</span>
          <span style={{ color: isLight ? '#CBD5E1' : 'rgba(45,45,66,0.8)' }}>|</span>
          <span>{job.department}</span>
        </div>
      </div>

      <button
        onClick={() => onOpen(job)}
        className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200"
        style={{
          background: 'var(--color-purple)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-purple-accent)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-purple)' }}
      >
        Apply Now <ArrowRight size={14} />
      </button>
    </motion.div>
  )
}

export default function OpenRoles({ onOpen }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? openRoles : openRoles.filter(j => j.type === filter)

  return (
    <>
      <div id="open-roles" className="flex flex-col gap-10" style={{ scrollMarginTop: '100px' }}>
        {/* Heading + filter row */}
        <div className="flex items-center">
          {/* Left spacer — same width as filter to keep heading truly centered */}
          <div style={{ flex: '1' }} />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-heading text-center shrink-0"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            Open <span style={{ color: 'var(--color-purple-accent)' }}>Roles</span>
          </motion.h2>

          {/* Right: filter — flex-1 so it mirrors the left spacer */}
          <div className="flex justify-end" style={{ flex: '1' }}>
            <FilterDropdown value={filter} onChange={setFilter} isLight={isLight} />
          </div>
        </div>

        {/* Job cards */}
        {filtered.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-4"
          >
            {filtered.map(job => (
              <JobCard key={job.id} job={job} onOpen={onOpen} isLight={isLight} />
            ))}
          </motion.div>
        ) : (
          <div className="py-16 text-center" style={{ color: 'var(--color-muted)' }}>
            No open roles for this filter right now. Check back soon.
          </div>
        )}
      </div>
    </>
  )
}
