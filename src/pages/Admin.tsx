import { useState, type FormEvent, type ChangeEvent } from 'react'

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

  const [draft, setDraft] = useState<ProjectDraft>({
    title: '', stack: '', github: '', description: '', image: null,
  })
  const [deployed, setDeployed] = useState<ProjectDraft[]>([])
  const [successMsg, setSuccessMsg] = useState('')

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (email.trim() && password.trim()) {
      setAuthed(true)
      setLoginError('')
    } else {
      setLoginError('Please enter both email and password.')
    }
  }

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setDraft((p) => ({ ...p, image: reader.result as string }))
    reader.readAsDataURL(file)
  }

  const handleDeploy = (e: FormEvent) => {
    e.preventDefault()
    if (!draft.title.trim()) return
    setDeployed((prev) => [...prev, { ...draft }])
    setDraft({ title: '', stack: '', github: '', description: '', image: null })
    setSuccessMsg('Project deployed to Mainframe ✳︎')
    setTimeout(() => setSuccessMsg(''), 3500)
  }

  const inputCls = `w-full border border-neutral-200 rounded-xl px-4 py-3 text-[15px] text-black
                    bg-white outline-none transition-colors duration-200
                    placeholder:text-neutral-400
                    focus:border-black focus:ring-1 focus:ring-black/10`

  /* ════════════════════════════════════════════
     LOGIN SCREEN
     ════════════════════════════════════════════ */
  if (!authed) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-5 animate-fade-in">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-10">
            <span
              className="text-[28px] text-black tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mainframe®
            </span>
            <span className="text-[30px] ml-2 select-none" style={{ letterSpacing: '-0.02em' }}>✳︎</span>
            <p className="text-neutral-400 text-[14px] mt-2" style={{ fontFamily: 'var(--font-body)' }}>
              Private Access — Authenticate
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-7 sm:p-8"
          >
            <label className="block text-[12px] text-neutral-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`${inputCls} mb-5`}
              placeholder="you@mainframe.dev"
            />

            <label className="block text-[12px] text-neutral-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${inputCls} mb-2`}
              placeholder="••••••••"
            />

            {loginError && (
              <p className="text-red-500 text-[13px] mt-2 mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-5 py-3 rounded-xl bg-black text-white text-[15px] font-medium
                         hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 cursor-pointer"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Authenticate
            </button>
          </form>

          <p className="text-center text-neutral-400 text-[12px] mt-6" style={{ fontFamily: 'var(--font-body)' }}>
            Enter any email &amp; password to access the demo.
          </p>
        </div>
      </main>
    )
  }

  /* ════════════════════════════════════════════
     DASHBOARD
     ════════════════════════════════════════════ */
  return (
    <main className="min-h-screen bg-[#f5f5f5] pt-32 pb-20 px-5 sm:px-8 md:px-10 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1
              className="text-[36px] md:text-[44px] text-black leading-tight tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Content Management
            </h1>
            <p className="text-neutral-400 text-[14px] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
              Logged in as <span className="text-black">{email}</span>
            </p>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="px-4 py-2 rounded-full border border-neutral-200 text-[13px] text-black
                       hover:bg-black hover:text-white hover:border-black transition-all duration-200
                       cursor-pointer bg-transparent"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Logout
          </button>
        </div>

        {/* Success toast */}
        {successMsg && (
          <div className="mb-6 px-5 py-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-[14px] flex items-center gap-2" style={{ fontFamily: 'var(--font-body)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            {successMsg}
          </div>
        )}

        {/* Form card */}
        <form
          onSubmit={handleDeploy}
          className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 sm:p-8"
        >
          <h2
            className="text-[22px] text-black tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Add New Project
          </h2>

          <label className="block text-[12px] text-neutral-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
            Project Title
          </label>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
            required
            className={`${inputCls} mb-5`}
            placeholder="e.g. SortViz"
          />

          <label className="block text-[12px] text-neutral-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
            Tech Stack <span className="text-neutral-400 normal-case">(comma separated)</span>
          </label>
          <input
            type="text"
            value={draft.stack}
            onChange={(e) => setDraft((p) => ({ ...p, stack: e.target.value }))}
            className={`${inputCls} mb-5`}
            placeholder="React, TypeScript, Tailwind"
          />

          <label className="block text-[12px] text-neutral-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
            GitHub Link
          </label>
          <input
            type="url"
            value={draft.github}
            onChange={(e) => setDraft((p) => ({ ...p, github: e.target.value }))}
            className={`${inputCls} mb-5`}
            placeholder="https://github.com/…"
          />

          <label className="block text-[12px] text-neutral-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
            Description
          </label>
          <textarea
            value={draft.description}
            onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
            rows={4}
            className={`${inputCls} mb-5 resize-none`}
            placeholder="A brief overview of the project…"
          />

          <label className="block text-[12px] text-neutral-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>
            Upload Image
          </label>
          <label
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-neutral-300
                       text-[13px] text-neutral-500 cursor-pointer hover:border-black hover:text-black transition-colors mb-2"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            {draft.image ? '✓ Image selected' : 'Choose File'}
            <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </label>

          {draft.image && (
            <div className="mt-3 mb-4">
              <img src={draft.image} alt="Preview" className="w-full max-h-48 object-cover rounded-xl border border-neutral-200" />
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3.5 rounded-xl bg-black text-white text-[15px] font-medium
                       hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 cursor-pointer"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Deploy to Mainframe
          </button>
        </form>

        {/* Deployed projects list */}
        {deployed.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[24px] text-black tracking-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
              Deployed Projects
            </h2>
            <div className="space-y-4">
              {deployed.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-neutral-200/80 p-5 flex gap-5 items-start"
                >
                  {p.image && (
                    <img src={p.image} alt={p.title} className="w-20 h-20 rounded-lg object-cover border border-neutral-200 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-[17px] text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                      {p.title}
                    </h3>
                    {p.stack && <p className="text-[12px] text-neutral-400 mt-1">{p.stack}</p>}
                    {p.description && <p className="text-[13px] text-neutral-600 mt-2 leading-relaxed">{p.description}</p>}
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
