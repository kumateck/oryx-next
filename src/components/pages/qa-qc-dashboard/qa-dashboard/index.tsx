"use client";
import { Button, Icon } from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import React, { useEffect } from "react";
import { FilterBtn } from "../types";
import { DashboardCard } from "./features/card";
import { useLazyGetApiV1ReportQaDashboardQuery } from "@/lib/redux/api/openapi.generated";

function Index() {
  const [loadReport, { data, isLoading }] =
    useLazyGetApiV1ReportQaDashboardQuery({});

  useEffect(() => {
    loadReport({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("data", data, isLoading);
  return (
    <ScrollablePageWrapper className="space-y-4">
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
              <Button key={btn} variant="outline" className="text-sm p-2">
                {btn}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <DashboardCard data={data ?? {}} />
    </ScrollablePageWrapper>
  );
}

export default Index;
