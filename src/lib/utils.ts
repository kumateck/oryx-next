import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_NAME } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPageTitle(pageName: string) {
  return `${APP_NAME} | ${pageName}`;
}