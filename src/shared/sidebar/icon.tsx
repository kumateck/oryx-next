// import { VeiliIcon, VeiliLogo } from "@/assets/logos";
import { useSidebar } from "@/components/ui/sidebar";

const SidebarIcon = () => {
  const { state } = useSidebar();

  return (
    <div className="">
      <div className="flex flex-col justify-center py-10 font-semibold">
        {/* {state === "collapsed" ? (
          <VeiliIcon />
        ) : (
          <span className="px-10">
            <VeiliLogo />
          </span>
        )} */}
        Oryx
      </div>
      <div
        className={`${
          state === "collapsed" ? "hidden" : "block"
        } text-secondary-500 -mt-7 mb-10 px-9 text-center text-xs`}
      ></div>
    </div>
  );
};

export default SidebarIcon;
