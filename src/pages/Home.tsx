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
    38,
    400
  )

  const [showPills, setShowPills] = useState(false)
  const [copied, setCopied] = useState(false)

  /* Show pills 400ms after typewriter finishes */
  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowPills(true), 400)
      return () => clearTimeout(t)
    }
  }, [done])

  /* Mouse-scrub video */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const seekNext = () => {
      if (!video) return
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) {
        isSeeking.current = true
        video.currentTime = targetTime.current
      } else {
        isSeeking.current = false
      }
    }

    const onSeeked = () => {
      seekNext()
    }

    const onMove = (e: MouseEvent) => {
      if (!video || !video.duration) return
      if (prevX.current === null) {
        prevX.current = e.clientX
        return
      }
      const delta = e.clientX - prevX.current
      prevX.current = e.clientX
      const offset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTime.current = Math.max(
        0,
        Math.min(video.duration, targetTime.current + offset)
      )
      if (!isSeeking.current) {
        seekNext()
      }
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
    } catch {
      /* fallback */
    }
  }

  return (
    <section className="h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden relative"
      style={{ zIndex: 1 }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0, objectFit: 'cover', objectPosition: '70% center' }}
        muted
        playsInline
        preload="auto"
        src={VIDEO_URL}
      />

      {/* Foreground content */}
      <div className="max-w-xl relative" style={{ zIndex: 10 }}>
        {/* Blurred intro label */}
        <p
          className="pointer-events-none select-none mb-5 sm:mb-6 whitespace-pre-line"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          {"Hey there, meet A.R.I.A,\nMainframe's Adaptive Response Interface Agent"}
        </p>

        {/* Typewriter */}
        <h1
          className="text-[28px] sm:text-[36px] md:text-[42px] leading-tight text-black"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {displayed}
          <span className="cursor-blink ml-[2px]">|</span>
        </h1>

        {/* Pill buttons */}
        {showPills && (
          <div className="flex flex-wrap gap-3 mt-8 animate-fade-slide-up">
            {/* View Projects */}
            <Link
              to="/projects"
              className="px-5 py-2.5 rounded-full bg-black text-white text-[15px] hover:bg-neutral-800 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              View Projects
            </Link>

            {/* GitHub */}
            <a
              href="https://github.com/sahilray1237-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-black text-[15px] hover:bg-neutral-100 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/raunak-ray-3a93b1413"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-black text-[15px] hover:bg-neutral-100 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              LinkedIn
            </a>

            {/* Email copy */}
            <button
              onClick={copyEmail}
              className="px-5 py-2.5 rounded-full border border-black text-black text-[15px] flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {copied ? 'Copied!' : 'raunakrai572@gmail.com'}
              {!copied && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
