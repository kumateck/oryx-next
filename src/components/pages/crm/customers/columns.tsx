import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  CustomerDto,
  DesignationDto,
  useDeleteApiV1CustomersByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import Edit from "./edit";
import { TableMenuAction } from "@/shared/table-menu";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends CustomerDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1CustomersByIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<DesignationDto>({} as DesignationDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dispatch = useDispatch();

  //permisions checks
  // const { hasPermissionAccess } = useUserPermissions();

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {/* <DropdownMenuItem>
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setOpenDetailsDialog(true);
            }}
          >
            <Icon
              name="Eye"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>View Details</span>
          </div>
        </DropdownMenuItem> */}
        <DropdownMenuItem className="group">
          <div
            className="flex w-full cursor-pointer items-center justify-start gap-2"
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
            className="flex text-red-500 cursor-pointer items-center justify-start gap-2"
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
      {details.name && isOpen && (
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
              id: details.id as string,
            }).unwrap();
            dispatch(commonActions.setTriggerReload());
            toast.success("Customer deleted successfully");
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<CustomerDto>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.original.address}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => <div>{row.original.phone as string}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
