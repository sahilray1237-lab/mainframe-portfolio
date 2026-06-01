import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'
const SENSITIVITY = 0.8

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const isSeeking = useRef(false)

  const { displayed, done } = useTypewriter(
    "I'm Raunak Ray. Good taste tends to find us. Now, what are we building?",
    35,
    500
  )

  const [showPills, setShowPills] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowPills(true), 500)
      return () => clearTimeout(t)
    }
  }, [done])

  /* ── Mouse-scrub video ── */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const seekNext = () => {
      if (!video) return
      if (Math.abs(video.currentTime - targetTime.current) > 0.05) {
        isSeeking.current = true
        video.currentTime = targetTime.current
      } else {
        isSeeking.current = false
      }
    }

    const onSeeked = () => seekNext()

    const onMove = (e: MouseEvent) => {
      if (!video || !video.duration) return
      if (prevX.current === null) { prevX.current = e.clientX; return }
      const delta = e.clientX - prevX.current
      prevX.current = e.clientX
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTime.current = Math.max(0, Math.min(video.duration, targetTime.current + offset))
      if (!isSeeking.current) seekNext()
    }

    window.addEventListener('mousemove', onMove)
    video.addEventListener('seeked', onSeeked)
    return () => {
      window.removeEventListener('mousemove', onMove)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('raunakrai572@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* noop */ }
  }

  return (
    <section
      className="relative h-screen flex flex-col justify-end pb-14 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* ── Full-screen background video ── */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0, objectFit: 'cover', objectPosition: '70% center' }}
        muted
        playsInline
        preload="auto"
        src={VIDEO_URL}
      />

      {/* ── Dark overlay for text readability ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* ── Foreground content ── */}
      <div className="relative max-w-xl" style={{ zIndex: 10 }}>
        {/* Blurred intro label */}
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6 whitespace-pre-line text-white/60"
          style={{
            fontSize: 'clamp(16px, 3.5vw, 24px)',
            lineHeight: 1.4,
            filter: 'blur(4px)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {"Hey there, meet A.R.I.A,\nMainframe's Adaptive Response Interface Agent"}
        </p>

        {/* Typewriter heading */}
        <h1
          className="leading-[1.15] text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(26px, 5vw, 44px)',
          }}
        >
          {displayed}
          <span className="cursor-blink inline-block ml-0.5 text-white">|</span>
        </h1>

        {/* ── Pill action buttons ── */}
        {showPills && (
          <div className="flex flex-wrap gap-3 mt-9 animate-fade-slide-up">
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-white text-black text-[14px] sm:text-[15px] font-medium hover:bg-neutral-200 transition-colors duration-200 no-underline"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              View Projects
            </Link>

            <a
              href="https://github.com/sahilray1237-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-sm text-black text-[14px] sm:text-[15px] font-medium hover:bg-white transition-colors duration-200 no-underline"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/raunak-ray-3a93b1413"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-sm text-black text-[14px] sm:text-[15px] font-medium hover:bg-white transition-colors duration-200 no-underline"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              LinkedIn
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/40 text-white text-[13px] sm:text-[14px] hover:bg-white/15 transition-colors duration-200 bg-transparent cursor-pointer"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {copied ? '✓ Copied!' : 'raunakrai572@gmail.com'}
              {!copied && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom scroll hint ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="text-white/40 text-[12px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)' }}>
          Move mouse to scrub
        </span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  )
}
