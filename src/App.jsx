import { useState, useEffect } from 'react'
import RootLayout from '@layout/RootLayout'
import Hero from '@sections/Hero'
import Problem from '@sections/Problem'
import Workflow from '@sections/Workflow'
import Differentiation from '@sections/Differentiation'
import UseCases from '@sections/UseCases'
import Demo from '@sections/Demo'
import Roadmap from '@sections/Roadmap'
import Team from '@sections/Team'
import CaseStudies from '@sections/CaseStudies'
import Careers from '@sections/Careers'
import TrustedBy from '@sections/TrustedBy'
import Contact from '@sections/Contact'
import JobDetailPage from '@sections/careers/JobDetailPage'
import CaseStudyDetailPage from '@sections/case-studies/CaseStudyDetailPage'
import LayoutsPage from '@sections/LayoutsPage'
import { useLenis } from '@hooks/useLenis'
import { AnimatePresence } from 'framer-motion'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const handler = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  return hash
}

export default function App() {
  useLenis()
  const hash = useHashRoute()
  const [activeJob, setActiveJob] = useState(null)
  const [activeStudy, setActiveStudy] = useState(null)

  if (hash === '#/layouts') {
    return <LayoutsPage />
  }

  if (activeJob) {
    return (
      <AnimatePresence mode="wait">
        <JobDetailPage key={activeJob.id} job={activeJob} onClose={() => setActiveJob(null)} />
      </AnimatePresence>
    )
  }

  if (activeStudy) {
    return (
      <AnimatePresence mode="wait">
        <CaseStudyDetailPage key={activeStudy.id} study={activeStudy} onClose={() => setActiveStudy(null)} />
      </AnimatePresence>
    )
  }

  return (
    <RootLayout>
      <Hero />
      <Problem />
      <Workflow />
      <Differentiation />
      <UseCases />
      <Demo />
      <Roadmap />
      <Team />
      <CaseStudies onOpenStudy={setActiveStudy} />
      <Careers onOpenJob={setActiveJob} />
      <TrustedBy />
      <Contact />
    </RootLayout>
  )
}
