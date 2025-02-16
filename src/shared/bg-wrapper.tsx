// import Image from "next/image";
import React from "react";

// import bgImage from "@/assets/banner.png";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const BgWrapper = ({ children }: Props) => {
  return (
    <div className="h-full min-h-screen w-full bg-cover bg-center bg-no-repeat px-10 py-12">
      {/* <Image src={bgImage} alt="" className="h-full w-full" /> */}
      {children}
    </div>
  );
};

export default BgWrapper;
