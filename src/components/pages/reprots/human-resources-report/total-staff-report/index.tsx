"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import React, { useRef } from "react";
import StaffTotalReport from "./table";
import DropdownBtns from "@/shared/btns/drop-btn";
import { useGetApiV1ReportStaffTotalReportQuery } from "@/lib/redux/api/openapi.generated";
import LoadingTable from "../tableSkeleton";
import { useReactToPrint } from "react-to-print";

function Index() {
  const { data, isLoading } = useGetApiV1ReportStaffTotalReportQuery({});

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Quotation`,
    pageStyle: `
        @media print {
            html, body {
              font-size: 12px;
            }
          }
          @page {
            margin: 2mm 15mm;
          }`,
  });
  if (isLoading) {
    return <LoadingTable pagetitle="Staff Total Report" />;
  }
  if (!data) {
    return (
      <ScrollablePageWrapper className="flex w-full h-full text-center items-center justify-center">
        No data available
      </ScrollablePageWrapper>
    );
  }
  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="Staff Total Report" />
        <DropdownBtns
          variant="default"
          icon="Download"
          title="Export"
          menus={[
            {
              name: "PDF File",
              onClick: handlePrint,
            },
          ]}
        />
      </div>
      <StaffTotalReport data={data} />
    </ScrollablePageWrapper>
  );
}

export default Index;
