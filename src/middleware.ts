import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')
  const path = request.nextUrl.pathname;

  if (!cookie && path !== "/login") {
    return NextResponse.redirect(new URL('/login', request.url))
  } else if (cookie && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

   return NextResponse.next()
}
 
export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!api|_next/static|_next/image|images|icons|favicon.ico).*)',
    // '/((?!_next|.*\\..*).*)',
    // '/((?!api|_next|.*\\..*).*)',
  ]
}