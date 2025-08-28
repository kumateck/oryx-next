"use client";
import PageWrapper from "@/components/layout/wrapper";

import { useLazyGetApiV1ProductionScheduleAllocateProductsQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { commonActions } from "@/lib/redux/slices/common";
// import { useRouter } from "next/navigation";
import { columns } from "./columns";

function Page() {
  const [page, setPage] = useState(1);

  // const [createInvoiceOpen, setCreateInvoiceOpen] = useState(false);
  const [pageSize, setPageSize] = useState(30);

  const dispatch = useDispatch();
  //   const router = useRouter();
  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const debouncedValue = useDebounce(searchValue, 500);

  const [loadProductionOrders, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1ProductionScheduleAllocateProductsQuery();

  useEffect(() => {
    loadProductionOrders({ page, pageSize });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload, debouncedValue]);

  return (
    <PageWrapper className="space-y-4">
      <div className="flex items-center w-full justify-between gap-3">
        <PageTitle title="Order Allocations" />
      </div>
      <ServerDatatable
        columns={columns}
        data={result?.data ?? []}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        // onRowClick={(row) => router.push(`/crm/allocations/${row.id}`)}
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
