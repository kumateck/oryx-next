"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import React from "react";
import StaffAndGenderRatioReportTable from "./table";
import DropdownBtns from "@/shared/btns/drop-btn";
import { useGetApiV1ReportStaffGenderRatioReportQuery } from "@/lib/redux/api/openapi.generated";
import PageWrapper from "@/components/layout/wrapper";
import LoadingTable from "../tableSkeleton";

function Index() {
  const { data, isLoading } = useGetApiV1ReportStaffGenderRatioReportQuery({});

  if (isLoading) {
    return <LoadingTable pagetitle="Staff Grade Ratio" />;
  }
  if (!data) {
    return (
      <PageWrapper className="flex w-full h-full text-center items-center justify-center">
        No data available
      </PageWrapper>
    );
  }
  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="Staff Grade Ratio" />
        <DropdownBtns
          variant="default"
          icon="Download"
          title="Export"
          menus={[]}
        />
      </div>

      <StaffAndGenderRatioReportTable data={data} />
    </ScrollablePageWrapper>
  );
}

export default Index;
