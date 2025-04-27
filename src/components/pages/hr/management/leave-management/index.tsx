"use client";

import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import PageTitle from "@/shared/title";

import DropdownBtns from "@/shared/btns/drop-btn";
import AbsenceRequest from "./absence-request";
import LeaveRequest from "./leave-request";
import ExitPassRequest from "./exit-pass-request";
import { ServerDatatable } from "@/shared/datatable";
import {
  useGetApiV1LeaveRequestQuery,
  useLazyGetApiV1LeaveRequestQuery,
} from "@/lib/redux/api/openapi.generated";
import { columns } from "./columns";

const Page = () => {
  const [isAbsenceOpen, setIsAbsenceOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const { data: result, isLoading } = useGetApiV1LeaveRequestQuery({
    page,
    pageSize,
  });
  const [loadLeaveTypes, { isFetching }] = useLazyGetApiV1LeaveRequestQuery();

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
      {isAbsenceOpen && (
        <AbsenceRequest
          onClose={() => setIsAbsenceOpen(false)}
          isOpen={isAbsenceOpen}
        />
      )}
      {isLeaveOpen && (
        <LeaveRequest
          onClose={() => setIsLeaveOpen(false)}
          isOpen={isLeaveOpen}
        />
      )}

      {isExitOpen && (
        <ExitPassRequest
          onClose={() => setIsExitOpen(false)}
          isOpen={isExitOpen}
        />
      )}
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Leave Management" />
        <div className="flex items-center justify-end gap-2">
          <DropdownBtns
            title="Request"
            icon="Plus"
            menus={[
              {
                name: "Leave Request",
                onClick: () => setIsLeaveOpen(true),
              },
              {
                name: "Absence Request",
                onClick: () => setIsAbsenceOpen(true),
              },
              {
                name: "Exit Request",
                onClick: () => setIsExitOpen(true),
              },
            ]}
          />
        </div>
      </div>

      <ServerDatatable
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
