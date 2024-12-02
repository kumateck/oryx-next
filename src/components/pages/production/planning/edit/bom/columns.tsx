"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";

import Edit from "./edit";
import { BomRequestDto } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setItemLists: React.Dispatch<React.SetStateAction<BomRequestDto[]>>;
}
export function DataTableRowActions<TData extends BomRequestDto>({
  row,
  setItemLists,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [details, setDetails] = useState<BomRequestDto>({} as BomRequestDto);
  const handleDelete = () => {
    if (details) {
      setItemLists((prev) => prev.filter((item) => item.id !== details.id));
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
  setItemLists: React.Dispatch<React.SetStateAction<BomRequestDto[]>>,
): ColumnDef<BomRequestDto>[] => [
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => <div>{row.getValue("order")}</div>,
  },
  {
    accessorKey: "materialTypeId",
    header: "Material Type",
    cell: ({ row }) => (
      <div className="">{row.original.materialTypeId?.label}</div>
    ),
  },
  {
    accessorKey: "componentMaterialId",
    header: "Component Material",
    cell: ({ row }) => <div>{row.original.componentMaterialId?.label}</div>,
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => <div>{row.getValue("grade")}</div>,
  },
  {
    accessorKey: "casNumber",
    header: "CAS Number",
    cell: ({ row }) => <div>{row.getValue("casNumber")}</div>,
  },
  {
    accessorKey: "function",
    header: "Function",
    cell: ({ row }) => <div>{row.getValue("function")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} setItemLists={setItemLists} />
    ),
  },
];
