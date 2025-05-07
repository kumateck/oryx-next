import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  LeaveTypeDto,
  useDeleteApiV1LeaveTypeByIdMutation,
  useLazyGetApiV1LeaveTypeQuery,
} from "@/lib/redux/api/openapi.generated";

// import { TableMenuAction } from "@/shared/table-menu";
import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends LeaveTypeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1LeaveTypeByIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<LeaveTypeDto>({} as LeaveTypeDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadLeaveTypes] = useLazyGetApiV1LeaveTypeQuery();

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
        className="text-red-500 h-5 w-5 cursor-pointer"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      />

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
            toast.success("Leave type deleted successfully");
            loadLeaveTypes({ page: 1, pageSize: 10 });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<LeaveTypeDto>[] = [
  {
    accessorKey: "name",
    header: "Leave Type",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "paid",
    header: "Paid",
    cell: ({ row }) => <div>{row.original.isPaid ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "deductFromBalance",
    header: "Deduct from Leave Balance",
    cell: ({ row }) => (
      <div>{row.original.deductFromBalance ? "Yes" : "No"}</div>
    ),
  },
  {
    accessorKey: "maxLeaveDays",
    header: "Maximum Leave Days",
    cell: ({ row }) => <div>{row.original.numberOfDays}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
