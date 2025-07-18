"use client";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import React from "react";
import StaffTotalReport from "./table";
import DropdownBtns from "@/shared/btns/drop-btn";

function Index() {
  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="Staff Total Report" />
        <DropdownBtns
          variant="default"
          icon="Download"
          title="Export"
          menus={[]}
        />
      </div>
      <StaffTotalReport />
    </ScrollablePageWrapper>
  );
}

export default Index;
