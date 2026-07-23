import { useState } from 'react'
import RootLayout from '@layout/RootLayout'
import Hero from '@sections/Hero'
import Products from '@sections/Products'
import TrustedBy from '@sections/TrustedBy'
import ProductShowcase from '@sections/ProductShowcase'
import Team from '@sections/Team'
import CaseStudies from '@sections/CaseStudies'
import Careers from '@sections/Careers'
import Contact from '@sections/Contact'
import JobDetailPage from '@sections/careers/JobDetailPage'
import CaseStudyDetailPage from '@sections/case-studies/CaseStudyDetailPage'
import { useLenis } from '@hooks/useLenis'
import { AnimatePresence } from 'framer-motion'

export default function App() {
  useLenis()
  const [activeJob, setActiveJob] = useState(null)
  const [activeStudy, setActiveStudy] = useState(null)

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
      <TrustedBy />
      <Products />
      <ProductShowcase />
      <Team />
      <CaseStudies onOpenStudy={setActiveStudy} />
      <Careers onOpenJob={setActiveJob} />
      <Contact />
    </RootLayout>
  )
}
