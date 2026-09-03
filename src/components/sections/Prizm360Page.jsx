import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Problem from './Problem'
import Workflow from './Workflow'
import Differentiation from './Differentiation'
import UseCases from './UseCases'
import Demo from './Demo'
import Roadmap from './Roadmap'
import Contact from './Contact'
import { useTheme } from '@hooks/useTheme'

export default function Prizm360Page() {
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
      {/* Back bar */}
      <div
        className="sticky top-0 z-50 flex items-center px-6 py-4"
        style={{
          background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(11,11,15,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${isLight ? '#E2E8F0' : 'rgba(45,45,66,0.5)'}`,
        }}
      >
        <a
          href="#hero"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
          style={{ color: 'var(--color-purple-accent)' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </a>
        <span
          className="ml-auto text-sm font-semibold"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          Prizm360
        </span>
      </div>

      <main className="flex-1">
        <Problem />
        <Workflow />
        <Differentiation />
        <UseCases />
        <Demo />
        <Roadmap />
        <Contact />
      </main>
    </motion.div>
  )
}
