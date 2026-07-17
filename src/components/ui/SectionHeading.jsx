import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/**
 * Reusable section heading: eyebrow → title → subtitle.
 * @param {'left'|'center'} align
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        align === 'left'   && 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.span variants={fadeUp} className="text-eyebrow">
          {eyebrow}
        </motion.span>
      )}

      <motion.h2 variants={fadeUp} className="text-heading" style={{ fontSize: 'var(--text-h2)' }}>
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-body max-w-2xl"
          style={{ fontSize: '1.0625rem' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
