import { ColumnDef, Row } from "@tanstack/react-table";
import {
  ApprovalStatus,
  ErrorResponse,
  findRecordWithFullAccess,
  isErrorResponse,
  LeaveCategories,
  LeaveStatus,
  PermissionKeys,
  Section,
  splitWords,
} from "@/lib";
import {
  LeaveRequestDto,
  useDeleteApiV1DesignationByIdMutation,
  useLazyGetApiV1DesignationQuery,
} from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { toast } from "sonner";
import { useState } from "react";
import Edit from "./leave-request/edit";
import { TableMenuAction } from "@/shared/table-menu";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const batchStatusColors: Record<ApprovalStatus, string> = {
  [ApprovalStatus.Pending]: "bg-gray-500 text-white",
  [ApprovalStatus.Approved]: "bg-green-100 text-green-800",
  [ApprovalStatus.Rejected]: "bg-red-100 text-red-800",
};
export function DataTableRowActions<TData extends LeaveRequestDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1DesignationByIdMutation();

  const [details, setDetails] = useState<LeaveRequestDto>(
    {} as LeaveRequestDto,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();

  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          {findRecordWithFullAccess(
            permissions,
            PermissionKeys.humanResources.editLeaveRequest,
          ) && (
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={(e) => {
                e.stopPropagation();
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
          )}
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          {findRecordWithFullAccess(
            permissions,
            PermissionKeys.humanResources.deleteOrCancelLeaveRequest,
          ) && (
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={(e) => {
                e.stopPropagation();
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
          )}
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
              id: details.id as string,
            }).unwrap();
            toast.success("Designation deleted successfully");
            loadDesignations({ page: 1, pageSize: 10 });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<LeaveRequestDto>[] = [
  {
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => (
      <div>
        {row.original.employee?.firstName} {row.original.employee?.lastName}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.employee?.department?.name}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div>
        {row.original.startDate
          ? format(row.original?.startDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div>
        {row.original.endDate
          ? format(row.original?.endDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Leave Type",
    cell: ({ row }) => <div>{row.original.leaveType?.name}</div>,
  },
  {
    accessorKey: "requestCategory",
    header: "Leave Category",
    cell: ({ row }) => (
      <div>
        {splitWords(
          LeaveCategories[row.original.requestCategory as LeaveCategories],
        )}
      </div>
    ),
  },
  {
    accessorKey: "leaveStatus",
    header: "Leave Status",
    cell: ({ row }) => {
      const status = row.original.leaveStatus as ApprovalStatus;
      return (
        <div
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        >
          {splitWords(LeaveStatus[row.original.leaveStatus as LeaveStatus])}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      if (row.original.leaveStatus !== ApprovalStatus.Pending) {
        return null;
      }
      return <DataTableRowActions row={row} />;
    },
  },
];
