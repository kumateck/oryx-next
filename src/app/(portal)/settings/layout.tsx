"use client";

import PageWrapper from "@/components/layout/wrapper";
// import PageTitle from "@/shared/title";

// import { Sidebar } from "./sidebar";
import NoAccess from "@/shared/no-access";
import { PermissionKeys } from "@/lib";
import { useUserPermissions } from "@/hooks/use-permission";

const Layout = ({ children }: { children: React.ReactNode }) => {
  //Check Permision
  const { hasPermissionAccess } = useUserPermissions();
  // check permissions access
  const hasAccess = hasPermissionAccess(
    PermissionKeys.settings.viewSystemSettings,
  );
  if (!hasAccess) {
    //redirect to no access
    return <NoAccess />;
  }
  //continure with settings
  return (
    <PageWrapper className="flex h-full w-full">
      <div className="w-full space-y-12 pl-2">
        {/* <PageTitle title={"Settingseee"} /> */}
        <div className="flex h-full gap-12 pb-24">
          {/* <Sidebar /> */}
          {children}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Layout;
