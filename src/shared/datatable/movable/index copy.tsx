import React, { CSSProperties } from "react";

import {
  ColumnDef,
  Row,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

// needed for row & cell level scope DnD setup
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import TableRowSkeleton from "../table-skeleton";

// Add constraint to ensure TData has an id property
interface DataWithId {
  rowId: string | number;
}

interface DataTableProps<TData extends DataWithId, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tablePrefixComponent?: React.FC;
  onRowClick?: (row: TData) => void;
  toolbar?: { title: string; actions: React.ReactNode; backBtn?: boolean };
  isLoading?: boolean;
  rowSelection?: RowSelectionState;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  normalTable?: boolean;
  // Add callback for when data is reordered
  onDataReorder?: (reorderedData: TData[]) => void;
}

// Row Component - now properly typed with generic
const DraggableRow = <TData extends DataWithId>({
  row,
}: {
  row: Row<TData>;
}) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.rowId, // Use id consistently
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };
  return (
    // connect row ref to dnd-kit, apply important styles
    <TableRow ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export function MovableDatatable<TData extends DataWithId, TValue>({
  columns,
  data,
  normalTable,
  onDataReorder,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [newData, setNewData] = React.useState<TData[]>(() => data);

  // Update internal data when props change
  React.useEffect(() => {
    setNewData(data);
  }, [data]);

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => newData?.map((item) => item.rowId),
    [newData],
  );

  const table = useReactTable({
    data: newData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.rowId), //required because row indexes will change, ensure string
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  // reorder rows after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setNewData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        const reorderedData = arrayMove(data, oldIndex, newIndex);

        // Call the callback with the reordered data
        if (onDataReorder) {
          onDataReorder(reorderedData);
        }

        return reorderedData;
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="p-2">
        <Table normalTable={normalTable}>
          <TableHeader className="w-full rounded-t-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="z-10 bg-primary-default text-white"
                    key={header.id}
                    colSpan={header.colSpan}
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
              rows={table.getState().pagination.pageSize}
            />
          ) : (
            <TableBody>
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows?.length ? (
                  table
                    .getRowModel()
                    .rows.map((row) => <DraggableRow key={row.id} row={row} />)
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
              </SortableContext>
            </TableBody>
          )}
        </Table>
      </div>
    </DndContext>
  );
}
