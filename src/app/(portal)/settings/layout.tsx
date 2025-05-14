"use client";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import { Sidebar } from "./sidebar";
import NoAccess from "@/shared/no-access";
import { findRecordWithAccess, PermissionKeys, Section } from "@/lib";
import { useSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccess = findRecordWithAccess(
    permissions,
    PermissionKeys.settings.viewSystemSettings,
  );
  if (isClient && !hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  //continure with settings
  return (
    <PageWrapper className="flex h-full w-full">
      <div className="w-full space-y-12 pl-2">
        <PageTitle title={"Settingseee"} />
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
