import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";

import Edit from "./edit";
import { PackagingRequestDto } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setItemLists: React.Dispatch<React.SetStateAction<PackagingRequestDto[]>>;
}
export function DataTableRowActions<TData extends PackagingRequestDto>({
  row,
  setItemLists,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<PackagingRequestDto>(
    {} as PackagingRequestDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    if (details) {
      setItemLists((prev) => prev.filter((item) => item !== details));
      setIsDeleteOpen(false);
    }
  };
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          setDetails(row.original);
          setIsOpen(true);
        }}
      />
      <Icon
        name="Trash2"
        className="h-5 w-5 cursor-pointer text-danger-500"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      />

      {details && isOpen && (
        <Edit
          setItemLists={setItemLists}
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<PackagingRequestDto[]>>,
): ColumnDef<PackagingRequestDto>[] => [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "packageTypeId",
    header: "Type",
    cell: ({ row }) => (
      <div className="">{row.original.packageTypeId?.label}</div>
    ),
  },
  {
    accessorKey: "materialThickness",
    header: "Thickness",
    cell: ({ row }) => <div>{row.getValue("materialThickness")}</div>,
  },
  {
    accessorKey: "materialId",
    header: "Material Type",
    cell: ({ row }) => <div>{row.original.materialId?.label}</div>,
  },
  {
    accessorKey: "otherStandards",
    header: "Other Standards",
    cell: ({ row }) => <div>{row.getValue("otherStandards")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} setItemLists={setItemLists} />
    ),
  },
];
