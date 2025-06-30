"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import PageTitle from "@/shared/title";
import React, { useState, useEffect } from "react";
import { Create } from "./create";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import {
  HolidayDto,
  useLazyGetApiV1HolidaysQuery,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ServerDatatable } from "@/shared/datatable";
import { columns } from "./columns";
import { AuditModules } from "@/lib";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const searchValue = useSelector((state) => state.common.searchInput);

  const [loadHolidays, { isLoading, data: result, isFetching }] =
    useLazyGetApiV1HolidaysQuery();

  useEffect(() => {
    loadHolidays({
      module: AuditModules.settings.name,
      subModule: AuditModules.settings.holidays,
      searchQuery: searchValue ?? "",
    });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload]);
  const data = (result as HolidayDto[]) || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      {isOpen && <Create isOpen={isOpen} onClose={() => setIsOpen(false)} />}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2 ">
          <Icon
            name="ArrowLeft"
            className="h-5 w-5 text-black hover:cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />

          <PageTitle title={"Holidays"} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="default" size={"sm"} onClick={() => setIsOpen(true)}>
            <Icon name="Plus" className="h-4 w-4" /> <span>Add Holiday</span>
          </Button>
        </div>
      </div>

      {/* reder data table here */}
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
}

export default Page;
