import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import GalleryItem from './team/GalleryItem'
import { teamItems, cultureItems, workspaceItems, teamTabs, teamGalleryMeta } from '@data/team'
import { fadeUp, viewport } from '@utils/animations'

const EASE = [0.16, 1, 0.3, 1]

const tabItems = {
  team:      teamItems,
  culture:   cultureItems,
  workspace: workspaceItems,
}

export default function Team() {
  const [activeTab, setActiveTab] = useState('team')

  const items = tabItems[activeTab]

  return (
    <SectionWrapper
      id="team"
      wrapperClassName="overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      {/* Ambient orbs */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 500, top: '-5%', right: '-8%', opacity: 0.15 }}
      />
      <div
        className="glow-orb glow-orb-accent pointer-events-none"
        style={{ width: 400, height: 400, bottom: '0%', left: '-6%', opacity: 0.12 }}
      />

      <div className="relative z-10 flex flex-col gap-10">

        {/* Heading */}
        <SectionHeading
          title={teamGalleryMeta.title}
          subtitle={teamGalleryMeta.intro}
        />

        {/* Tab switcher */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="flex justify-center"
        >
          <div
            className="flex gap-1 rounded-xl p-1"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {teamTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-6 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                style={{
                  color: activeTab === tab.id ? 'var(--color-text)' : 'var(--color-subtle)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(124,58,237,0.25)',
                      border: '1px solid rgba(124,58,237,0.35)',
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="columns-1 sm:columns-2 lg:columns-3"
            style={{ columnGap: '1rem' }}
          >
            {items.map((item, i) => (
              <GalleryItem key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom note */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-center text-sm"
          style={{ color: 'var(--color-subtle)' }}
        >
          More photos coming soon — follow us on{' '}
          <a
            href="#"
            className="transition-fast"
            style={{ color: 'var(--color-purple-accent)' }}
            onMouseEnter={e => (e.target.style.color = 'var(--color-text)')}
            onMouseLeave={e => (e.target.style.color = 'var(--color-purple-accent)')}
          >
            LinkedIn
          </a>{' '}
          for the latest updates.
        </motion.p>

      </div>
    </SectionWrapper>
  )
}
