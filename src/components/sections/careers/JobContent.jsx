import { MapPin } from 'lucide-react'
import { useTheme } from '@hooks/useTheme'

export default function JobContent({ job, onClose }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <div className="flex-1 min-w-0">
      {/* Title + location + apply */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            className="mb-1"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              color: 'var(--color-purple-accent)',
              letterSpacing: '-0.02em',
            }}
          >
            {job.title}
          </h2>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-muted)' }}>
            <MapPin size={13} /> {job.location}
          </div>
        </div>
        <a
          href={`mailto:${job.applyEmail}?subject=Application for ${job.title}`}
          className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200"
          style={{ background: 'var(--color-purple)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-purple-accent)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-purple)' }}
        >
          Apply
        </a>
      </div>

      {/* Job sections */}
      <div className="flex flex-col gap-8">
        {job.sections.map((sec, i) => (
          <div key={i} className="flex flex-col gap-3">
            {i > 0 && (
              <h3
                className="font-semibold"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: '1.0625rem' }}
              >
                {sec.heading}
              </h3>
            )}
            {sec.body && (
              <p className="leading-relaxed" style={{ color: 'var(--color-muted)', fontSize: '0.9375rem' }}>
                {sec.body}
              </p>
            )}
            {sec.bullets && (
              <ul className="flex flex-col gap-2 pl-1">
                {sec.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--color-purple-accent)' }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Contact note */}
      <div
        className="mt-10 rounded-2xl p-5 text-sm"
        style={{
          background: isLight ? 'rgba(124,58,237,0.06)' : 'rgba(124,58,237,0.1)',
          border: '1px solid rgba(124,58,237,0.2)',
          color: 'var(--color-muted)',
        }}
      >
        Drop your resume at{' '}
        <a href="mailto:hr@populardigital.ai" style={{ color: 'var(--color-purple-accent)' }}>hr@populardigital.ai</a>
        {' '}or{' '}
        <a href="mailto:almoda@populardigital.ai" style={{ color: 'var(--color-purple-accent)' }}>almoda@populardigital.ai</a>
      </div>
    </div>
  )
}
