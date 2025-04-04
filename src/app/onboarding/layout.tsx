import Image from "next/image";
import React from "react";

import LoginPageSideImage from "@/assets/images/auth/login.jpg";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full flex-col lg:grid lg:grid-cols-8">
      <div className="relative h-52 w-full lg:col-span-1 lg:h-full">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={LoginPageSideImage.src}
          alt="side image"
          width={1000}
          height={1000}
        />
      </div>
      <div className="flex flex-grow items-center justify-center bg-white px-4 lg:col-span-7">
        {children}
      </div>
    </section>
  );
}
