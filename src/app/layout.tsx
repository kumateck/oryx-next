import type { Metadata } from "next";
import {
  // Krub as KrubSerif,
  Open_Sans,
  // Roboto,
  // Work_Sans,
} from "next/font/google";

import { cn } from "@/lib/utils";
import Providers from "@/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Oryx ERP",
  description: "Oryx ERP Develop by Kumateck Innovations LTD",
};

// const krubSerif = KrubSerif({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700"],
//   variable: "--krub-serif",
// });

// const roboto = Roboto({
//   weight: ["400", "700"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--roboto",
// });

// const workSans = Work_Sans({
//   weight: ["400", "700"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--work-sans",
// });
const openSans = Open_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--open-sans",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("h-screen w-full antialiased", openSans.variable)}>
        <div className="h-screen w-full">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
