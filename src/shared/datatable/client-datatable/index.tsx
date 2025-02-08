"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableRowSkeleton from "../table-skeleton";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onChangeSelectedRows?: (selectedRows: (TData & { rowId: string })[]) => void;
  tablePrefixComponent?: React.FC;
  selectedRows?: string[];
  onRowClick?: (row: TData) => void;
  resetSelection?: boolean;
  toolbar?: { title: string; actions: React.ReactNode; backBtn?: boolean };
  isLoading?: boolean;
}

export function ClientDatatable<TData, TValue>({
  columns,
  data,
  isLoading,
  // onRowClick,
  onChangeSelectedRows,
  // toolbar,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const selectedRows = React.useMemo(
    () =>
      Object.keys(rowSelection).map((rowId) => ({
        ...data[Number(rowId)],
        rowId: rowId,
      })),
    [rowSelection, data],
  );
  useEffect(() => {
    if (!props.selectedRows) return;

    setRowSelection(
      props.selectedRows.reduce(
        (acc, rowId) => {
          acc[rowId] = true;
          return acc;
        },
        {} as { [key: string]: boolean },
      ),
    );
  }, [props.selectedRows]);

  React.useEffect(() => {
    onChangeSelectedRows?.(selectedRows);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows]);
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
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-primary-500 text-white first:rounded-tl-md last:rounded-tr-md"
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
              rows={table.getState().pagination.pageSize}
            />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="even:bg-primary-50 hover:bg-primary-100 odd:bg-white"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
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
      <DataTablePagination table={table} />
    </div>
  );
}
