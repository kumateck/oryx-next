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
import { useEffect, useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableRowSkeleton from "../table-skeleton";
import { TPaginationResponse, paginationParams } from "../types";
import { DataTablePagination } from "./pagination";

// import { DataTableToolbar } from "./toolbar";

interface DatatableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: paginationParams;
  tableParams?: TPaginationResponse;

  toolbar?: { title: string; actions: React.ReactNode };
  filter?: {
    searchOnchange: (search?: string) => void;
    searchPlaceholder: string;
    searchColumn: string;
  };
  onChangeSelectedRows?: (selectedRows: (TData & { rowId: string })[]) => void;
  tablePrefixComponent?: React.FC;
  selectedRows?: string[];
}

export const Datatable = <TData,>({
  data,
  columns,
  isLoading,
  pagination,
  tableParams,
  // toolbar,
  onChangeSelectedRows,
  ...props
}: DatatableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const selectedRows = useMemo(
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

  useEffect(() => {
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
        pageIndex: tableParams?.pageIndex as number,
        pageSize: tableParams?.pageSize as number,
      },
    },
    manualPagination: true,
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        {/* <DataTableToolbar toolbar={toolbar} /> */}
        <Table>
          <TableHeader className="w-full text-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
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
              rows={tableParams?.pageSize}
            />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="odd:bg-white even:bg-primary-50 hover:bg-primary-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2">
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
      <DataTablePagination
        table={table}
        pagination={pagination}
        tableParams={tableParams}
      />
    </div>
  );
};
