"use client";

import React from "react";

import { Icon } from "@/components/ui";
import { fullname } from "@/lib";
import { useGetApiV1UserAuthenticatedQuery } from "@/lib/redux/api/openapi.generated";
import BgWrapper from "@/shared/bg-wrapper";
import ScrollablePageWrapper from "@/shared/page-wrapper";

const Page = () => {
  const { data: user, isLoading } = useGetApiV1UserAuthenticatedQuery();

  return (
    <BgWrapper>
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-medium text-primary-inverted">
          Welcome{" "}
          {isLoading ? (
            <Icon name="LoaderCircle" className="animate-spin" />
          ) : (
            fullname(user?.firstName as string, user?.lastName as string)
          )}
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
