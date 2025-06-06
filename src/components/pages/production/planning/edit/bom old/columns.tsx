"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { TableMenuAction } from "@/shared/table-menu";

import Edit from "./edit";
import { BomRequestDto } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  setItemLists: React.Dispatch<React.SetStateAction<BomRequestDto[]>>;
  itemLists: BomRequestDto[];
}
export function DataTableRowActions<TData extends BomRequestDto>({
  row,
  setItemLists,
  itemLists,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [details, setDetails] = useState<BomRequestDto>({} as BomRequestDto);
  const handleDelete = () => {
    if (details) {
      setItemLists((prev) =>
        prev.filter((item) => item.idIndex !== details.idIndex),
      );
      setIsDeleteOpen(false);
    }
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
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setIsOpen(true);
            }}
          >
            <span className="text-black">
              <Icon name="Pencil" className="h-5 w-5 text-neutral-500" />
            </span>
            <span>Edit</span>
          </div>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem className="group">
          <div
            onClick={() => {
              setDetails(row.original);
              setIsDeleteOpen(true);
            }}
            className="flex cursor-pointer items-center justify-start gap-2"
          >
            <span className="text-black">
              <Icon name="Trash2" className="h-5 w-5 text-danger-default" />
            </span>
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>
      {details && isOpen && (
        <Edit
          setItemLists={setItemLists}
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          itemLists={itemLists}
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
  itemLists: BomRequestDto[],
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
    cell: ({ row }) => <div>{row.original.materialId?.label}</div>,
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.baseQuantity}</div>,
  },
  {
    accessorKey: "uomId",
    header: "UOM",
    cell: ({ row }) => <div>{row.original.baseUoMId?.label}</div>,
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
      <DataTableRowActions
        row={row}
        setItemLists={setItemLists}
        itemLists={itemLists}
      />
    ),
  },
];
