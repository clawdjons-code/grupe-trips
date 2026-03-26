import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect floridatrip2026
  if (pathname.startsWith('/floridatrip2026')) {
    const auth = request.cookies.get('trip-auth')?.value
    
    // Check if already authenticated
    if (auth === process.env.TRIP_PASSWORD) {
      return NextResponse.next()
    }

    // Check if submitting password
    if (request.method === 'POST') {
      // Handle in the page itself
      return NextResponse.next()
    }

    // Redirect to password page if not authenticated
    const loginUrl = new URL('/trip-login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/floridatrip2026/:path*']
}
