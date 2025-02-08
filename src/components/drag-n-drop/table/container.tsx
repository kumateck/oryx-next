import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import update from "immutability-helper";
import React, { useCallback, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import { Card } from "./card";

interface DatatableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}
const DraggableTableContainer = <TData,>({
  data,
  columns,
}: DatatableProps<TData>) => {
  const [cards, setCards] = useState<TData[]>(data);

  const table = useReactTable({
    data: cards,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: data.length, // Ensure all data rows are shown without pagination
      },
    },
  });
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: TData[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as TData],
        ],
      }),
    );
  }, []);

  const renderCard = useCallback(
    (row: Row<TData>, index: number) => {
      return (
        <Card
          key={row.id}
          index={index}
          id={row.id}
          moveCard={moveCard}
          row={row}
        />
      );
    },
    [moveCard],
  );
  return (
    <div>
      <Table className="max-h-48 w-full overflow-y-auto" normalTable>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-white">
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
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => renderCard(row, i))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DraggableTableContainer;
