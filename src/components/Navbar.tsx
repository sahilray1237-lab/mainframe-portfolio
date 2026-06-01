import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const hoverCls = 'hover:opacity-50 transition-opacity duration-200'

  return (
    <>
      {/* ─── Desktop + Mobile Top Bar ─── */}
      <nav
        className="fixed top-0 left-0 w-full flex justify-between items-center
                    px-5 sm:px-8 py-4 sm:py-5"
        style={{
          zIndex: 40,
          fontFamily: 'var(--font-heading)',
          background: 'rgba(245,245,245,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline select-none">
          <span className="text-black text-[21px] sm:text-[26px] tracking-tight">
            Mainframe®
          </span>
          <span className="text-black text-[25px] sm:text-[30px] select-none" style={{ letterSpacing: '-0.02em' }}>
            ✳︎
          </span>
        </Link>

        {/* Desktop centre links */}
        <div className="hidden md:flex items-center text-[23px] text-black">
          <NavLink to="/projects" className={hoverCls}>
            Projects
          </NavLink>
          <span className="mx-1.5 select-none text-black/40">,</span>
          <a
            href="https://github.com/sahilray1237-lab"
            target="_blank"
            rel="noopener noreferrer"
            className={hoverCls}
          >
            GitHub
          </a>
          <span className="mx-1.5 select-none text-black/40">,</span>
          <a
            href="https://www.linkedin.com/in/raunak-ray-3a93b1413"
            target="_blank"
            rel="noopener noreferrer"
            className={hoverCls}
          >
            LinkedIn
          </a>
          <span className="mx-1.5 select-none text-black/40">,</span>
          <NavLink to="/admin" className={hoverCls}>
            Admin
          </NavLink>
        </div>

        {/* Desktop CTA */}
        <a
          href="tel:8810770947"
          className={`hidden md:block text-[23px] text-black underline underline-offset-2 decoration-black/30 ${hoverCls}`}
        >
          +91 8810770947
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[5px] z-50 bg-transparent border-none cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-black rounded-full transition-all duration-300 origin-center ${
              open ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black rounded-full transition-all duration-300 ${
              open ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-black rounded-full transition-all duration-300 origin-center ${
              open ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* ─── Mobile Full-screen Overlay ─── */}
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-7 transition-all duration-500 md:hidden ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 35, fontFamily: 'var(--font-heading)' }}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="text-[30px] text-black hover:opacity-50 transition-opacity"
        >
          Home
        </NavLink>
        <NavLink
          to="/projects"
          onClick={() => setOpen(false)}
          className="text-[30px] text-black hover:opacity-50 transition-opacity"
        >
          Projects
        </NavLink>
        <a
          href="https://github.com/sahilray1237-lab"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[30px] text-black hover:opacity-50 transition-opacity"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/raunak-ray-3a93b1413"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[30px] text-black hover:opacity-50 transition-opacity"
        >
          LinkedIn
        </a>
        <NavLink
          to="/admin"
          onClick={() => setOpen(false)}
          className="text-[30px] text-black hover:opacity-50 transition-opacity"
        >
          Admin
        </NavLink>
        <a
          href="tel:8810770947"
          className="text-[22px] text-black underline underline-offset-4 mt-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          +91 8810770947
        </a>
      </div>
    </>
  )
}
