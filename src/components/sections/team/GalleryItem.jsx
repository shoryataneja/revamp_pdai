import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const ASPECT_RATIO = { square: '100%', wide: '66.66%', tall: '140%' }

export default function GalleryItem({ item, index }) {
  const { src, aspect = 'square', caption, objectPosition = 'center' } = item
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 3) * 0.1 }}
      className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
      style={{ border: '1px solid rgba(45,45,66,0.6)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full" style={{ paddingBottom: ASPECT_RATIO[aspect] }}>

        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <img
            src={src}
            alt={caption}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            loading="lazy"
          />
        </motion.div>

        {/* Hover overlay — caption only */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex flex-col justify-end p-4"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="text-sm font-semibold leading-snug"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
              >
                {caption}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: hovered
              ? 'inset 0 0 0 1px rgba(168,85,247,0.4), 0 0 30px rgba(124,58,237,0.2)'
              : 'inset 0 0 0 1px rgba(45,45,66,0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
