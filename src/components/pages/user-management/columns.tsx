import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  ErrorResponse,
  findRecordWithFullAccess,
  isErrorResponse,
  PermissionKeys,
  Section,
} from "@/lib";
import {
  UserWithRoleDto,
  useDeleteApiV1UserByIdMutation,
  useLazyGetApiV1UserQuery,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import Edit from "./edit";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends UserWithRoleDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1UserByIdMutation();

  const [details, setDetails] = useState<UserWithRoleDto>(
    {} as UserWithRoleDto,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadUsers] = useLazyGetApiV1UserQuery();

  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {findRecordWithFullAccess(
          permissions,
          PermissionKeys.humanResources.updateUserDetails,
        ) && (
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
        )}
        {findRecordWithFullAccess(
          permissions,
          PermissionKeys.humanResources.deleteUser,
        ) && (
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
        )}
      </TableMenuAction>
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
              id: details.id as string,
            }).unwrap();
            toast.success("User deleted successfully");
            loadUsers({
              pageSize: 30,
            });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<UserWithRoleDto>[] = [
  {
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => (
      <div>
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Employee Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.original.roles?.[0].name}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.department?.name}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
