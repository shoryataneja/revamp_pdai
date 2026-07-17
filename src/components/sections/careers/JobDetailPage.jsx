import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import JobHeroBanner from './JobHeroBanner'
import JobContent from './JobContent'
import JobSidebar from './JobSidebar'
import { useTheme } from '@hooks/useTheme'

export default function JobDetailPage({ job, onClose }) {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-screen flex-col"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Back bar — replaces navbar */}
      <div
        className="sticky top-0 z-50 flex items-center px-6 py-4"
        style={{
          background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(11,11,15,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)'}`,
        }}
      >
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
          style={{ color: 'var(--color-purple-accent)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <main className="flex-1">
        <JobHeroBanner job={job} />

        <div className="container-site py-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <JobContent job={job} onClose={onClose} />
            <JobSidebar job={job} />
          </div>
        </div>
      </main>
    </motion.div>
  )
}
