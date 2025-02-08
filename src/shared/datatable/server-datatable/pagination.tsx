import { Table } from "@tanstack/react-table";
import { Pagination } from "react-headless-pagination";

import {
  Button,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

import { TPaginationResponse, paginationParams } from "../types";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  tableParams?: TPaginationResponse | undefined;
  pagination?: paginationParams;
  setCurrentAction?: (row?: any) => void;
}
export function DataTablePagination<TData>({
  tableParams,
  pagination,
  table,
}: DataTablePaginationProps<TData>) {
  const handlePageChange = (page: number) => {
    const pageParam = page + 1;
    pagination?.fetchGotoPage(pageParam);
    table.setPageIndex(page);
  };

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center space-x-2">
        <Pagination
          currentPage={(tableParams?.pageIndex || 1) - 1}
          setCurrentPage={handlePageChange}
          edgePageCount={2}
          middlePagesSiblingCount={1}
          className="flex items-center space-x-2"
          truncableText="..."
          truncableClassName=""
          totalPages={tableParams?.pageCount || 1}
        >
          <Button
            variant="ghost"
            className="flex gap-2 hover:bg-transparent"
            onClick={() => {
              pagination?.fetchPreviousPage();
              table.previousPage();
            }}
            disabled={!pagination?.hasPreviousPage}
          >
            {/* <span className="sr-only">Go to previous page</span> */}
            <Icon name="MoveLeft" className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <nav className="flex flex-grow justify-center">
            <ul className="flex items-center">
              <Pagination.PageButton
                activeClassName="relative block rounded-lg bg-primary-default text-white px-3 py-1.5 text-sm font-medium  transition-all duration-300"
                inactiveClassName=""
                className="cursor-pointer p-2"
              />
            </ul>
          </nav>
          <Button
            variant="ghost"
            className="flex gap-2 hover:bg-transparent"
            onClick={() => {
              pagination?.fetchNextPage();
              table.nextPage();
            }}
            disabled={!pagination?.hasNextPage}
          >
            {/* <span className="sr-only">Go to next page</span> */}
            <span>Next</span>
            <Icon name="MoveRight" className="h-4 w-4" />
          </Button>
        </Pagination>
      </div>
      <div className="flex items-center gap-4">
        <span>Rows per page</span>
        <Select
          value={
            tableParams?.pageSize?.toString() ||
            table.getState().pagination.pageSize.toString()
          }
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            if (tableParams?.onChangePageSize) {
              tableParams?.onChangePageSize(Number(value));
            }
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[30, 40, 50, 100, 150].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
