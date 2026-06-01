import { useState, type FormEvent } from 'react'

interface ProjectDraft {
  title: string
  stack: string
  github: string
  description: string
  image: string | null
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  /* Dashboard state */
  const [draft, setDraft] = useState<ProjectDraft>({
    title: '',
    stack: '',
    github: '',
    description: '',
    image: null,
  })
  const [deployed, setDeployed] = useState<ProjectDraft[]>([])
  const [successMsg, setSuccessMsg] = useState('')

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    // Simple mock auth
    if (email === 'raunakrai572@gmail.com' && password === 'mainframe') {
      setAuthed(true)
      setLoginError('')
    } else {
      setLoginError('Invalid credentials. Try again.')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setDraft((prev) => ({ ...prev, image: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleDeploy = (e: FormEvent) => {
    e.preventDefault()
    if (!draft.title.trim()) return
    setDeployed((prev) => [...prev, { ...draft }])
    setDraft({ title: '', stack: '', github: '', description: '', image: null })
    setSuccessMsg('Project deployed to Mainframe ✳︎')
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  /* ── Login screen ── */
  if (!authed) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-5">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-2xl border border-neutral-200 p-8"
        >
          <h2
            className="text-[28px] text-black mb-1"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Admin
          </h2>
          <p className="text-neutral-500 text-[14px] mb-8">
            Authenticate to access Mainframe CMS.
          </p>

          <label className="block text-[13px] text-neutral-500 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors mb-4"
            placeholder="you@example.com"
          />

          <label className="block text-[13px] text-neutral-500 mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors mb-6"
            placeholder="••••••••"
          />

          {loginError && (
            <p className="text-red-500 text-[13px] mb-4">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black text-white text-[15px] hover:bg-neutral-800 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Authenticate
          </button>
        </form>
      </main>
    )
  }

  /* ── Dashboard ── */
  return (
    <main className="min-h-screen bg-[#f5f5f5] pt-32 pb-20 px-5 sm:px-8 md:px-10">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-[36px] md:text-[44px] text-black leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Content Management
        </h1>
        <p className="text-neutral-500 text-[15px] mt-2 mb-10">
          Add new projects to the Mainframe portfolio.
        </p>

        {/* Success toast */}
        {successMsg && (
          <div className="mb-6 px-5 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-[14px]">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleDeploy}
          className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8"
        >
          {/* Title */}
          <label className="block text-[13px] text-neutral-500 mb-1.5">
            Project Title
          </label>
          <input
            type="text"
            value={draft.title}
            onChange={(e) =>
              setDraft((p) => ({ ...p, title: e.target.value }))
            }
            required
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors mb-5"
            placeholder="e.g. SortViz"
          />

          {/* Stack */}
          <label className="block text-[13px] text-neutral-500 mb-1.5">
            Tech Stack{' '}
            <span className="text-neutral-400">(comma separated)</span>
          </label>
          <input
            type="text"
            value={draft.stack}
            onChange={(e) =>
              setDraft((p) => ({ ...p, stack: e.target.value }))
            }
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors mb-5"
            placeholder="React, TypeScript, Tailwind"
          />

          {/* GitHub */}
          <label className="block text-[13px] text-neutral-500 mb-1.5">
            GitHub Link
          </label>
          <input
            type="url"
            value={draft.github}
            onChange={(e) =>
              setDraft((p) => ({ ...p, github: e.target.value }))
            }
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors mb-5"
            placeholder="https://github.com/…"
          />

          {/* Description */}
          <label className="block text-[13px] text-neutral-500 mb-1.5">
            Description
          </label>
          <textarea
            value={draft.description}
            onChange={(e) =>
              setDraft((p) => ({ ...p, description: e.target.value }))
            }
            rows={4}
            className="w-full border border-neutral-300 rounded-lg px-4 py-2.5 text-[15px] text-black outline-none focus:border-black transition-colors mb-5 resize-none"
            placeholder="A brief overview of the project…"
          />

          {/* Image upload */}
          <label className="block text-[13px] text-neutral-500 mb-1.5">
            Project Image
          </label>
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-neutral-300 text-[14px] text-neutral-500 cursor-pointer hover:border-black hover:text-black transition-colors mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {draft.image ? 'Image selected' : 'Upload Image'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {draft.image && (
            <div className="mb-6">
              <img
                src={draft.image}
                alt="Preview"
                className="w-full max-h-48 object-cover rounded-lg border border-neutral-200"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black text-white text-[15px] hover:bg-neutral-800 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Deploy to Mainframe
          </button>
        </form>

        {/* Deployed projects list */}
        {deployed.length > 0 && (
          <section className="mt-12">
            <h2
              className="text-[24px] text-black mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Deployed Projects
            </h2>
            <div className="space-y-4">
              {deployed.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-neutral-200 p-5 flex gap-5 items-start"
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-20 h-20 rounded-lg object-cover border border-neutral-200 shrink-0"
                    />
                  )}
                  <div>
                    <h3
                      className="text-[17px] text-black"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {p.title}
                    </h3>
                    {p.stack && (
                      <p className="text-[12px] text-neutral-500 mt-1">
                        {p.stack}
                      </p>
                    )}
                    {p.description && (
                      <p className="text-[13px] text-neutral-600 mt-2 line-clamp-2">
                        {p.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
