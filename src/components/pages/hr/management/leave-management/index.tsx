"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import LeaveRequest from "./leave-request";

import { ServerDatatable } from "@/shared/datatable";
import {
  useGetApiV1LeaveRequestQuery,
  useLazyGetApiV1LeaveRequestQuery,
} from "@/lib/redux/api/openapi.generated";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { Button, Icon } from "@/components/ui";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } = useGetApiV1LeaveRequestQuery({
    page,
    pageSize,
  });
  const [loadLeaveTypes, { isFetching }] = useLazyGetApiV1LeaveRequestQuery();
  const router = useRouter();
  useEffect(() => {
    loadLeaveTypes({
      page,
      pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  const data = result?.data || [];

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && (
        <LeaveRequest onClose={() => setIsOpen(false)} isOpen={isOpen} />
      )}

      <div className="flex items-center justify-between py-2">
        <PageTitle title="Leave Management" />
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" /> Request Leave
          </Button>
        </div>
      </div>

      <ServerDatatable
        onRowClick={(row) => {
          router.push(`/hr/leave-management/${row.id}/details`);
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
