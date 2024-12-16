"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { Option } from "@/lib";

import TableRowSkeleton from "../table-skeleton";
import EditableCell from "./edit-cell";

export enum ColumnType {
  TEXT = "text",
  NUMBER = "number",
  SELECT = "select",
  COMBOBOX = "combobox",
  MULTI = "multi",
}
export type CustomColumnMeta<TData> = {
  edittableCell?: {
    type?: ColumnType;
    min?: boolean;
    editable: boolean;
    extraEvents?: (rowIndex: number, value: unknown) => void;
    setItemLists: React.Dispatch<React.SetStateAction<TData[]>>;
    options?: Option[];
  };
};

export type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> & {
  meta?: CustomColumnMeta<TData>;
};

interface DatatableProps<TData extends { options?: Option[] }, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

interface TableUpdateDataProps<TData> {
  rowIndex: number;
  columnId: string;
  value: unknown;
  setTableData: React.Dispatch<React.SetStateAction<TData[]>>;
}
export const TableUpdateData = <TData,>({
  rowIndex,
  columnId,
  value,
  setTableData,
}: TableUpdateDataProps<TData>) => {
  setTableData((oldData) =>
    oldData.map((row, index) =>
      index === rowIndex ? { ...row, [columnId]: value } : row,
    ),
  );
};

export const ListsTable = <TData, TValue>({
  data,
  columns,
  isLoading,
}: DatatableProps<TData & { options?: Option[] }, TValue>) => {
  const [tableData, setTableData] = useState(data);

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    // setTableData((oldData) =>
    //   oldData.map((row, index) =>
    //     index === rowIndex ? { ...row, [columnId]: value } : row,
    //   ),
    // );

    TableUpdateData({
      rowIndex,
      columnId,
      value,
      setTableData,
    });
  };

  useEffect(() => {
    if (data?.length > 0) {
      setTableData(data);
    }
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: tableData.length,
      },
    },
  });

  return (
    <Table normalTable>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
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
            ))}
          </TableRow>
        ))}
      </TableHeader>
      {isLoading ? (
        <TableRowSkeleton
          columns={columns.length}
          rows={tableData.length ?? 10}
        />
      ) : (
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="odd:bg-white even:bg-primary-50 hover:bg-primary-100"
              >
                {row.getVisibleCells().map((cell) => {
                  // console.log(cell, "cells");
                  const editableCell = (
                    cell.column.columnDef as ExtendedColumnDef<TData, TValue>
                  ).meta?.edittableCell; // Extracted the editableCell meta information into a variable

                  return (
                    <TableCell key={cell.id}>
                      {editableCell?.editable ? (
                        <EditableCell
                          min={editableCell?.min}
                          extraEvents={editableCell?.extraEvents}
                          cellContext={cell.getContext()}
                          updateData={(rowIndex, columnId, value) => {
                            updateData(rowIndex, columnId, value);
                            editableCell.setItemLists((prevState) => {
                              const newState = prevState.map((row, index) =>
                                Number(index) === Number(rowIndex)
                                  ? {
                                      ...row,
                                      [columnId]:
                                        editableCell?.type === "number"
                                          ? Number(value)
                                          : value,
                                    }
                                  : row,
                              );
                              return newState;
                            });
                          }}
                          type={editableCell?.type} // Access type directly from the editableCell variable
                          options={
                            // "options" in cell.row?.original
                            //   ? cell.row.original.options
                            //   : editableCell?.options
                            // "options" in cell.row.original
                            //   ? cell.row.original.options
                            //   : editableCell?.options
                            editableCell?.options ?? cell.row.original?.options
                          }
                        />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        ) // Render regular cells for other columns
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};
