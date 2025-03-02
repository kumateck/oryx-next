import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  EquipmentDto,
  useDeleteApiV1ProductEquipmentByEquipmentIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

import Edit from "./edit";
import { IsYesorNo } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends EquipmentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] =
    useDeleteApiV1ProductEquipmentByEquipmentIdMutation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<EquipmentDto>({} as EquipmentDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setIsOpen(true);
            }}
          >
            <Icon
              name="Pencil"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Edit</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setIsDeleteOpen(true);
            }}
          >
            <Icon
              name="Trash2"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      {details.id && isOpen && (
        <Edit
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              equipmentId: details.id as string,
            }).unwrap();
            toast.success("Equipment deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}

export const columns: ColumnDef<EquipmentDto>[] = [
  {
    accessorKey: "machineId",
    header: "Machine ID",

    cell: ({ row }) => <div>{row.getValue("machineId")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "isStorage",
    header: "Storage",
    cell: ({ row }) => (
      <div>
        {row.original.isStorage
          ? IsYesorNo[IsYesorNo.Yes]
          : IsYesorNo[IsYesorNo.No]}
      </div>
    ),
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => (
      <div>
        {row.original.capacityQuantity} {row.original.uoM?.symbol}
      </div>
    ),
  },
  {
    accessorKey: "relevant",
    header: "Relevant for Capacity Planning",
    cell: ({ row }) => (
      <div>
        {row.original.relevanceCheck
          ? IsYesorNo[IsYesorNo.Yes]
          : IsYesorNo[IsYesorNo.No]}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.department?.name}</div>,
  },
  {
    accessorKey: "storageLocation",
    header: "Storage Location",
    cell: ({ row }) => <div>{row.getValue("storageLocation")}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
