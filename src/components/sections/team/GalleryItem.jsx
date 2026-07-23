import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]
const ASPECT_RATIO = { square: '100%', wide: '66.66%', tall: '140%' }

export default function GalleryItem({ item, index }) {
  const { src, aspect = 'square', caption, objectPosition = 'center' } = item

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: EASE, delay: (index % 3) * 0.1 }}
      className="relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
      style={{ border: '1px solid rgba(45,45,66,0.6)' }}
    >
      <div className="relative w-full" style={{ paddingBottom: ASPECT_RATIO[aspect] }}>
        <div className="absolute inset-0">
          <img
            src={src}
            alt={caption}
            className="h-full w-full object-cover"
            style={{ objectPosition }}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  )
}
