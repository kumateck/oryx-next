"use client";

import { Cookies } from "next-client-cookies";

import { APP_CONTEXT, COOKIE_ID } from "./constants";

export function persistToken(
  cookies: Cookies,
  accessToken: string,
  expiresIn: number,
  appContext: APP_CONTEXT,
) {
  cookies.set(`${appContext}-${COOKIE_ID}`, accessToken, {
    expires: expiresIn, //new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
}

export function removeToken(cookies: Cookies, appContext: APP_CONTEXT) {
  cookies.remove(`${appContext}-${COOKIE_ID}`);
}
