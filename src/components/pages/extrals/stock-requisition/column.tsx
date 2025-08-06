import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  ConfirmDeleteDialog,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from "@/components/ui";
import {
  ErrorResponse,
  // PermissionKeys,
  SupplierStatus,
  SupplierType,
  SupplierTypeOptions,
  isErrorResponse,
  routes,
} from "@/lib";
import {
  MaterialDto,
  SupplierDto,
  useDeleteApiV1ProcurementSupplierBySupplierIdMutation,
  usePutApiV1ProcurementSupplierBySupplierIdStatusMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";
// import { useUserPermissions } from "@/hooks/use-permission";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends SupplierDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [deleteMutation] =
    useDeleteApiV1ProcurementSupplierBySupplierIdMutation();
  // const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<MaterialDto>({} as MaterialDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // check permissions access
  // const { hasPermissionAccess } = useUserPermissions();

  return (
    <div className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <Link
            className="flex cursor-pointer items-center justify-start gap-2"
            href={routes.editSupplier(row.original.id as string)}
          >
            <span className="text-black">
              <Icon name="Pencil" className="h-5 w-5 text-neutral-500" />
            </span>
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <Link
            className="flex cursor-pointer items-center justify-start gap-2"
            href={routes.editSupplier(row.original.id as string)}
          >
            <span className="text-black">
              <Icon name="Eye" className="h-5 w-5 text-neutral-500" />
            </span>
            <span>View Details</span>
          </Link>
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
              supplierId: details.id as string,
            }).unwrap();
            toast.success("Supplier deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}
export function DataTableRowStatus<TData extends SupplierDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [updateMutation] =
    usePutApiV1ProcurementSupplierBySupplierIdStatusMutation();
  // const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<{
    id: string;
    status: SupplierStatus;
  }>();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const handleUpdate = async (supplierId: string, status: SupplierStatus) => {
    try {
      await updateMutation({
        supplierId,
        updateSupplierStatusRequest: {
          status,
        },
      }).unwrap();
      toast.success("Status updated successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  return (
    <div className="flex items-center justify-start gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${statusColors[row.original.status as SupplierStatus]}`}
          >
            {SupplierStatus[row.original.status as SupplierStatus]}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom" className="rounded-2xl">
          {SupplierTypeOptions?.map((opt, index) => {
            return (
              <DropdownMenuItem
                key={index}
                onClick={() => {
                  setDetails({
                    id: row.original.id as string,
                    status: Number(opt.value) as SupplierStatus,
                  });
                  setIsUpdateOpen(true);
                }}
                className="group flex cursor-pointer items-center justify-start gap-2"
              >
                <span>{opt.label}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        icon="Info"
        title="Update Status"
        confirmText="Update"
        description={`Are you sure you want to update status to ${SupplierStatus[Number(details?.status)]}?`}
        onConfirm={() => {
          handleUpdate(
            details?.id as string,
            details?.status as SupplierStatus,
          );
        }}
      />
    </div>
  );
}
export const columns: ColumnDef<SupplierDto>[] = [
  {
    accessorKey: "code",
    header: "Requisition ID",

    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "requisitionDate",
    header: "Requisition Date",
    cell: ({ row }) => <div>{row.getValue("venderCode")}</div>,
  },
  {
    accessorKey: "deliveryDate",
    header: "Expected Delivery Date",
    cell: ({ row }) => (
      <div>
        {" "}
        {row.original.type !== undefined
          ? SupplierType[row.original.type]
          : "Unknown"}
      </div>
    ),
  },
  {
    accessorKey: "numberOfItems",
    header: "Number of items",
    cell: ({ row }) => <div>{row.getValue("contactPerson")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DataTableRowStatus row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const statusColors: Record<SupplierStatus, string> = {
  [SupplierStatus.New]: "bg-blue-100 text-blue-800",
  [SupplierStatus.Approved]: "bg-yellow-100 text-yellow-800",
  [SupplierStatus.UnApproved]: "bg-green-100 text-green-800",
};
