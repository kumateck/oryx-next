"use client";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import { Sidebar } from "./sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageWrapper className="flex h-full w-full">
      <div className="w-full space-y-12 pl-2">
        <PageTitle title={"Settings"} />
        <div className="flex h-full gap-12 pb-24">
          <Sidebar />
          <div className="border-r-2 border-r-neutral-300"></div>
          {children}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Layout;
