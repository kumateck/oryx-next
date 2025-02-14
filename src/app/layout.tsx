import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import Providers from "@/providers";

import "./globals.css";

const openSans = Open_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--open-sans",
});

export const metadata: Metadata = {
  title: "Oryx ERP",
  description: "Oryx ERP Develop by Kumateck Innovations LTD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("h-screen w-full antialiased", openSans.variable)}

        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-screen w-full">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
