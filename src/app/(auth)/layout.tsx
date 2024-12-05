import Image from "next/image";
import React from "react";

import LoginPageSideImage from "@/app/assets/images/auth/login.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full flex-col lg:grid lg:grid-cols-3">
      <div className="relative h-52 w-full lg:col-span-2 lg:h-full">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={LoginPageSideImage.src}
          alt="side image"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex items-center justify-center bg-white">
        {children}
      </div>
    </section>
  );
}
