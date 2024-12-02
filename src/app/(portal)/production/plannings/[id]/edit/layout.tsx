import React from "react";

import ScrollablePageWrapper from "@/app/shared/page-wrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollablePageWrapper className="w-full space-y-4 pr-12">
      <div className="w-full space-y-4">
        <span className="text-xl font-semibold text-black">
          Product Planning
        </span>
      </div>
      {children}
    </ScrollablePageWrapper>
  );
};

export default Layout;
