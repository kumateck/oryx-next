"use client";

import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";

const Page = () => {
  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [loadRequests, { isLoading, data: response }] =
    useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery();
  useEffect(() => {
    loadRequests({
      page,
      pageSize,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);
  // const data = result?.data || [];
  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Stock Transfer Request" />
      </div>

      <ServerDatatable
        data={response?.data || []}
        columns={columns}
        isLoading={isLoading}
        setPage={setPage}
        setPageSize={setPageSize}
        meta={{
          pageIndex: response?.pageIndex as number,
          pageCount: response?.pageCount as number,
          totalRecordCount: response?.totalRecordCount as number,
          numberOfPagesToShow: response?.numberOfPagesToShow as number,
          startPageIndex: response?.startPageIndex as number,
          stopPageIndex: response?.stopPageIndex as number,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};

export default Page;
