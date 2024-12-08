import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

import { TPaginationResponse } from "../types";
import { Datatable } from "./table";

interface IProps<TData> {
  // title: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading: boolean;
  setPageSize: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  meta: TPaginationResponse;
  onChangeSelectedRows?: (selectedRows: (TData & { rowId: string })[]) => void;
  selectedRows?: string[];
  tablePrefixComponent?: React.FC;
  onRowClick?: (row: TData) => void;
}

export const ServerDatatable = <TData,>({
  data,
  columns,
  isLoading,
  // title,
  onRowClick,
  setPage,
  setPageSize,
  // setSearchQuery,
  onChangeSelectedRows,
  meta,
  // ...props
}: IProps<TData>) => {
  const fetchFirstPage = () => {
    setPage(1);
  };
  const fetchGotoPage = (page: number) => {
    setPage(page);
  };
  const fetchNextPage = () => {
    const page = (meta?.pageIndex as number) + 1;
    setPage(page);
  };
  const fetchPreviousPage = () => {
    const page = (meta?.pageIndex as number) - 1;
    setPage(page);
  };
  const fetchLastPage = () => {
    setPage(meta?.stopPageIndex as number);
  };
  const onChangePageSize = (pageSize: number) => {
    setPageSize(pageSize);
  };

  return (
    <Datatable
      // toolbar={{ title, actions: meta.actions }}
      // tablePrefixComponent={props.tablePrefixComponent}
      onRowClick={onRowClick}
      data={data}
      columns={columns}
      isLoading={isLoading}
      tableParams={{
        pageIndex: meta?.pageIndex as number,
        pageCount: meta?.pageCount as number,
        totalRecordCount: meta?.totalRecordCount as number,
        numberOfPagesToShow: meta?.numberOfPagesToShow as number,
        startPageIndex: meta?.startPageIndex as number,
        stopPageIndex: meta?.stopPageIndex as number,
        pageSize: meta?.pageSize as number,
        onChangePageSize,
      }}
      pagination={{
        fetchFirstPage,
        fetchGotoPage,
        fetchNextPage,
        fetchPreviousPage,
        fetchLastPage,
        hasNextPage:
          (meta?.pageIndex || 0) < (meta?.stopPageIndex as number)
            ? true
            : false,
        hasPreviousPage: (meta?.pageIndex as number) > 1 ? true : false,
      }}
      onChangeSelectedRows={onChangeSelectedRows}
    />
  );
};
