import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import videoSrc from '@assets/prizm360.mp4'

const EASE = [0.16, 1, 0.3, 1]

function fmt(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* ── Icons ── */
function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  )
}
function IconPause() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}
function IconBack() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 17l-5-5 5-5" /><path d="M18 17l-5-5 5-5" />
    </svg>
  )
}
function IconForward() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 17l5-5-5-5" /><path d="M6 17l5-5-5-5" />
    </svg>
  )
}
function IconMuted() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}
function IconUnmuted() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

export default function VideoPlaceholder() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)

  // Autoplay muted on mount — ideal behaviour:
  // video starts silently so the page feels alive, user can unmute when ready
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().then(() => {
      setPlaying(true)
      setShowOverlay(false)
    }).catch(() => {
      // autoplay blocked — show play overlay
      setPlaying(false)
      setShowOverlay(true)
    })
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
      setShowOverlay(false)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  function skip(sec) {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.min(Math.max(0, v.currentTime + sec), v.duration || 0)
  }

  function handleTimeUpdate() {
    const v = videoRef.current
    if (!v) return
    setCurrentTime(v.currentTime)
    setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0)
  }

  function handleSeek(e) {
    const v = videoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  function handleEnded() {
    setPlaying(false)
    setShowOverlay(true)
  }

  const controlBtn = 'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150'
  const controlStyle = {
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(255,255,255,0.1)',
  }
  const controlHover = {
    background: 'rgba(124,58,237,0.3)',
    borderColor: 'rgba(168,85,247,0.5)',
    color: '#ffffff',
  }

  return (
    <div className="relative w-full max-w-[560px]">
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(168,85,247,0.1) 50%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Video container */}
      <div
        className="relative aspect-video w-full rounded-2xl overflow-hidden"
        style={{
          background: '#0D0D12',
          border: '1px solid rgba(45,45,66,0.8)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.12)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={e => setDuration(e.target.duration)}
          onEnded={handleEnded}
          playsInline
          loop={false}
        />

        {/* Initial play overlay */}
        {showOverlay && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer"
            style={{ background: 'rgba(6,6,10,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={togglePlay}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                boxShadow: '0 0 32px rgba(124,58,237,0.5)',
              }}
            >
              <IconPlay />
            </motion.div>
            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-heading)' }}>
              Click to play
            </span>
          </div>
        )}

        {/* Controls bar — visible on hover or when paused */}
        <motion.div
          animate={{ opacity: hovered || !playing ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 inset-x-0 px-4 pb-3 pt-8"
          style={{
            background: 'linear-gradient(to top, rgba(6,6,10,0.9) 0%, transparent 100%)',
            pointerEvents: hovered || !playing ? 'auto' : 'none',
          }}
        >
          {/* Progress bar */}
          <div
            className="relative mb-3 cursor-pointer group/seek"
            style={{ height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.15)' }}
            onClick={handleSeek}
          >
            <div
              style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                borderRadius: 99,
                transition: 'width 0.1s linear',
              }}
            />
            {/* Scrubber thumb */}
            <div
              style={{
                position: 'absolute', top: '50%',
                left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: 12, height: 12,
                borderRadius: '50%',
                background: '#a855f7',
                boxShadow: '0 0 8px rgba(168,85,247,0.7)',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s',
              }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-2">
            {/* Skip back */}
            <button
              onClick={() => skip(-10)}
              className={controlBtn}
              style={controlStyle}
              title="-10s"
              onMouseEnter={e => Object.assign(e.currentTarget.style, controlHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, controlStyle)}
            >
              <IconBack />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                color: '#ffffff',
                boxShadow: '0 0 12px rgba(124,58,237,0.4)',
              }}
              title={playing ? 'Pause' : 'Play'}
            >
              {playing ? <IconPause /> : <IconPlay />}
            </button>

            {/* Skip forward */}
            <button
              onClick={() => skip(10)}
              className={controlBtn}
              style={controlStyle}
              title="+10s"
              onMouseEnter={e => Object.assign(e.currentTarget.style, controlHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, controlStyle)}
            >
              <IconForward />
            </button>

            {/* Time */}
            <span
              className="text-xs tabular-nums ml-1"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-heading)' }}
            >
              {fmt(currentTime)} / {fmt(duration)}
            </span>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className={controlBtn}
              style={controlStyle}
              title={muted ? 'Unmute' : 'Mute'}
              onMouseEnter={e => Object.assign(e.currentTarget.style, controlHover)}
              onMouseLeave={e => Object.assign(e.currentTarget.style, controlStyle)}
            >
              {muted ? <IconMuted /> : <IconUnmuted />}
            </button>
          </div>
        </motion.div>

        {/* Muted badge — shown while muted and playing */}
        {muted && playing && !showOverlay && (
          <motion.button
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={toggleMute}
            className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold cursor-pointer"
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(168,85,247,0.35)',
              color: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <IconMuted /> Tap to unmute
          </motion.button>
        )}
      </div>
    </div>
  )
}
