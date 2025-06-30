"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import { ServerDatatable } from "@/shared/datatable";
import { useLazyGetApiV1ShiftSchedulesQuery } from "@/lib/redux/api/openapi.generated";
import { columns } from "./columns";

import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";

import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(30);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [page, setPage] = useState(1);

  const [loadSchedules, { isFetching, data: result, isLoading }] =
    useLazyGetApiV1ShiftSchedulesQuery();

  useEffect(() => {
    loadSchedules({
      page,
      pageSize,
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload]);
  const data = result?.data || [];

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 ">
          <PageTitle title={"Shift Schedule"} />
        </div>
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/plan-shift/${row.id}/calendar`);
        }}
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: result?.pageIndex as number,
          pageCount: result?.pageCount as number,
          totalRecordCount: result?.totalRecordCount as number,
          numberOfPagesToShow: result?.numberOfPagesToShow as number,
          startPageIndex: result?.startPageIndex as number,
          stopPageIndex: result?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};
export default Page;
