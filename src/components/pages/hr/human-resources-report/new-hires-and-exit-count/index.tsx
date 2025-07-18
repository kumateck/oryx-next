import ScrollablePageWrapper from "@/shared/page-wrapper";
import React from "react";
import { Table } from "./table";
import PageTitle from "@/shared/title";
import DropdownBtns from "@/shared/btns/drop-btn";

function Index() {
  return (
    <ScrollablePageWrapper className="space-y-4">
      <div className="w-full flex items-center justify-between gap-4">
        <PageTitle title="New hires and exits count report" />
        <DropdownBtns
          variant="default"
          icon="Download"
          title="Export"
          menus={[]}
        />
      </div>

      <Table />
    </ScrollablePageWrapper>
  );
}

export default Index;
