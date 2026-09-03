import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

const AUTOPLAY_DELAY = 5000

function useCarousel(total, perView) {
  const [index, setIndex] = useState(0)
  const maxIndex = total - perView

  const prev = useCallback(() => setIndex(i => (i <= 0 ? maxIndex : i - 1)), [maxIndex])
  const next = useCallback(() => setIndex(i => (i >= maxIndex ? 0 : i + 1)), [maxIndex])
  const goTo = useCallback((i) => setIndex(i), [])

  // Reset if perView changes and index is out of bounds
  useEffect(() => {
    if (index > maxIndex) setIndex(Math.max(0, maxIndex))
  }, [maxIndex, index])

  return { index, prev, next, goTo, maxIndex }
}

function usePerView() {
  const [perView, setPerView] = useState(3)
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return perView
}

export default function ProductCarousel({ products }) {
  const perView = usePerView()
  const { index, prev, next, goTo, maxIndex } = useCarousel(products.length, perView)
  const paused = useRef(false)
  const touchStart = useRef(null)

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) next()
    }, AUTOPLAY_DELAY)
    return () => clearInterval(id)
  }, [next])

  // Touch swipe
  function onTouchStart(e) { touchStart.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStart.current === null) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    touchStart.current = null
  }

  const dotCount = maxIndex + 1

  return (
    <div
      className="relative"
      onMouseEnter={() => { paused.current = true }}
      onMouseLeave={() => { paused.current = false }}
    >
      {/* Track */}
      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(calc(-${index} * (100% / ${perView})))` }}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              style={{ minWidth: `calc(100% / ${perView})`, padding: '0 10px' }}
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute -left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 z-10"
        style={{
          background: 'rgba(18,18,26,0.8)',
          border: '1px solid rgba(45,45,66,0.7)',
          color: 'var(--color-muted)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(124,58,237,0.2)'
          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
          e.currentTarget.style.color = 'var(--color-purple-accent)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(18,18,26,0.8)'
          e.currentTarget.style.borderColor = 'rgba(45,45,66,0.7)'
          e.currentTarget.style.color = 'var(--color-muted)'
        }}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="absolute -right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 z-10"
        style={{
          background: 'rgba(18,18,26,0.8)',
          border: '1px solid rgba(45,45,66,0.7)',
          color: 'var(--color-muted)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(124,58,237,0.2)'
          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
          e.currentTarget.style.color = 'var(--color-purple-accent)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(18,18,26,0.8)'
          e.currentTarget.style.borderColor = 'rgba(45,45,66,0.7)'
          e.currentTarget.style.color = 'var(--color-muted)'
        }}
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: dotCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === index ? 24 : 8,
              height: 8,
              background: i === index ? 'var(--color-purple-accent)' : 'rgba(168,85,247,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
