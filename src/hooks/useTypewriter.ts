import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text: string, speed = 38, startDelay = 400) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const idx = useRef(0)

  useEffect(() => {
    idx.current = 0
    setDisplayed('')
    setDone(false)

    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        idx.current++
        setDisplayed(text.slice(0, idx.current))
        if (idx.current >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      // store interval ref for cleanup
      ;(delay as any).__interval = interval
    }, startDelay)

    return () => {
      clearTimeout(delay)
      if ((delay as any).__interval) clearInterval((delay as any).__interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}
