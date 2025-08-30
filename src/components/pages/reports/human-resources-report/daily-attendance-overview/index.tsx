"use client";
import { Button, Icon } from "@/components/ui";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DropdownBtns from "@/shared/btns/drop-btn";
import { DailyAttendanceOverview } from "./table";

function Index() {
  const [open, setOpen] = useState(false);
  console.log(open, "Open form attendance report page");
  const router = useRouter();
  return (
    <ScrollablePageWrapper className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            onClick={() => router.back()}
            name="ArrowLeft"
            className="cursor-pointer"
          />
          <PageTitle title="Daily Attendance Overview" />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpen(true)}>Filter</Button>
          <DropdownBtns
            variant="default"
            icon="Download"
            title="Export"
            menus={[]}
          />
        </div>
      </div>

      <DailyAttendanceOverview />
    </ScrollablePageWrapper>
  );
}

export default Index;
