import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import {
  ErrorResponse,
  isErrorResponse,
  // OvertimeStatus,
} from "@/lib";
import {
  WarehouseLocationRackDto,
  useDeleteApiV1WarehouseRackByRackIdMutation,
  useLazyGetApiV1WarehouseRackQuery,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";
// import { useUserPermissions } from "@/hooks/use-permission";

// const batchStatusColors: Record<OvertimeStatus, string> = {
//   [OvertimeStatus.Pending]: "bg-gray-500 text-white",
//   [OvertimeStatus.Approved]: "bg-green-100 text-green-800",
//   [OvertimeStatus.Rejected]: "bg-red-100 text-red-800",
// };

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends WarehouseLocationRackDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1WarehouseRackByRackIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<WarehouseLocationRackDto>(
    {} as WarehouseLocationRackDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadWarehouseLocationRacks] = useLazyGetApiV1WarehouseRackQuery();

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
        className="text-danger-500 h-5 w-5 cursor-pointer"
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
              rackId: details.id as string,
            }).unwrap();
            toast.success("Overtime request deleted successfully");
            loadWarehouseLocationRacks({
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

export const columns: ColumnDef<WarehouseLocationRackDto>[] = [
  {
    accessorKey: "code",
    header: "Overtime Request ID",
    cell: () => (
      // { row }
      <div>{/* {row.original.name} */}</div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: () => (
      // { row }
      <div>{/* {row.original.warehouseLocation?.name} */}</div>
    ),
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: () => (
      // { row }
      <div>{/* {row.original.warehouseLocation?.name} */}</div>
    ),
  },
  {
    accessorKey: "startDateAndTime",
    header: "Start Date & Time",
    cell: () => (
      // { row }
      <div>{/* {row.original.warehouseLocation?.name} */}</div>
    ),
  },
  {
    accessorKey: "endDateAndTime",
    header: "End Date & Time",
    cell: () => (
      // { row }
      <div>{/* {row.original.warehouseLocation?.name} */}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () =>
      // { row }
      {
        // const status = row.original.leaveStatus as ApprovalStatus;
        // return (
        //   <div
        //     className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        //   >
        //     {splitWords(LeaveStatus[row.original.leaveStatus as LeaveStatus])}
        //   </div>
        // );
      },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
