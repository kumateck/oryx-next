import tiny from "@/app/assets/tiny.png"
import large from "@/app/assets/oryx_logo.png"
import { useSidebar } from "./ui/sidebar";

const SideLogo = () => {
  const { isMobile,state } = useSidebar()

  return (
    <div className="">
      <img src={state === "collapsed" ? tiny.src : large.src} alt="logo" />
    </div>
  );
};

export default SideLogo;
