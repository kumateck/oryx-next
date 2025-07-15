"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import React from "react";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { ChartCards } from "./features/chartCard";
import { AttendanceCard } from "./features/attendaceCard";
import { EmployeeCard } from "./features/employeeCard";
import { ExitPassCard } from "./features/exitPassCard";
import { HrBarChart } from "./features/hrBarChart";

const FilterBtn = ["Today", "This Week", "This Month", "All Time"];

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
                <Button key={btn} variant="outline" className="text-sm p-2">
                  {btn}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid mt-8 grid-flow-row gap-4">
          <ChartCards />
          {/* <div className=" grid grid-cols-12 gap-4">
            <div className="text-white col-span-3 bg-red-200">
              some information
            </div>
            <div className="text-white col-span-3 bg-blue-300">
              some information
            </div>
            <div className="text-white col-span-3 bg-gray-600">
              some information
            </div>
            <div className="text-white col-span-3 bg-green-300">
              some information
            </div>
          </div> */}
          <div className=" grid grid-cols-12 gap-4 ">
            <AttendanceCard />
            <EmployeeCard />
            <div className=" col-span-3">
              <ExitPassCard />
            </div>
          </div>
        </div>
        {/* <Dashboard /> */}
        <HrBarChart />
      </ScrollablePageWrapper>
    </PageWrapper>
  );
}

export default Page;
