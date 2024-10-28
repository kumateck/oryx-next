import Image from "next/image";

import large from "@/app/assets/oryx_logo.png";
import tiny from "@/app/assets/tiny.png";

import { useSidebar } from "./ui/sidebar";

const SideLogo = () => {
  const { state } = useSidebar();

  return (
    <div className="">
      <Image src={state === "collapsed" ? tiny.src : large.src} alt="logo" />
    </div>
  );
};

export default SideLogo;
