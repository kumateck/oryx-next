import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { Button, ConfirmDeleteDialog, Icon } from "@/components/ui";
import {
  ErrorResponse,
  isErrorResponse,
  OvertimeStatus,
  splitWords,
  // OvertimeStatus,
} from "@/lib";
import {
  OvertimeRequestDtoRead,
  WarehouseLocationRackDto,
  useDeleteApiV1OvertimeRequestsByIdMutation,
  useLazyGetApiV1OvertimeRequestsQuery,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";
import { format } from "date-fns";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { TableMenuAction } from "@/shared/table-menu";
import { useRouter } from "next/navigation";

// import { useUserPermissions } from "@/hooks/use-permission";

const batchStatusColors: Record<OvertimeStatus, string> = {
  [OvertimeStatus.Pending]: "bg-gray-500 text-white",
  [OvertimeStatus.Approved]: "bg-green-100 text-green-800",
  [OvertimeStatus.Rejected]: "bg-red-100 text-red-800",
};

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends WarehouseLocationRackDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1OvertimeRequestsByIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [details, setDetails] = useState<WarehouseLocationRackDto>(
    {} as WarehouseLocationRackDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadOvertimeRequests] = useLazyGetApiV1OvertimeRequestsQuery();
  const dispatch = useDispatch();
  // check permissions here
  // const { hasPermissionAccess } = useUserPermissions();
  return (
    <section className="flex items-center justify-end gap-2">
      {/* <TableMenuAction>
        {hasPermissionAccess(PermissionKeys.warehouse.editRack) && (
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
        
      </TableMenuAction> */}
      <TableMenuAction>
        <DropdownMenuItem>
          <Button
            onClick={() =>
              router.push(`/hr/overtime-management/${row.original.id}/details`)
            }
            variant="ghost"
          >
            <Icon name="Eye" className="h-5 w-5 cursor-pointer" />
            <span>View Details</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
            onClick={() => {
              setDetails(row.original);
              setIsOpen(true);
            }}
          >
            <Icon name="Pencil" className="h-5 w-5 cursor-pointer" />
            <span>Edit</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant={"ghost"}
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
          </Button>
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
            toast.success("Overtime request deleted successfully");
            dispatch(commonActions.setTriggerReload());
            loadOvertimeRequests({
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

export const columns: ColumnDef<OvertimeRequestDtoRead>[] = [
  {
    accessorKey: "code",
    header: "Overtime Request ID",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.department?.name}</div>,
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "startTimeAndEndTime",
    header: "Start Time & End Time",
    cell: ({ row }) => (
      // { row }
      <div>
        {row.original.startTime} - {row.original.endTime}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as OvertimeStatus;
      return (
        <div
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        >
          {splitWords(OvertimeStatus[row.original.status as OvertimeStatus])}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
