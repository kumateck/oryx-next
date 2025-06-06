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

const Page = () => {
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);

  //   const [pageSize, setPageSize] = useState(30);
  //   const [page, setPage] = useState(1);

  const [loadAttendanceReportSummary, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1AttendanceRecordsGeneralSummaryQuery();

  useEffect(() => {
    loadAttendanceReportSummary({ date: new Date().toISOString() });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // page
    // , pageSize,
    triggerReload,
  ]);

  const data = result ?? [];

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Attendance Report Summary" />
      </div>
      <ClientDatatable
        data={Array.isArray(data) ? data : []}
        columns={columns}
        isLoading={isLoading || isFetching}
        // setPage={setPage}
        // setPageSize={setPageSize}
        // meta={{
        //   pageIndex: result?.pageIndex as number,
        //   pageCount: result?.pageCount as number,
        //   totalRecordCount: result?.totalRecordCount as number,
        //   numberOfPagesToShow: result?.numberOfPagesToShow as number,
        //   startPageIndex: result?.startPageIndex as number,
        //   stopPageIndex: result?.stopPageIndex as number,
        //   pageSize,
        // }}
      />
    </PageWrapper>
  );
};
export default Page;
