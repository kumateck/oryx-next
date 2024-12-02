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
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

interface DatatableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DraggableTable = <TData,>({
  data,
  columns,
  setItems,
}: DatatableProps<TData>) => {
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(data);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);
    setItems(reorderedItems);
  };

  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="table" type="TABLE">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Table>
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
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={row.id} // Make sure `row.id` is unique
                        index={index}
                      >
                        {(provided) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            data-state={row.getIsSelected() && "selected"}
                            className="odd:bg-white even:bg-primary-50 hover:bg-primary-100"
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="px-4">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </Draggable>
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
                  {provided.placeholder}
                </TableBody>
              </Table>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
