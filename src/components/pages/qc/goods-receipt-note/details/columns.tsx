import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { useState } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { GRNStatus, PermissionKeys } from "@/lib";
import { format } from "date-fns";
import { TableMenuAction } from "@/shared/table-menu";
import { useUserPermissions } from "@/hooks/use-permission";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export type SampleData = {
  id: string;
  batchNumber: string;
  materialName: string;
  manufacturerName: string;
  manufacturingDate: Date;
  expiryDate: Date;
  resetDate: Date;
  invoiceNumber: string;
  quantity: number;
  createdAt: Date;
  status: GRNStatus;
};

// const batchStatusColors: Record<GRNStatus, string> = {
//   [GRNStatus.Pending]: "bg-gray-500 text-white",
//   [GRNStatus.IN_PROGRESS]: "bg-green-100 text-green-800",
//   [GRNStatus.Completed]: "bg-red-100 text-red-800",
// };
export function DataTableRowActions<
  TData extends SampleData,
>({}: DataTableRowActionsProps<TData>) {
  // const [details, setDetails] = useState<LeaveRequestDto>();
  // const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const [isRecallOpen, setIsRecallOpen] = useState(false);

  const { hasPermissionAccess } = useUserPermissions();

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {}}
          >
            <Icon
              name="RefreshCcw"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Recall</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          {hasPermissionAccess(
            PermissionKeys.humanResources.editLeaveRequest,
          ) && (
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={() => {}}
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
          {hasPermissionAccess(
            PermissionKeys.humanResources.deleteOrCancelLeaveRequest,
          ) && (
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={() => setIsDeleteOpen(true)}
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
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {}}
      />
    </section>
  );
}

export const columns: ColumnDef<SampleData>[] = [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.materialName}</div>,
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => <div>{row.original.manufacturerName}</div>,
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => <div>{row.original.invoiceNumber}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original.expiryDate
          ? format(row.original?.expiryDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.manufacturingDate
          ? format(row.original?.manufacturingDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "resetDate",
    header: "Reset Date",
    cell: ({ row }) => (
      <div>
        {row.original.resetDate
          ? format(row.original?.resetDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original?.createdAt, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
