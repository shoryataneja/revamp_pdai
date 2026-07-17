import { useTheme } from '@hooks/useTheme'

export default function JobHeroBanner({ job }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const dividerStyle = {
    background: isLight ? 'rgba(109,40,217,0.25)' : 'rgba(255,255,255,0.2)',
  }
  const labelStyle = {
    color: isLight ? 'rgba(109,40,217,0.7)' : 'rgba(255,255,255,0.55)',
  }
  const valueStyle = {
    fontFamily: 'var(--font-heading)',
    color: isLight ? '#1E1B4B' : '#F8FAFC',
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-8 overflow-hidden px-6 py-20 text-center"
      style={{
        background: isLight
          ? 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 50%, #C4B5FD 100%)'
          : 'linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(109,40,217,0.25) 50%, rgba(76,29,149,0.4) 100%)',
        minHeight: 340,
      }}
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full"
        style={{ background: 'rgba(124,58,237,0.25)', filter: 'blur(60px)' }} />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
        style={{ background: 'rgba(167,139,250,0.3)', filter: 'blur(50px)' }} />

      <h1
        className="relative z-10 max-w-3xl"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: isLight ? '#1E1B4B' : '#F8FAFC',
        }}
      >
        {job.title}
      </h1>

      <div className="relative z-10 h-px w-full max-w-sm" style={dividerStyle} />

      {/* Job ID + Location */}
      <div className="relative z-10 flex items-center gap-8">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest" style={labelStyle}>Job ID</span>
          <span className="text-lg font-bold" style={valueStyle}>{job.id}</span>
        </div>
        <div className="h-10 w-px" style={dividerStyle} />
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold uppercase tracking-widest" style={labelStyle}>Location</span>
          <span className="text-lg font-bold" style={valueStyle}>{job.location}</span>
        </div>
      </div>

      <div className="relative z-10 h-px w-full max-w-sm" style={dividerStyle} />

      <a
        href={`mailto:${job.applyEmail}?subject=Application for ${job.title}`}
        className="relative z-10 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-200"
        style={{
          border: `1.5px solid ${isLight ? 'rgba(109,40,217,0.5)' : 'rgba(255,255,255,0.4)'}`,
          color: isLight ? '#4C1D95' : '#F8FAFC',
          background: 'transparent',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = isLight ? 'rgba(109,40,217,0.1)' : 'rgba(255,255,255,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
      >
        Apply Now
      </a>
    </div>
  )
}
