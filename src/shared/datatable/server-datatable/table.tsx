import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib";

import TableRowSkeleton from "../table-skeleton";
import { TPaginationResponse, paginationParams } from "../types";
import { DataTablePagination } from "./pagination";

export type CustomColumnMeta = {
  omitRowClick?: boolean;
};
// Extend the ColumnDef type to include the custom `meta` property
export type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  meta?: CustomColumnMeta;
};
interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: paginationParams;
  tableParams?: TPaginationResponse;

  tablePrefixComponent?: React.FC;
  selectedRows?: string[];
  onRowClick?: (row: TData) => void;
  rowSelection?: RowSelectionState;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}
export const Datatable = <TData, TValue>({
  data,
  columns,
  isLoading,
  pagination,
  tableParams,
  rowSelection,
  setRowSelection,
  onRowClick,
  // ...props
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: tableParams?.pageIndex as number,
        pageSize: tableParams?.pageSize as number,
      },
    },
    manualPagination: true,
  });
  return (
    <div className="h-full w-full">
      <div className="w-full">
        <Table>
          <TableHeader className="w-full rounded-t-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="z-10 bg-primary-default text-white"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableRowSkeleton
              columns={columns.length}
              rows={tableParams?.pageSize}
            />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    // data-state={row?.getIsSelected() && "selected"}
                    // className={cn({
                    //   "bg-primary-selected": row?.getIsSelected(),
                    // })}
                    data-state={
                      rowSelection
                        ? row?.getIsSelected() && "selected"
                        : undefined
                    }
                    className={cn({
                      "bg-primary-selected":
                        rowSelection && row?.getIsSelected(),
                    })}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row?.getVisibleCells().map((cell) => {
                      const isNonClickable = (
                        cell.column.columnDef as ExtendedColumnDef<
                          TData,
                          TValue
                        >
                      ).meta?.omitRowClick;
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn("hover:bg-primary-selected", {
                            "hover:cursor-pointer":
                              onRowClick && !isNonClickable,
                          })}
                          onClick={
                            isNonClickable
                              ? (e) => e.stopPropagation()
                              : undefined
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination
        table={table}
        pagination={pagination}
        tableParams={tableParams}
      />
    </div>
  );
};
