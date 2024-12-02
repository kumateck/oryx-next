import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";

import Edit from "./edit";
import { FinishedRequestDto } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setItemLists: React.Dispatch<React.SetStateAction<FinishedRequestDto[]>>;
}
export function DataTableRowActions<TData extends FinishedRequestDto>({
  row,
  setItemLists,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<FinishedRequestDto>(
    {} as FinishedRequestDto,
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
  setItemLists: React.Dispatch<React.SetStateAction<FinishedRequestDto[]>>,
): ColumnDef<FinishedRequestDto>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "uom",
    header: "UOM",
    cell: (info) => info.row.original.uoMId?.label,
  },

  {
    accessorKey: "standardCost",
    header: "Cost",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling",
  },
  {
    accessorKey: "dosageForm",
    header: "Dosage Form",
  },
  {
    accessorKey: "strength",
    header: "Strength",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} setItemLists={setItemLists} />
    ),
  },
];
