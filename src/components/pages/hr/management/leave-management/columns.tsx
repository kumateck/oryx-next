import { ColumnDef, Row } from "@tanstack/react-table";
import {
  AuditModules,
  ErrorResponse,
  isErrorResponse,
  LeaveCategories,
  LeaveStatus,
  PermissionKeys,
  splitWords,
} from "@/lib";
import {
  LeaveRequestDto,
  useDeleteApiV1LeaveRequestByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { toast } from "sonner";
import { useState } from "react";
import Edit from "./leave-request/edit";
import { TableMenuAction } from "@/shared/table-menu";
import { useUserPermissions } from "@/hooks/use-permission";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import Recall from "./leave-request/recall";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

const batchStatusColors: Record<LeaveStatus, string> = {
  [LeaveStatus.Pending]: "bg-gray-500 text-white",
  [LeaveStatus.Approved]: "bg-green-100 text-green-800",
  [LeaveStatus.Rejected]: "bg-red-100 text-red-800",
  [LeaveStatus.Expired]: "bg-red-100 text-red-800",
  [LeaveStatus.Recalled]: "bg-yellow-100 text-yellow-800",
};

const shouldShowRecall = (row: LeaveRequestDto): boolean => {
  const today = new Date();
  const startDate = new Date(row.startDate as string);
  const endDate = new Date(row.endDate as string);

  if (row.requestCategory === LeaveCategories.AbsenceRequest) {
    return false;
  }

  if (row.requestCategory === LeaveCategories.ExitPassRequest) {
    return false;
  }

  if (today < startDate || today > endDate) {
    return false;
  }

  if (row.leaveStatus !== LeaveStatus.Approved) {
    return false;
  }

  return true;
};

export function DataTableRowActions<TData extends LeaveRequestDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [deleteMutation] = useDeleteApiV1LeaveRequestByIdMutation();

  const [details, setDetails] = useState<LeaveRequestDto>(
    {} as LeaveRequestDto,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRecallOpen, setIsRecallOpen] = useState(false);

  const { hasPermissionAccess } = useUserPermissions();

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/hr/leave-management/${row.original.id}/details`);
            }}
          >
            <Icon
              name="Eye"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>View Details</span>
          </div>
        </DropdownMenuItem>
        {shouldShowRecall(row.original) && (
          <DropdownMenuItem className="group">
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setDetails(row.original);
                setIsRecallOpen(true);
              }}
            >
              <Icon
                name="RefreshCcw"
                className="h-5 w-5 cursor-pointer text-neutral-500"
              />
              <span>Recall</span>
            </div>
          </DropdownMenuItem>
        )}
        {hasPermissionAccess(
          PermissionKeys.humanResources.editLeaveRequest,
        ) && (
          <DropdownMenuItem
            className="group flex cursor-pointer items-center justify-start gap-2"
            disabled={row.original?.leaveStatus === LeaveStatus.Expired}
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
          </DropdownMenuItem>
        )}
        {(hasPermissionAccess(
          PermissionKeys.humanResources.deleteOrCancelLeaveRequest,
        ) ||
          row.original.leaveStatus == LeaveStatus.Approved) && (
          <DropdownMenuItem
            className="group flex cursor-pointer w-full items-center justify-start gap-2"
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
          </DropdownMenuItem>
        )}
      </TableMenuAction>

      {/* Recall */}
      {details.id && isRecallOpen && (
        <Recall
          details={details}
          isOpen={isRecallOpen}
          onClose={() => setIsRecallOpen(false)}
        />
      )}

      {/* Edit */}
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
            console.log(details.leaveStatus);
            await deleteMutation({
              id: details.id as string,
              module: AuditModules.management.name,
              subModule: AuditModules.management.leaveManagement,
            }).unwrap();
            toast.success("Leave Request deleted successfully");
            dispatch(commonActions.setTriggerReload());
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
      const status = row.original.leaveStatus as LeaveStatus;
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
      return <DataTableRowActions row={row} />;
    },
  },
];
