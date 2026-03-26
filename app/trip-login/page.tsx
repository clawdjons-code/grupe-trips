'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TripLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/trip-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (res.ok) {
      router.push('/floridatrip2026')
    } else {
      setError(true)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-2">🌴 Florida Trip 2026</h1>
        <p className="text-zinc-400 mb-8">Enter the password to continue</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400"
          />
          {error && <p className="text-red-400 text-sm">Wrong password</p>}
          <button
            type="submit"
            className="bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-100 transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}
