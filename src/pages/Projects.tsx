import { useState } from 'react'

interface Project {
  id: number
  title: string
  stack: string[]
  description: string
  github: string
  image: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'SortViz — Algorithmic Visualizer',
    stack: ['React', 'TypeScript', 'Canvas API', 'Tailwind CSS'],
    description:
      'An interactive sorting-algorithm visualizer that renders Bubble Sort, Merge Sort, Quick Sort, and Heap Sort in real-time on an HTML Canvas. Includes adjustable array size, animation speed controls, and a step-by-step trace mode for educational walkthroughs.',
    github: 'https://github.com/sahilray1237-lab',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="#e8e8e8"><rect width="600" height="400"/><g fill="#bbb" font-family="monospace" font-size="14"><text x="50%" y="45%" text-anchor="middle">[ Sorting Visualizer ]</text><text x="50%" y="55%" text-anchor="middle" font-size="11">React · TypeScript · Canvas</text></g></svg>`
      ),
  },
  {
    id: 2,
    title: 'DevBoard — Full-Stack Kanban App',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Auth.js'],
    description:
      'A productivity-focused Kanban board with drag-and-drop columns, real-time WebSocket sync, user authentication, and Markdown-powered task descriptions. Built as a capstone project exploring full-stack architecture with server actions.',
    github: 'https://github.com/sahilray1237-lab',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="#e0e0e0"><rect width="600" height="400"/><g fill="#aaa" font-family="monospace" font-size="14"><text x="50%" y="45%" text-anchor="middle">[ Kanban Board ]</text><text x="50%" y="55%" text-anchor="middle" font-size="11">Next.js · Prisma · PostgreSQL</text></g></svg>`
      ),
  },
  {
    id: 3,
    title: 'Arithmos — Competitive-Math Trainer',
    stack: ['Python', 'Flask', 'SQLite', 'HTMX', 'Chart.js'],
    description:
      'A timed math-problem trainer built for JEE/Olympiad prep. Generates random calculus, algebra, and combinatorics problems, tracks solve-time analytics, and renders performance graphs. Features a spaced-repetition engine for weak-area review.',
    github: 'https://github.com/sahilray1237-lab',
    image:
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="#eaeaea"><rect width="600" height="400"/><g fill="#b0b0b0" font-family="monospace" font-size="14"><text x="50%" y="45%" text-anchor="middle">[ Math Trainer ]</text><text x="50%" y="55%" text-anchor="middle" font-size="11">Python · Flask · HTMX</text></g></svg>`
      ),
  },
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-[#f5f5f5] pt-32 pb-20 px-5 sm:px-8 md:px-10">
      {/* Bio */}
      <section className="max-w-4xl">
        <h1
          className="text-[40px] md:text-[60px] leading-[1.05] text-black"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Undergraduate Developer.
          <br />
          Problem Solver.
        </h1>
        <p className="mt-6 text-[17px] md:text-[19px] leading-relaxed text-neutral-700 max-w-2xl">
          Hi, I'm <strong>Raunak Ray</strong> — I operate under the creative alias{' '}
          <em>Mainframe</em>. I completed 12th from{' '}
          <strong>Shree O.A.S.S Inter College</strong> and cleared{' '}
          <strong>JEE MAINS 2025</strong> before graduation. I build things on the
          web, tinker with algorithms, and believe great engineering starts with
          great taste.
        </p>
      </section>

      {/* Project grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-6xl">
        {PROJECTS.map((p) => (
          <a
            key={p.id}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl bg-white border border-neutral-200 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              backdropFilter:
                hoveredId !== null && hoveredId !== p.id
                  ? 'blur(2px)'
                  : 'none',
              transition: 'transform 300ms, backdrop-filter 300ms',
            }}
          >
            {/* Image */}
            <div className="w-full aspect-[3/2] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="p-6">
              <h3
                className="text-[22px] md:text-[24px] text-black leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {p.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-3">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[12px] px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-neutral-600">
                {p.description}
              </p>
            </div>
          </a>
        ))}
      </section>
    </main>
  )
}
