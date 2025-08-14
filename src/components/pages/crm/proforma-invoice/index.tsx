"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useLazyGetApiV1ProductionOrdersProformaInvoicesQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { columns } from "./columns";

function Index() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const debouncedValue = useDebounce(searchValue, 500);

  const [loadProFormalInvoice, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1ProductionOrdersProformaInvoicesQuery();

  useEffect(() => {
    loadProFormalInvoice({ page, pageSize });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload, debouncedValue]);
  return (
    <PageWrapper className="space-y-4">
      <PageTitle title="Profoma Invoices" />
      <ServerDatatable
        columns={columns}
        data={result?.data ?? []}
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

export default Index;
