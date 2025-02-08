// import Link from "next/link";
import React from "react";

import PageWrapper from "@/components/layout/wrapper";
// import { routes } from "@/lib";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollablePageWrapper className="w-full">
      <PageWrapper>
        <div className="pb-3">
          <PageTitle title={"Product Planning"} />
        </div>
        {children}
      </PageWrapper>
    </ScrollablePageWrapper>
  );
};

export default Layout;
