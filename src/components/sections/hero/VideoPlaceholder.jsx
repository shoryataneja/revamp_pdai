import { Play } from 'lucide-react'

/**
 * Reserved, empty slot for the Prism360 demo video.
 * No media is rendered here — just an empty 16:9 frame with a title.
 */
export default function VideoPlaceholder() {
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

      {/* Empty video frame */}
      <div
        className="relative aspect-video w-full rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(14, 14, 20, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px dashed rgba(45, 45, 66, 0.8)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.12)',
        }}
      >
        {/* Centered title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              background: 'rgba(124, 58, 237, 0.12)',
              border: '1px solid rgba(124, 58, 237, 0.35)',
            }}
          >
            <Play size={20} style={{ color: 'var(--color-purple-accent)' }} fill="currentColor" />
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-heading)' }}
          >
            Demo video
          </span>
        </div>
      </div>
    </div>
  )
}
