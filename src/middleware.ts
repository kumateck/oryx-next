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
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ORYX_ERP_COOKIE_ID, routes } from "./lib/constants";

const unProtectedPages = [routes.signin()];

const isProtectedPage = (pathname: string) =>
  unProtectedPages.filter((page) => pathname.startsWith(page)).length === 0;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const redirecTo = request.nextUrl.href;
  // const cookie = cookies();
  // console.log(cookie.toString(), "cookie");
  const isLoggedIn = request.cookies.has(ORYX_ERP_COOKIE_ID);

  //todo: @alfreddohnani improvement
  //todo: if client cookie exists use it cookie to set http-only cookie
  //todo: then delete the client cookie
  //todo: if server cookie exists, isLoggedIn else redirect

  if (!isProtectedPage(pathname) && !isLoggedIn) {
    return NextResponse.redirect(
      new URL(`${routes.signin()}?redirectTo=${redirecTo}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)"],
};
