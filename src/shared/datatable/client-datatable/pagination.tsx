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

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center space-x-2">
        <Pagination
          currentPage={table.getState().pagination.pageIndex}
          setCurrentPage={(page) => table.setPageIndex(page)}
          edgePageCount={2}
          middlePagesSiblingCount={1}
          className="flex items-center space-x-2"
          truncableText="..."
          truncableClassName=""
          totalPages={table.getPageCount() || 1}
        >
          <Button
            variant="ghost"
            className="flex gap-2 hover:bg-transparent"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {/* <span className="sr-only">Go to previous page</span> */}
            <Icon name="MoveLeft" className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          <nav className="flex flex-grow justify-center">
            <ul className="flex items-center">
              <Pagination.PageButton
                activeClassName="relative block rounded-lg bg-primary-500 text-white px-3 py-1.5 text-sm font-medium  transition-all duration-300"
                inactiveClassName=""
                className="cursor-pointer p-2"
              />
            </ul>
          </nav>
          <Button
            variant="ghost"
            className="flex gap-2 hover:bg-transparent"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
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
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[20, 30, 40, 50].map((pageSize) => (
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
