import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Did I Make That?',
  description: 'Over-Built. Under-Planned.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
          Why Did I<br />Make That?
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl mb-10 font-light">
          Over-Built. Under-Planned.
        </p>
        <a
          href="https://www.youtube.com/@WhyDidIMakeThat"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-full text-lg hover:bg-zinc-100 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Watch on YouTube
        </a>
      </div>

      {/* Subtle footer link */}
      <div className="absolute bottom-8 text-zinc-600 text-sm">
        <Link href="/floridatrip2026" className="hover:text-zinc-400 transition-colors">
          Florida Trip 2026 →
        </Link>
      </div>
    </main>
  )
}
