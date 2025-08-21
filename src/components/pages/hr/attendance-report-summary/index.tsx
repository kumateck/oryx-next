"use client";

import { useEffect } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1AttendanceRecordsGeneralSummaryQuery } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";

import { columns } from "./columns";
import { Button, Icon } from "@/components/ui";
import Link from "next/link";

const Page = () => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadAttendanceReportSummary, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1AttendanceRecordsGeneralSummaryQuery();

  useEffect(() => {
    loadAttendanceReportSummary({});
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerReload]);

  const data = result ?? [];

  console.log("Attendance Report Summary Data:", data);

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Attendance Report Summary" />
        <Button asChild>
          <Link href="/hr/attendance-report-upload">
            <Icon name="Upload" />
            <span>Upload Attendance Report</span>
          </Link>
        </Button>
      </div>
      <ClientDatatable
        data={Array.isArray(data) ? data : []}
        columns={columns}
        isLoading={isLoading || isFetching}
      />
    </PageWrapper>
  );
};
export default Page;
