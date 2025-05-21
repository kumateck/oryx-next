"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import { ServerDatatable } from "@/shared/datatable";
import {
  useLazyGetApiV1ShiftSchedulesQuery,
  useGetApiV1ShiftSchedulesQuery,
} from "@/lib/redux/api/openapi.generated";
import { columns } from "./columns";
// import { useRouter } from "next/navigation";
import { Button, Icon } from "@/components/ui";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { commonActions } from "@/lib/redux/slices/common";
import Create from "./create";

const Page = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } = useGetApiV1ShiftSchedulesQuery({
    page,
    pageSize,
  });
  const [loadLeaveTypes, { isFetching }] = useLazyGetApiV1ShiftSchedulesQuery();
  // const router = useRouter();
  useEffect(() => {
    loadLeaveTypes({
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
      {isOpen && <Create onClose={() => setIsOpen(false)} isOpen={isOpen} />}

      <div className="flex items-center justify-between py-2">
        <PageTitle title="Shift Schedule" />
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" /> Add Shift Schedule
          </Button>
        </div>
      </div>

      <ServerDatatable
        // onRowClick={(row) => {
        //   router.push(`/hr/leave-management/${row.id}/details`);
        // }}
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
