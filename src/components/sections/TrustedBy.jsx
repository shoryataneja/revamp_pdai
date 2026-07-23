import { motion } from 'framer-motion'
import Marquee from '@ui/Marquee'
import Divider from '@ui/Divider'
import { clients } from '@data/clients'
import { fadeUp, viewport } from '@utils/animations'

const EASE = [0.16, 1, 0.3, 1]

/* ── Single logo pill ───────────────────────────────────────────── */
function LogoPill({ name, svg, width }) {
  return (
    <div
      className="group mx-4 flex h-11 shrink-0 cursor-default items-center justify-center rounded-xl px-5 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: 'rgba(148,163,184,0.5)', /* --color-muted at 50% */
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = 'rgba(248,250,252,0.85)'
        e.currentTarget.style.background = 'rgba(124,58,237,0.08)'
        e.currentTarget.style.borderColor = 'rgba(168,85,247,0.25)'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = 'rgba(148,163,184,0.5)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      aria-label={name}
      title={name}
    >
      <svg
        width={width}
        height={28}
        viewBox={`0 0 ${width} 28`}
        fill="none"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────────── */
export default function TrustedBy() {
  return (
    <section
      id="trusted-by"
      className="relative w-full overflow-hidden py-20"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      {/* Subtle centre glow */}
      <div
        className="glow-orb pointer-events-none"
        style={{
          width: 600,
          height: 300,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-10">
        {/* Top divider */}
        <Divider />

        {/* Label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="flex flex-col items-center gap-3"
        >
          <p
            className="text-center text-sm"
            style={{ color: 'var(--color-subtle)' }}
          >
            Powering AI initiatives at forward-thinking companies worldwide
          </p>
        </motion.div>

        {/* Single row — scrolls left */}
        <Marquee speed={28} direction="left" className="py-1">
          {clients.map(client => (
            <LogoPill key={client.id} {...client} />
          ))}
        </Marquee>

        {/* Bottom divider */}
        <Divider />
      </div>
    </section>
  )
}
