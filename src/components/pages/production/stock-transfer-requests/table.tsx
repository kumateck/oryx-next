import { ColumnDef } from "@tanstack/react-table";
import React from "react";

import {
  DepartmentStockTransferDtoIEnumerablePaginateableRead,
  DepartmentStockTransferDtoRead,
} from "@/lib/redux/api/openapi.generated";
import { ServerDatatable } from "@/shared/datatable";

interface Props {
  response?: DepartmentStockTransferDtoIEnumerablePaginateableRead;
  isLoading: boolean;
  pageSize?: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  columns: ColumnDef<DepartmentStockTransferDtoRead>[];
}
const TransferTable = ({
  response,
  columns,
  isLoading,
  pageSize,
  setPageSize,
  setPage,
}: Props) => {
  return (
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
  );
};

export default TransferTable;
