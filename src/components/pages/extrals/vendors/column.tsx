import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { ErrorResponse, SupplierStatus, isErrorResponse } from "@/lib";
import {
  useDeleteApiV1VendorsByIdMutation,
  VendorDto,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";
import Edit from "./edit";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends VendorDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [deleteMutation] = useDeleteApiV1VendorsByIdMutation();
  const [details, setDetails] = useState<VendorDto>({} as VendorDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      {isEdit && (
        <Edit
          open={isEdit}
          onClose={() => setIsEdit(false)}
          details={row.original}
        />
      )}
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => setIsEdit(true)}
          >
            <span className="text-black">
              <Icon name="Pencil" className="h-5 w-5 text-neutral-500" />
            </span>
            <span>Edit</span>
          </div>
        </DropdownMenuItem>
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

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              id: details.id as string,
            }).unwrap();
            toast.success("Vendor deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}

export const columns: ColumnDef<VendorDto>[] = [
  {
    accessorKey: "name",
    header: "Vendor Name",

    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Vendor Type",
    cell: ({ row }) => (
      <div>
        {row.original?.country?.name?.toLowerCase() === "ghana"
          ? "Local"
          : "Foreign"}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.original.country?.name}</div>,
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => (
      <div>
        {row.original.currency && (
          <span>
            {row.original.currency?.name} ({row.original.currency?.symbol})
          </span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

export const statusColors: Record<SupplierStatus, string> = {
  [SupplierStatus.New]: "bg-blue-100 text-blue-800",
  [SupplierStatus.Approved]: "bg-yellow-100 text-yellow-800",
  [SupplierStatus.UnApproved]: "bg-green-100 text-green-800",
};
