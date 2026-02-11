import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./constants/routes";

/**
 * Next.js 16+ Proxy (formerly Middleware)
 * Used for routing, rewrites, and redirects.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!accessToken;

  console.log(
    `[Proxy] ${request.method} ${pathname} - Auth: ${isAuthenticated}`,
  );

  // 1. Protect Platform & Onboarding Routes
  // If not authenticated, redirect to login
  const isProtectedRoute =
    pathname.startsWith(ROUTES.PLATFORM.DASHBOARD) ||
    pathname.startsWith(ROUTES.ONBOARDING.ROOT) ||
    pathname.includes("settings") ||
    pathname.includes("appointments");

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
    // Store the intended destination to redirect back after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Prevent Authenticated Users from reaching Auth Pages
  // If already logged in, redirect to dashboard
  const isAuthRoute =
    pathname.startsWith(ROUTES.AUTH.LOGIN) ||
    pathname.startsWith(ROUTES.AUTH.SIGNUP);

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(
      new URL(ROUTES.PLATFORM.DASHBOARD, request.url),
    );
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
