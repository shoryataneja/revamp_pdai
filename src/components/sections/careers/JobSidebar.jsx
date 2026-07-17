import { Clock, Zap, Users } from 'lucide-react'
import { useTheme } from '@hooks/useTheme'

const quickPerks = [
  { icon: Clock, label: 'Flexible\nSchedule' },
  { icon: Zap,   label: 'Fast-Paced\nGrowth' },
  { icon: Users, label: 'Great\nTeam' },
]

export default function JobSidebar({ job }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  return (
    <div className="w-full shrink-0 lg:w-72">
      <div
        className="flex flex-col gap-6 rounded-2xl p-6"
        style={{
          background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.6)'}`,
        }}
      >
        <h4
          className="text-center font-semibold"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          Quick Perks
        </h4>

        <div className="flex items-start justify-around gap-2">
          {quickPerks.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{
                  background: isLight ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.2)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}
              >
                <Icon size={18} style={{ color: 'var(--color-purple-accent)' }} strokeWidth={1.75} />
              </div>
              <span
                className="whitespace-pre-line text-xs font-medium leading-tight"
                style={{ color: 'var(--color-muted)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col gap-3 border-t pt-4"
          style={{ borderColor: isLight ? '#E2E8F0' : 'rgba(45,45,66,0.6)' }}
        >
          {[
            { label: 'Job ID',     value: job.id },
            { label: 'Location',   value: job.location },
            { label: 'Type',       value: job.type },
            { label: 'Department', value: job.department },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span style={{ color: 'var(--color-muted)' }}>{label}</span>
              <span className="font-medium" style={{ color: 'var(--color-text)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
