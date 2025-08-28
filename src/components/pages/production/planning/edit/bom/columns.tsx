"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

// Assuming these are correct paths to your UI components and shared items
import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui"; // DropdownMenuItem removed from here

import Edit from "./edit"; // Local import
import { BomRequestDto } from "./types"; // Local import
import { TableMenuAction } from "@/shared/table-menu";
import { RowDragHandleCell } from "@/shared/datatable/table-move";

interface DataTableRowActionsProps {
  row: Row<BomRequestDto>; // Row type is BomRequestDto
  onUpdateItem: (index: number, updatedItem: BomRequestDto) => boolean;
  onRemoveItem: (index: number) => void;
  existingItems: BomRequestDto[];
  index: number; // This will be row.index from TanStack Table
}

export function DataTableRowActions({
  row,
  onUpdateItem,
  onRemoveItem,
  existingItems, // existingItems prop was not used in this component
  index, // This is the actual current index of the row in the table
}: DataTableRowActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    onRemoveItem(index); // Use the passed index (row.index)
    setIsDeleteOpen(false);
  };

  const handleUpdate = (updatedItem: BomRequestDto) => {
    // Pass existingItems (all items currently in the table) to the Edit component
    // This seems to be missing from the original props destructuring, assuming it's needed by Edit.
    // If Edit doesn't need all existingItems, this can be simplified.
    // For now, assuming `existingItems` should be available to `Edit`.
    // The `existingItems` prop is passed to `Edit` component below, so it should be available in this scope.
    // Let's assume `existingItems` is passed down to DataTableRowActions and then to Edit.
    // The original signature had `existingItems` so we'll keep it for Edit component.
    return onUpdateItem(index, updatedItem); // Use the passed index (row.index)
  };

  // This prop seems to be intended for the Edit component.
  // We need to ensure it's correctly passed. The getColumns function provides it.
  // const existingItems = row.original as BomRequestDto[]; //|| { existingItems: [] };

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem
          className="group"
          onSelect={() => setIsEditOpen(true)}
        >
          <div className="flex cursor-pointer items-center justify-start gap-2">
            <span className="text-black">
              <Icon
                name="Pencil"
                className="h-4 w-4 text-gray-600 group-hover:text-blue-600"
              />
            </span>
            <span className="text-sm text-gray-700 group-hover:text-blue-600">
              Edit
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group"
          onSelect={() => setIsDeleteOpen(true)}
        >
          <div className="flex cursor-pointer items-center justify-start gap-2">
            <span className="text-black">
              <Icon
                name="Trash2"
                className="h-4 w-4 text-gray-600 group-hover:text-red-600"
              />
            </span>
            <span className="text-sm text-gray-700 group-hover:text-red-600">
              Delete
            </span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      {isEditOpen && (
        <Edit
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          details={row.original}
          onUpdateItem={handleUpdate}
          existingItems={existingItems} // Pass the correct existingItems
          currentIndex={index} // Pass the correct index
        />
      )}

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        title="Confirm Deletion"
        description={`Are you sure you want to remove material "${row.original.materialId?.label || "this item"}"? This action cannot be undone.`}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

// Add tableMeta to BomRequestDto if it's used for passing existingItems
interface BomRequestDtoWithMeta extends BomRequestDto {
  tableMeta?: {
    existingItems: BomRequestDto[];
  };
}

// Column definitions now use BomRequestDto directly
export const getColumns = (
  onUpdateItem: (index: number, updatedItem: BomRequestDto) => boolean,
  onRemoveItem: (index: number) => void,
  // This existingItems is the full list, used to pass to Edit via DataTableRowActions
  allItemsForContext: BomRequestDto[],
): ColumnDef<BomRequestDtoWithMeta>[] => [
  // Changed type here
  {
    id: "drag-handle",
    header: () => (
      <Icon name="GripVertical" className="h-5 w-5 text-gray-400 mx-auto" />
    ),
    cell: ({ row }) => <RowDragHandleCell rowId={String(row.original.rowId)} />, // Ensure rowId is string
    size: 60, // Explicit size for drag handle
  },
  {
    accessorKey: "order",
    header: "Step",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700 text-center">
        {row.getValue("order")}
      </div>
    ),
    size: 80,
  },
  {
    accessorKey: "materialCode", // Access nested label for display
    header: "Code",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.code}</div>
    ),
  },
  {
    accessorKey: "materialId.label", // Access nested label for display
    header: "Material",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">
        {row.original.materialId?.label}
      </div>
    ),
  },
  {
    accessorKey: "spec", // Access nested label for display
    header: "SPEC Ref",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.spec}</div>
    ),
  },
  {
    accessorKey: "baseQuantity", // Changed from "quantity" to match BomRequestDto
    header: "Qty per Unit",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700 text-right">
        {row.original.baseQuantity}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "baseUoMId.label", // Changed from "uomId" and access nested label
    header: "UOM",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">
        {row.original.baseUoMId?.label}
      </div>
    ),
    size: 80,
  },
  {
    accessorKey: "batchQuantity", // Changed from "quantity" to match BomRequestDto
    header: "Full Batch Qty",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700 text-right">
        {row.original.baseQuantity}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "materialTypeId.label", // Access nested label for display
    header: "Function",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">
        {row.original.materialTypeId?.label}
      </div>
    ),
  },

  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">
        {row.getValue("grade") || "-"}
      </div>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    // Attach allItemsForContext to row.original or pass via a meta property if TanStack Table supports it easily
    // For simplicity, we'll assume DataTableRowActions can get existingItems from a context or a re-fetch if needed,
    // or it's passed via row.original by enriching data before passing to table.
    // A common way is to use table.options.meta
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onUpdateItem={onUpdateItem}
        onRemoveItem={onRemoveItem}
        existingItems={allItemsForContext} // Pass the full list here
        index={row.index} // Use row.index provided by TanStack Table
      />
    ),
    size: 120,
  },
];
