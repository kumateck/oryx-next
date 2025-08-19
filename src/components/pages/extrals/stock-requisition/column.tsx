import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  ErrorResponse,
  IssueItemStockRequisitionStatus,
  // PermissionKeys,
  isErrorResponse,
  routes,
  splitWords,
} from "@/lib";
import {
  ItemStockRequisitionDtoRead,
  MaterialDto,
  useDeleteApiV1ItemsStockRequisitionsMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";
import { format } from "date-fns";
// import { useUserPermissions } from "@/hooks/use-permission";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ItemStockRequisitionDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [deleteMutation] = useDeleteApiV1ItemsStockRequisitionsMutation();
  // const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<MaterialDto>({} as MaterialDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
              console.log(row.original.id);
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
              id: details.id as string,
            }).unwrap();
            toast.success("Stock requisition deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}
export const columns: ColumnDef<ItemStockRequisitionDtoRead>[] = [
  {
    accessorKey: "code",
    header: "Requisition ID",

    cell: ({ row }) => <div>{row.original?.number ?? "N/A"}</div>,
  },
  {
    accessorKey: "requisitionDate",
    header: "Requisition Date",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "dd/MM/yyyy")
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "deliveryDate",
    header: "Expected Delivery Date",
    cell: ({ row }) => (
      <div>
        {row.original.requisitionDate
          ? format(new Date(row.original.requisitionDate), "dd/MM/yyyy")
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "numberOfItems",
    header: "Number of items",
    cell: ({ row }) => <div>{row.original && "N/A"}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`${requisitionStatus[row.original.status as IssueItemStockRequisitionStatus]}`}
      >
        {splitWords(
          IssueItemStockRequisitionStatus[
            row.original.status as IssueItemStockRequisitionStatus
          ],
        )}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const requisitionStatus: Record<IssueItemStockRequisitionStatus, string> = {
  [IssueItemStockRequisitionStatus.Pending]: "bg-blue-100 text-blue-800",
  [IssueItemStockRequisitionStatus.Completed]: "bg-green-100 text-green-800",
  [IssueItemStockRequisitionStatus.Partial]: "bg-yellow-100 text-yellow-800",
};
