// lib/cookies.ts
import { getCookie } from "cookies-next";

// helpers to get cookies
const getAuthCookie = async (name: string) => {
  const cookie = await getCookie(name);

  if (!cookie) return undefined;

  return Buffer.from(cookie as string, "base64").toString("ascii");
};

export const getValidAuthTokens = async () => {
  const token = await getAuthCookie("auth_token");

  const now = new Date();
  const tokenDate = new Date(token || 0);

  return {
    token: now < tokenDate ? token : undefined,
  };
};
