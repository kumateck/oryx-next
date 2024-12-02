"use client";

import { Sidebar } from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full">
      <div className="w-full space-y-12 pl-2">
        <div className="font-Medium text-4xl">Settings</div>
        <div className="flex h-full gap-12 pb-24">
          <Sidebar />
          <div className="border-r-2 border-r-neutral-300"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
