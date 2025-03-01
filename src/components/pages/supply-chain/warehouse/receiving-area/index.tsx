"use client";

import { RowSelectionState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Checkbox, Icon } from "@/components/ui";
import { useLazyGetApiV1WarehouseByWarehouseIdDistributedRequisitionMaterialsQuery } from "@/lib/redux/api/openapi.generated";
import { getMatchingIds } from "@/lib/utils";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import CreateGRN from "./create-grn";

const ReceivingArea = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1WarehouseByWarehouseIdDistributedRequisitionMaterialsQuery();

  const [pageSize, setPageSize] = useState(30);
  const [page, setPage] = useState(1);
  const [isGRNOpen, setIsGRNOpen] = useState(false);

  useEffect(() => {
    loadData({
      warehouseId: "d959476f-7a2e-459a-b13b-9a41708c7299",
      page,
      pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const data = (result?.data || []).map((item) => ({
    ...item,
    id: item.id || "",
  }));
  const selectedIds = getMatchingIds(data, rowSelection);

  const selectedData = data.filter((item) => selectedIds.includes(item.id));

  const isCreateGRNDisabled =
    selectedData.length === 0 || selectedData.some((row) => row.status === 0);

  return (
    <PageWrapper className="w-full space-y-2 py-1">
      <div className="flex items-center justify-between py-2">
        <PageTitle title="Received Materials" />
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={Object.keys(rowSelection).length > 0}
              onChange={() => setRowSelection({})}
            />
            <div>{Object.keys(rowSelection).length} Items</div>
          </div>
          <Button
            type="button"
            variant={"ghost"}
            className="bg-neutral-dark text-white"
            size={"sm"}
            onClick={() => setIsGRNOpen(true)}
            disabled={isCreateGRNDisabled}
          >
            <Icon name="Plus" className="h-4 w-4" /> <span>Create GRN</span>
          </Button>
          {isGRNOpen && (
            <CreateGRN
              onGRNClose={() => setIsGRNOpen(false)}
              isGRNOpen={isGRNOpen}
              selectedIds={selectedIds}
              data={data}
            />
          )}
        </div>
      </div>

      <ServerDatatable
        data={data}
        columns={columns}
        isLoading={isLoading || isFetching}
        setPageSize={setPageSize}
        setPage={setPage}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        meta={{
          pageIndex: result?.pageIndex ?? 0,
          pageCount: result?.pageCount ?? 1,
          totalRecordCount: result?.totalRecordCount ?? 0,
          numberOfPagesToShow: result?.numberOfPagesToShow ?? 5,
          startPageIndex: result?.startPageIndex ?? 0,
          stopPageIndex: result?.stopPageIndex ?? 1,
          pageSize,
        }}
      />
    </PageWrapper>
  );
};

export default ReceivingArea;
