// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { routes } from "./routes";
// const unProtectedPages = [
//   routes.login(),
//   routes.signup(),
//   routes.resetPassword(),
//   "/otp",
// ];
// const isProtectedPage = (pathname: string) =>
//   unProtectedPages.filter((page) => pathname.startsWith(page)).length === 0;
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const redirecTo = request.nextUrl.href;
//   //   const isLoggedIn = request.cookies.has(APPLICATION_PORTAL_COOKIE_ID);
//   //todo: @alfreddohnani improvement
//   //todo: if client cookie exists use it cookie to set http-only cookie
//   //todo: then delete the client cookie
//   //todo: if server cookie exists, isLoggedIn else redirect
//   // if (isProtectedPage(pathname) && !isLoggedIn) {
//   //   return NextResponse.redirect(
//   //     new URL(`${routes.login()}?redirectTo=${redirecTo}`, request.url),
//   //   );
//   // }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/((?!_next|api/auth).*)"],
// };
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { ORYX_ERP_COOKIE_ID, routes } from "./lib/constants";
// const unProtectedPages = [routes.signin()];
// const isProtectedPage = (pathname: string) =>
//   unProtectedPages.filter((page) => pathname.startsWith(page)).length === 0;
// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const redirecTo = request.nextUrl.href;
//   // const cookie = cookies();
//   // console.log(cookie.toString(), "cookie");
//   const isLoggedIn = request.cookies.has(ORYX_ERP_COOKIE_ID);
//   //todo: @alfreddohnani improvement
//   //todo: if client cookie exists use it cookie to set http-only cookie
//   //todo: then delete the client cookie
//   //todo: if server cookie exists, isLoggedIn else redirect
//   if (isProtectedPage(pathname) && !isLoggedIn) {
//     return NextResponse.redirect(
//       new URL(`${routes.signin()}?redirectTo=${redirecTo}`, request.url),
//     );
//   }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/((?!_next|api/auth).*)"],
// };
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { ORYX_ERP_COOKIE_ID, routes } from "./lib/constants";
// const unProtectedPages = [routes.signin()];
// const isProtectedPage = (pathname: string) =>
//   unProtectedPages.filter((page) => pathname.startsWith(page)).length === 0;
// export function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname; // Use relative path only
//   const isLoggedIn = request.cookies.has(ORYX_ERP_COOKIE_ID);
//   if (isProtectedPage(pathname) && !isLoggedIn) {
//     return NextResponse.redirect(
//       new URL(
//         `${routes.signin()}?redirectTo=${encodeURIComponent(pathname)}`,
//         request.url,
//       ),
//     );
//   }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/((?!_next|api/auth).*)"],
// };
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
