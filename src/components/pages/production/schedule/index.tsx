"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ServerDatatable } from "@/app/shared/datatable";
import { Button, Icon } from "@/components/ui";
import { routes } from "@/lib/constants";
import { useLazyGetApiV1ProductionScheduleSchedulesQuery } from "@/lib/redux/api/openapi.generated";

import { columns } from "./columns";

const Page = () => {
  const router = useRouter();
  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1ProductionScheduleSchedulesQuery();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadData({
      page,
      pageSize,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  const data = result?.data || [];
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2">
        <span className="text-3xl font-bold text-secondary-500">Schedules</span>
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="default"
            size={"sm"}
            onClick={() => router.push(routes.newSchedule())}
          >
            <Icon name="Plus" className="h-4 w-4" /> <span>Create</span>
          </Button>
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
    </div>
  );
};

export default Page;
