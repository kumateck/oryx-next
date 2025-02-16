"use client";

import React from "react";

import BgWrapper from "@/shared/bg-wrapper";
import ScrollablePageWrapper from "@/shared/page-wrapper";

const Page = () => {
  return (
    <BgWrapper>
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
    </BgWrapper>
  );
};

export default Page;
