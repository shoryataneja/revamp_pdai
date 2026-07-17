import { useEffect, useRef, useState } from 'react'

/**
 * Counts from 0 to `target` over `duration` ms using an easeOut curve.
 * Only starts when `inView` is true, and only runs once.
 *
 * @param {number}  target   - final number to count to
 * @param {number}  duration - animation duration in ms (default 1800)
 * @param {boolean} inView   - trigger flag from an intersection observer
 */
export function useCounter(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    let startTime = null
    const easeOut = (t) => 1 - Math.pow(1 - t, 3) // cubic ease-out

    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(easeOut(progress) * target))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}
