import Padlock from "@/assets/images/no-access.png";
import Image from "next/image";

const NoAccess = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-20 p-48">
        <div className="">
          <Image src={Padlock.src} alt="" className="h-50 w-50" />
          <h1 className="font-Bold text-3xl">Access Denied</h1>
          <p className="mt-5 text-sm">
            It seems like you dont have the required
          </p>
          <p className="text-sm"> permissions to view this content.</p>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
