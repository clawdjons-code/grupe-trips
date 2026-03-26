import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correct = process.env.TRIP_PASSWORD || 'florida2026'
  
  if (password === correct) {
    const response = NextResponse.json({ ok: true })
    response.cookies.set('trip-auth', correct, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })
    return response
  }
  
  return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
}
