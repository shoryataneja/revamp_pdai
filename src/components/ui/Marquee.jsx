import { useState } from 'react'
import { cn } from '@utils/cn'

/**
 * Headless infinite-scroll marquee.
 *
 * Renders `children` twice side-by-side so the CSS translateX(-50%)
 * animation creates a perfectly seamless loop — no jump, no gap.
 *
 * @param {React.ReactNode} children
 * @param {number}          speed         - seconds for one full cycle (default 30)
 * @param {'left'|'right'}  direction     - scroll direction (default 'left')
 * @param {boolean}         pauseOnHover  - pause animation on hover (default true)
 * @param {string}          className     - classes for the outer mask container
 * @param {string}          trackClassName - classes for the inner scrolling track
 */
export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  className,
  trackClassName,
}) {
  const [paused, setPaused] = useState(false)

  return (
    /* Outer container — clips overflow and applies edge fade masks */
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        /* Fade edges to transparent so logos dissolve cleanly */
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      aria-label="Trusted by companies"
    >
      <div
        className={cn('marquee-track', trackClassName)}
        data-paused={paused}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {/* Original set */}
        <div className="flex shrink-0 items-center" aria-hidden="false">
          {children}
        </div>
        {/* Duplicate — makes the loop seamless */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
