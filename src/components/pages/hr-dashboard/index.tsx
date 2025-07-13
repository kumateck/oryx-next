"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import React from "react";
import Dashboard, { FilterBtn } from "./layout";
import ScrollablePageWrapper from "@/shared/page-wrapper";

function Page() {
  return (
    <PageWrapper>
      <ScrollablePageWrapper>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="">
            <PageTitle title="HR Dashboard" />
            <div className="flex items-center gap-2 justify-start">
              <Icon
                name="RefreshCw"
                size={"14"}
                className="text-primary-default font-bold"
              />
              <span className="text-sm text-gray-700">
                Last refreshed, 30 minutes ago
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {FilterBtn.map((btn) => (
                <Button key={btn} variant="outline">
                  {btn}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Dashboard />
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;
