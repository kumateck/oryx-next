"use client";

import React from "react";

import ScrollablePageWrapper from "@/shared/page-wrapper";

const Page = () => {
  return (
    <div className="h-full w-full bg-banner bg-cover bg-center bg-no-repeat px-10 py-12">
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-medium text-primary-inverted">
          Welcome Desmond Kofi Adusei
        </span>
        <span className="text-sm font-normal text-neutral-default">
          Work smarter with Oryx and skip the back and forth.
        </span>
      </div>
      <ScrollablePageWrapper>
        <div></div>
      </ScrollablePageWrapper>
    </div>
  );
};

export default Page;
