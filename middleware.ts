import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/confirm (email confirmation page)
     * - api/auth/confirm (email confirmation API endpoint)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|auth/confirm|api/auth/confirm|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}