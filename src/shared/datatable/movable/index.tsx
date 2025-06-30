// import React, { CSSProperties } from "react";

// import {
//   ColumnDef,
//   Row,
//   RowSelectionState,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// // needed for table body level scope DnD setup
// import {
//   DndContext,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   closestCenter,
//   type DragEndEvent,
//   type UniqueIdentifier,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

// // needed for row & cell level scope DnD setup
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui";
// import TableRowSkeleton from "../table-skeleton";
// import { flushSync } from "react-dom";

// // Add constraint to ensure TData has an id property
// interface DataWithId {
//   rowId: string | number;
// }

// interface DataTableProps<TData extends DataWithId, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   tablePrefixComponent?: React.FC;
//   onRowClick?: (row: TData) => void;
//   toolbar?: { title: string; actions: React.ReactNode; backBtn?: boolean };
//   isLoading?: boolean;
//   rowSelection?: RowSelectionState;
//   setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>;
//   normalTable?: boolean;
//   // Add callback for when data is reordered
//   onDataReorder?: (reorderedData: TData[]) => void;
// }

// // Row Component - now properly typed with generic
// const DraggableRow = <TData extends DataWithId>({
//   row,
// }: {
//   row: Row<TData>;
// }) => {
//   const { transform, transition, setNodeRef, isDragging } = useSortable({
//     id: row.original.rowId, // Use id consistently
//   });

//   const style: CSSProperties = {
//     transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
//     transition: transition,
//     opacity: isDragging ? 0.8 : 1,
//     zIndex: isDragging ? 1 : 0,
//     position: "relative",
//   };
//   return (
//     // connect row ref to dnd-kit, apply important styles
//     <TableRow ref={setNodeRef} style={style}>
//       {row.getVisibleCells().map((cell) => (
//         <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
//           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// };

// export function MovableDatatable<TData extends DataWithId, TValue>({
//   columns,
//   data,
//   normalTable,
//   onDataReorder,
//   isLoading,
// }: DataTableProps<TData, TValue>) {
//   const [newData, setNewData] = React.useState<TData[]>([]);

//   React.useEffect(() => {
//     setNewData(data);
//   }, [data]);

//   const table = useReactTable({
//     data: newData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getRowId: (row) => String(row.rowId),
//   });

//   const sensors = useSensors(
//     useSensor(MouseSensor),
//     useSensor(TouchSensor),
//     useSensor(KeyboardSensor),
//   );

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     // if (!active || !over || active.id === over.id) return;

//     if (active && over && active.id !== over.id) {
//       setNewData((currentData) => {
//         const currentIds = currentData.map((item) => item.rowId);
//         const oldIndex = currentIds.indexOf(active.id);
//         const newIndex = currentIds.indexOf(over.id);

//         if (oldIndex === -1 || newIndex === -1) return currentData;

//         const reordered = arrayMove(currentData, oldIndex, newIndex);
//         setTimeout(() => {
//           flushSync(() => {
//             onDataReorder?.(reordered);
//           });
//         }, 0);

//         return reordered;
//       });
//     }
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       modifiers={[restrictToVerticalAxis]}
//       onDragEnd={handleDragEnd}
//       sensors={sensors}
//     >
//       <div className="p-2">
//         <Table normalTable={normalTable}>
//           <TableHeader className="w-full rounded-t-sm">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead
//                     className="z-10 bg-primary-default text-white"
//                     key={header.id}
//                     colSpan={header.colSpan}
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           {isLoading ? (
//             <TableRowSkeleton
//               columns={columns.length}
//               rows={table.getState().pagination.pageSize}
//             />
//           ) : (
//             <TableBody>
//               <SortableContext
//                 items={newData.map((d) => d.rowId)}
//                 strategy={verticalListSortingStrategy}
//               >
//                 {table.getRowModel().rows.length > 0 ? (
//                   table
//                     .getRowModel()
//                     .rows.map((row) => <DraggableRow key={row.id} row={row} />)
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={columns.length}
//                       className="h-24 text-center"
//                     >
//                       No results.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </SortableContext>
//             </TableBody>
//           )}
//         </Table>
//       </div>
//     </DndContext>
//   );
// }

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
  // type UniqueIdentifier, // Not used
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

// Assuming these are correct paths to your UI components
// If not, you might need to adjust them based on your project structure
// For example, if TableRowSkeleton is in the same directory: import TableRowSkeleton from './table-skeleton';
// For ui components: import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
// The user provided "@/components/ui" and "@/shared/table-skeleton" so we keep those.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjusted path
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
  onDataReorder?: (reorderedData: TData[]) => void;
}

// Row Component
const DraggableRow = <TData extends DataWithId>({
  // Added trailing comma for generic
  row,
}: {
  row: Row<TData>;
}) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: String(row.original.rowId), // Ensure ID is a string for dnd-kit
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };
  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={isDragging ? "shadow-lg" : ""}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className="py-3 px-4"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export function MovableDatatable<TData extends DataWithId, TValue>({
  // Added trailing comma for generic
  columns,
  data, // This 'data' prop is now the single source of truth for items and order
  normalTable,
  onDataReorder,
  isLoading,
}: DataTableProps<TData, TValue>) {
  // Removed internal 'newData' state and its corresponding useEffect.
  // The component is now fully controlled by the 'data' prop.

  const table = useReactTable({
    data, // Use the 'data' prop directly
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.rowId), // Ensure consistent string IDs
    // debugTable: true, // Uncomment for debugging if needed
    // debugHeaders: true,
    // debugColumns: true,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }), // Added activation constraint
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }), // Added activation constraint
    useSensor(KeyboardSensor),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      if (!onDataReorder) return;

      const activeIdStr = String(active.id);
      const overIdStr = String(over.id);

      const oldIndex = data.findIndex(
        (item) => String(item.rowId) === activeIdStr,
      );
      const newIndex = data.findIndex(
        (item) => String(item.rowId) === overIdStr,
      );

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedData = arrayMove([...data], oldIndex, newIndex); // Use a copy of data
        onDataReorder(reorderedData); // Notify parent to update its state
        // The parent will pass down new 'data' prop, causing re-render
      } else {
        console.warn(
          "MovableDatatable: Could not find items for drag and drop",
          { activeIdStr, overIdStr, dataIds: data.map((d) => d.rowId) },
        );
      }
    }
  };

  const rowIds = React.useMemo(() => data.map((d) => String(d.rowId)), [data]);

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="w-full">
        <Table normalTable={normalTable}>
          <TableHeader className="w-full rounded-t-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="z-10 bg-primary-default text-white"
                    key={header.id}
                    style={{
                      width:
                        header.getSize() !== 150 ? header.getSize() : undefined,
                    }} // Tanstack table default size is 150
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
              // Use a reasonable default or make pageSize configurable if it varies
              rows={10}
            />
          ) : (
            <TableBody>
              <SortableContext
                items={rowIds} // Use memoized rowIds
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.length > 0 ? (
                  table
                    .getRowModel()
                    .rows.map((row) => (
                      <DraggableRow<TData> key={row.id} row={row} />
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-gray-500"
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
