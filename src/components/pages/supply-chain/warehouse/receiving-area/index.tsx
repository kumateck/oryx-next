"use client";

import React, { createContext, useEffect, useState } from "react";

import PageWrapper from "@/components/layout/wrapper";
import { Button, Checkbox, Icon } from "@/components/ui";
import { useLazyGetApiV1ProductionScheduleQuery } from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";
import PageTitle from "@/shared/title";

import { columns } from "./columns";
import CreateGRN from "./create-grn";

// Create context for selected rows
export const SelectedRowsContext = createContext<{
  selectedRows: string[];
  toggleRow: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearAll: () => void;
}>({
  selectedRows: [],
  toggleRow: () => {},
  selectAll: () => {},
  clearAll: () => {},
});

const ReceivingArea = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [loadData, { data: result, isFetching, isLoading }] =
    useLazyGetApiV1ProductionScheduleQuery();

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

  // Toggle individual row selection
  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Select all rows in current page
  const selectAll = (ids: string[]) => {
    setSelectedRows(ids);
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedRows([]);
  };

  // Clear selections when page changes
  useEffect(() => {
    loadData({ page, pageSize });
    clearAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const [isGRNOpen, setIsGRNOpen] = useState(false);

  return (
    <SelectedRowsContext.Provider
      value={{ selectedRows, toggleRow, selectAll, clearAll }}
    >
      <PageWrapper className="w-full space-y-2 py-1">
        <div className="flex items-center justify-between py-2">
          <PageTitle title="Received Materials" />
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={
                  selectedRows.length > 0 && selectedRows.length === data.length
                }
                onCheckedChange={() => {
                  if (selectedRows.length === data.length) {
                    clearAll();
                  } else {
                    selectAll(data.map((row) => row.id as string));
                  }
                }}
              />
              <div>{selectedRows.length} Items</div>
            </div>
            <Button
              type="button"
              variant={"ghost"}
              className="bg-neutral-dark text-white"
              size={"sm"}
              onClick={() => setIsGRNOpen(true)}
            >
              <Icon name="Plus" className="h-4 w-4" /> <span>Create GRN</span>
            </Button>
            {isGRNOpen && (
              <CreateGRN
                onGRNClose={() => setIsGRNOpen(false)}
                isGRNOpen={isGRNOpen}
              />
            )}
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
    </SelectedRowsContext.Provider>
  );
};

export default ReceivingArea;
