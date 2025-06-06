"use client";

import { useEffect } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1AttendanceRecordsDailySummaryQuery } from "@/lib/redux/api/openapi.generated";
import { ClientDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import { columns } from "./columns";
import { useParams } from "next/navigation";
import { format } from "date-fns";

const Page = () => {
  const { departmentName } = useParams();
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);

  //   const [pageSize, setPageSize] = useState(30);
  //   const [page, setPage] = useState(1);

  const [loadAttendanceReportSummary, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1AttendanceRecordsDailySummaryQuery();

  useEffect(() => {
    loadAttendanceReportSummary({
      date: new Date().toISOString(),
      departmentName: departmentName as string,
    });
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
      <div className="flex flex-col py-2">
        <PageTitle title={`Attendance Report - ${departmentName}`} />
        <span className="text-gray-600">
          {format(new Date(), "MMM dd, yyyy")}
        </span>
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
