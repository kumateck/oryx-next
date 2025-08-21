"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
// import { Button, Icon } from "@/components/ui";
// import { routes } from "@/lib";
import { useLazyGetApiV1ProcurementInventoryQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useSelector } from "@/lib/redux/store";
import { columns } from "./columns";
import { useDebounce } from "@uidotdev/usehooks";

const Page = () => {
  const router = useRouter();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const searchValue = useSelector((state) => state.common.searchInput);
  const debounceValue = useDebounce(searchValue, 500);
  const triggerReload = useSelector((state) => state.common.triggerReload);

  const [loadPurchaseRequisitions, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1ProcurementInventoryQuery();

  useEffect(() => {
    loadPurchaseRequisitions({
      page,
      pageSize,
      searchQuery: debounceValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, debounceValue, triggerReload]);
  const data = result?.data || [];

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Purchase Requisitions Sourcing" />
        <div className="flex items-center justify-end gap-2"></div>
      </div>
      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        setPageSize={setPageSize}
        onRowClick={(row) =>
          router.push(`/extrals/purchase-requisition-sourcing/${row.id}`)
        }
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
