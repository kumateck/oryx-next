// No access UI updated
// Path: Src > Shared > no-access.tsx

import Image from "next/image";

const NoAccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        {/* Image from next-images*/}
        <Image
          src="/icons/Lock-Icon.svg"
          alt="Access Denied"
          width={150}
          height={150}
          className="mx-auto mb-3"
        />
        <h1 className="font-medium text-3xl mb-2">Access Denied</h1>
        <p className="text-sm mb-1 font-light  text-gray-400">
          Sorry, you do not have permission to view this page
        </p>
        <p className="text-sm mt-2 font-light text-gray-400">
          Kindly navigate to a previous or different page
        </p>
      </div>
    </div>
  );
};

export default NoAccess;
