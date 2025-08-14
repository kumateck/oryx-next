"use client";
import PageWrapper from "@/components/layout/wrapper";
import { Button, Icon } from "@/components/ui";
import { useLazyGetApiV1ProductionOrdersInvoicesQuery } from "@/lib/redux/api/openapi.generated";
import { useSelector } from "@/lib/redux/store";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { columns } from "./columns";
import CreateProductionOrder from "./create";
import { commonActions } from "@/lib/redux/slices/common";
import { RowSelectionState } from "@tanstack/react-table";

function Index() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.common.searchInput);
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const debouncedValue = useDebounce(searchValue, 500);

  const [loadProductionOrders, { data: result, isLoading, isFetching }] =
    useLazyGetApiV1ProductionOrdersInvoicesQuery();

  useEffect(() => {
    loadProductionOrders({ page, pageSize });
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, triggerReload, debouncedValue]);
  return (
    <PageWrapper className="space-y-4">
      {open && (
        <CreateProductionOrder open={open} onClose={() => setOpen(false)} />
      )}
      <div className="flex items-center w-full justify-between gap-3">
        <PageTitle title="Invoices" />
        <div className="flex items-center">
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            <Icon name="Plus" />
            <span>Create Shipments</span>
          </Button>
        </div>
      </div>
      <ServerDatatable
        columns={columns}
        data={result?.data ?? []}
        isLoading={isLoading || isFetching}
        setPage={setPage}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
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
