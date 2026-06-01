import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = 'hover:opacity-60 transition-opacity duration-200'

  return (
    <>
      {/* ─── Top bar ─── */}
      <nav
        className="fixed top-0 left-0 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center"
        style={{ zIndex: 10, fontFamily: 'var(--font-heading)' }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 select-none">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black">
            Mainframe®
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </Link>

        {/* Desktop centre links */}
        <div className="hidden md:flex items-center text-[23px] text-black gap-0">
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          <span className="mx-1 select-none">,&nbsp;</span>
          <a
            href="https://github.com/sahilray1237-lab"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <span className="mx-1 select-none">,&nbsp;</span>
          <a
            href="https://www.linkedin.com/in/raunak-ray-3a93b1413"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          <span className="mx-1 select-none">,&nbsp;</span>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </div>

        {/* Desktop CTA */}
        <a
          href="tel:8810770947"
          className={`hidden md:block text-[23px] text-black underline underline-offset-2 ${linkClass}`}
        >
          +91 8810770947
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-20"
          onClick={() => setOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-7 h-[2px] bg-black transition-all duration-300 ${
              open ? 'rotate-45 translate-y-[5px]' : ''
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-black mt-[6px] transition-all duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-black mt-[6px] transition-all duration-300 ${
              open ? '-rotate-45 -translate-y-[9px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* ─── Mobile overlay ─── */}
      {open && (
        <div
          className="fixed inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 text-[28px] text-black"
          style={{ zIndex: 15, fontFamily: 'var(--font-heading)' }}
        >
          <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
            Home
          </NavLink>
          <NavLink
            to="/projects"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Projects
          </NavLink>
          <a
            href="https://github.com/sahilray1237-lab"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/raunak-ray-3a93b1413"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          <NavLink
            to="/admin"
            onClick={() => setOpen(false)}
            className={linkClass}
          >
            Admin
          </NavLink>
          <a href="tel:8810770947" className={`underline underline-offset-2 ${linkClass}`}>
            +91 8810770947
          </a>
        </div>
      )}
    </>
  )
}
