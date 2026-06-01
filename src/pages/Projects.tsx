import { useState } from 'react'

interface Project {
  id: number
  title: string
  subtitle: string
  stack: string[]
  description: string
  github: string
  color: string
  icon: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'SortViz',
    subtitle: 'Algorithmic Visualizer',
    stack: ['React', 'TypeScript', 'Canvas API', 'Tailwind CSS'],
    description:
      'An interactive sorting-algorithm visualizer that renders Bubble Sort, Merge Sort, Quick Sort, and Heap Sort in real-time on an HTML Canvas. Includes adjustable array size, animation speed controls, and a step-by-step trace mode for educational walkthroughs.',
    github: 'https://github.com/sahilray1237-lab',
    color: '#1a1a2e',
    icon: '⚡',
  },
  {
    id: 2,
    title: 'DevBoard',
    subtitle: 'Full-Stack Kanban App',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Auth.js'],
    description:
      'A productivity-focused Kanban board with drag-and-drop columns, real-time WebSocket sync, user authentication, and Markdown-powered task descriptions. Built as a capstone project exploring full-stack architecture with server actions.',
    github: 'https://github.com/sahilray1237-lab',
    color: '#16213e',
    icon: '📋',
  },
  {
    id: 3,
    title: 'Arithmos',
    subtitle: 'Competitive-Math Trainer',
    stack: ['Python', 'Flask', 'SQLite', 'HTMX', 'Chart.js'],
    description:
      'A timed math-problem trainer built for JEE/Olympiad prep. Generates random calculus, algebra, and combinatorics problems, tracks solve-time analytics, and renders performance graphs. Features a spaced-repetition engine for weak-area review.',
    github: 'https://github.com/sahilray1237-lab',
    color: '#0f3460',
    icon: '🧮',
  },
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-[#f5f5f5] animate-fade-in">
      {/* ── Bio Section ── */}
      <section className="pt-32 pb-4 px-5 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1
            className="text-[40px] md:text-[60px] leading-[1.08] text-black tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Undergraduate Developer.
            <br />
            Problem Solver.
          </h1>
          <div className="mt-8 max-w-2xl">
            <p className="text-[17px] md:text-[19px] leading-[1.7] text-neutral-700" style={{ fontFamily: 'var(--font-body)' }}>
              Hi, I'm <strong className="text-black">Raunak Ray</strong> — I operate under the creative alias{' '}
              <em className="text-black font-semibold">Mainframe</em>. I completed 12th from{' '}
              <strong className="text-black">Shree O.A.S.S Inter College</strong> and cleared{' '}
              <strong className="text-black">JEE MAINS 2025</strong> before graduation.
              I build things on the web, tinker with algorithms, and believe great engineering starts with great taste.
            </p>
          </div>

          {/* Divider */}
          <div className="mt-12 mb-2 h-px bg-neutral-300/60" />
        </div>
      </section>

      {/* ── Project Grid ── */}
      <section className="px-5 sm:px-8 md:px-10 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-[28px] md:text-[34px] text-black tracking-tight mb-10"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Selected Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((p) => {
              const isDimmed = hoveredId !== null && hoveredId !== p.id
              return (
                <a
                  key={p.id}
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl bg-white border border-neutral-200/80 overflow-hidden no-underline
                             transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:border-neutral-300"
                  style={{
                    opacity: isDimmed ? 0.6 : 1,
                    filter: isDimmed ? 'blur(1px)' : 'blur(0px)',
                    transition: 'all 300ms ease-out',
                  }}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Colored header bar with icon */}
                  <div
                    className="relative w-full aspect-[16/8] flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: p.color }}
                  >
                    <span className="text-[56px] filter drop-shadow-lg select-none">
                      {p.icon}
                    </span>
                    <div className="absolute bottom-3 right-4 text-white/30 text-[11px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                      {p.subtitle}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 pb-7">
                    <h3
                      className="text-[22px] md:text-[24px] text-black leading-tight tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {p.title}
                      <span className="text-neutral-400 font-normal text-[18px] ml-2">— {p.subtitle}</span>
                    </h3>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200/60"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-[14px] leading-[1.65] text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
                      {p.description}
                    </p>

                    {/* GitHub link */}
                    <div className="mt-5 flex items-center gap-1.5 text-[13px] text-black font-medium group-hover:gap-2.5 transition-all duration-200" style={{ fontFamily: 'var(--font-body)' }}>
                      View on GitHub
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
