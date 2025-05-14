import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ORYX_ERP_COOKIE_ID, routes } from "./lib/constants";

// Define all public routes that don't need authentication
const publicRoutes = [
  routes.signin(),
  routes.forgotPassword(),
  routes.resetPassword(),
  routes.setPassword(),
  routes.onboarding(),
  "/api/public",
  "/_next",
  "/static",
  "/favicon.ico",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDesktop = request.headers.get("user-agent")?.includes("Tauri");

  const isPublicRoute = publicRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route,
  );

  const clientCookie = request.cookies.get(ORYX_ERP_COOKIE_ID);
  // const permissionCookie = request.cookies.get(USER_PERMISSIONS_COOKIE_ID);
  // const checkAllCookies = request.cookies.getAll()
  // console.log(checkAllCookies, "permissionCookie");
  const isLoggedIn = !!clientCookie;

  if (isPublicRoute && isLoggedIn && pathname === routes.signin()) {
    return NextResponse.redirect(new URL(routes.home(), request.url));
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    if (isDesktop) {
      const redirectUrl = new URL(routes.signin(), request.url);
      redirectUrl.searchParams.set("desktop", "true");
      return NextResponse.redirect(redirectUrl);
    }

    const redirectUrl = new URL(routes.signin(), request.url);
    redirectUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - public APIs that don't require auth
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/public).*)",
  ],
};
