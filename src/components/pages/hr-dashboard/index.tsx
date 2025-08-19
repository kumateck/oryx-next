"use client";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import React, { useEffect } from "react";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { ChartCards } from "./features/chartCard";
import { AttendanceCard } from "./features/attendaceCard";
import { EmployeeCard } from "./features/employeeCard";
import { ExitPassCard } from "./features/exitPassCard";
import { HrBarChart } from "./features/hrBarChart";
import { useLazyGetApiV1ReportHumanResourceQuery } from "@/lib/redux/api/openapi.generated";

const FilterBtn = ["Today", "This Week", "This Month", "All Time"];

function Page() {
  const [loadReport, { data }] = useLazyGetApiV1ReportHumanResourceQuery({});
  useEffect(() => {
    loadReport({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
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
              <Button key={btn} variant="outline" className="text-sm p-2">
                {btn}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid mt-8 grid-flow-row gap-4">
        <ChartCards data={data ?? {}} />
        <div className="grid grid-cols-12 gap-4 mt-4">
          <AttendanceCard data={data ?? {}} />
          <EmployeeCard data={data ?? {}} />
          <div className="col-span-12 lg:col-span-3">
            <ExitPassCard data={data ?? {}} />
          </div>
        </div>
        <HrBarChart data={data ?? {}} />
      </div>
    </ScrollablePageWrapper>
  );
}

export default Page;
