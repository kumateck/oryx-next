import type { Metadata } from "next";
import { Krub as KrubSerif } from "next/font/google";

import { cn } from "@/lib/utils";
import Providers from "@/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Oryx ERP",
  description: "Oryx ERP Develop by Kumateck Innovations LTD",
};

const krubSerif = KrubSerif({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--krub-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-screen w-full antialiased", krubSerif.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
