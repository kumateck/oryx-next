import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";

import Edit from "./edit";
import { PackagingRequestDto } from "./types";
import { TableMenuAction } from "@/shared/table-menu";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
//   setItemLists: React.Dispatch<React.SetStateAction<PackagingRequestDto[]>>;
//   itemLists: PackagingRequestDto[];
// }
interface DataTableRowActionsProps {
  row: Row<PackagingRequestDto>; // Row type is BomRequestDto
  onUpdateItem: (index: number, updatedItem: PackagingRequestDto) => boolean;
  onRemoveItem: (index: number) => void;
  existingItems: PackagingRequestDto[];
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

  const handleUpdate = (updatedItem: PackagingRequestDto) => {
    // Pass existingItems (all items currently in the table) to the Edit component
    // This seems to be missing from the original props destructuring, assuming it's needed by Edit.
    // If Edit doesn't need all existingItems, this can be simplified.
    // For now, assuming `existingItems` should be available to `Edit`.
    // The `existingItems` prop is passed to `Edit` component below, so it should be available in this scope.
    // Let's assume `existingItems` is passed down to DataTableRowActions and then to Edit.
    // The original signature had `existingItems` so we'll keep it for Edit component.
    return onUpdateItem(index, updatedItem); // Use the passed index (row.index)
  };
  return (
    <section className="flex items-center justify-end gap-2">
      {/* <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          setDetails(row.original);
          setIsOpen(true);
        }}
      />
      <Icon
        name="Trash2"
        className="text-danger-500 h-5 w-5 cursor-pointer"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      /> */}
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
          // setItemLists={setItemLists}
          // details={details}
          // isOpen={isOpen}
          // onClose={() => setIsOpen(false)}
          // itemLists={itemLists}
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
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to remove material "${row.original.materialId?.label || "this item"}"? This action cannot be undone.`}
      />
    </section>
  );
}
export const getColumns = (
  // setItemLists: React.Dispatch<React.SetStateAction<PackagingRequestDto[]>>,
  // lists: PackagingRequestDto[],
  onUpdateItem: (index: number, updatedItem: PackagingRequestDto) => boolean,
  onRemoveItem: (index: number) => void,
  // This existingItems is the full list, used to pass to Edit via DataTableRowActions
  allItemsForContext: PackagingRequestDto[],
): ColumnDef<PackagingRequestDto>[] => [
  {
    accessorKey: "idIndex",
    header: "#",
  },
  {
    accessorKey: "code",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "materialId",
    header: "Component Material",
    cell: ({ row }) => <div>{row.original.materialId?.label}</div>,
  },
  {
    accessorKey: "spec", // Access nested label for display
    header: "SPEC Ref",
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.spec}</div>
    ),
  },
  {
    accessorKey: "directLinkMaterialId",
    header: "Direct Link Material",
    cell: ({ row }) => (
      <div className="">{row.original.directLinkMaterial?.label}</div>
    ),
  },
  {
    accessorKey: "unitCapacity",
    header: "Unit Capacity",
    cell: ({ row }) => <div>{row.original.unitCapacity}</div>,
  },
  {
    accessorKey: "baseQuantity",
    header: "Base Qty per Batch",
    cell: ({ row }) => <div>{row.original.baseQuantity}</div>,
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Qty Needed ",
    cell: ({ row }) => <div>{row.original.baseQuantity}</div>,
  },

  {
    accessorKey: "packingExcessMargin",
    header: "Packing Excess",
    cell: ({ row }) => <div>{row.original.packingExcessMargin}</div>,
  },
  // {
  //   accessorKey: "materialTypeId.label", // Access nested label for display
  //   header: "Function",
  //   cell: ({ row }) => (
  //     <div className="text-sm text-gray-700">
  //       {row.original.packingExcessMargin}
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        onUpdateItem={onUpdateItem}
        onRemoveItem={onRemoveItem}
        existingItems={allItemsForContext} // Pass the full list here
        index={row.index} // Use row.index provided by TanStack Table
      />
    ),
  },
];
