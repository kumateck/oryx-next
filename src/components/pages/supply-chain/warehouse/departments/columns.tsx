import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  DepartmentType,
  ErrorResponse,
  findRecordWithFullAccess,
  isErrorResponse,
  PermissionKeys,
  Section,
} from "@/lib";
import {
  DepartmentDto,
  useDeleteApiV1DepartmentByDepartmentIdMutation,
  useLazyGetApiV1DepartmentQuery,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";

import Edit from "./edit";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends DepartmentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1DepartmentByDepartmentIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<DepartmentDto>({} as DepartmentDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadDepartment] = useLazyGetApiV1DepartmentQuery();

  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {findRecordWithFullAccess(
          permissions,
          PermissionKeys.warehouse.editLocation,
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
        {/* <DropdownMenuItem className="group">
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
        </DropdownMenuItem> */}
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
              departmentId: details.id as string,
            }).unwrap();
            toast.success("Department deleted successfully");
            loadDepartment({
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

export const columns: ColumnDef<DepartmentDto>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div>{DepartmentType[row.original.type as DepartmentType]}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
