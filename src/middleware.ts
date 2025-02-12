import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const ctx = request.cookies.get("ctx");
  const access = request.cookies.get("access");
  const path = request.nextUrl.pathname;

  // Check if both token and ctx exist when accessing non-login pages
  if ((!token || !ctx) && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && ctx && path === "/login") {
    if (ctx?.value === "web_edit") {
      return NextResponse.redirect(new URL("/home-web", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Existing access level check
  const restrictedPaths = ["/settings", "/admin", "notification"];
  if (access && access.value !== "1" && restrictedPaths.includes(path)) {
    if (ctx?.value === "web_edit") {
      return NextResponse.redirect(new URL("/home-web", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|icons|favicon.ico).*)"],
};
