import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  DamagedStockDto,
  useDeleteApiV1MaterialSpecificationsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends DamagedStockDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const [deleteMaterialSpecification] =
    useDeleteApiV1MaterialSpecificationsByIdMutation();
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex text-red-500 cursor-pointer items-center justify-start gap-2"
            onClick={() => setIsDelete(true)}
          >
            <Icon
              name="Trash2"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Delete</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      {isDelete && (
        <ConfirmDeleteDialog
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={async () => {
            if (!row?.original?.id) return;
            try {
              await deleteMaterialSpecification({
                id: row.original.id as string,
              }).unwrap();
              setIsDelete(false);
              dispatch(commonActions.setTriggerReload());
              toast.success("Damage item deleted successfully.");
            } catch (error) {
              console.error("Error deleting item:", error);
              toast.error(isErrorResponse(error as ErrorResponse)?.description);
            }
          }}
        />
      )}
    </section>
  );
}
export const columns: ColumnDef<DamagedStockDto>[] = [
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => <div>{row.original?.item?.name}</div>,
  },
  {
    accessorKey: "code",
    header: "Item Code",
    cell: ({ row }) => <div>{row.original?.item?.code}</div>,
  },
  {
    accessorKey: "reportedDate",
    header: "Reported Date",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "dd MMMM, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "damageQuantity",
    header: "Damage Quantity",
    cell: ({ row }) => <div>{row.original?.item?.maximumLevel}</div>,
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => <div>{row.original?.remarks}</div>,
  },
  {
    accessorKey: "reportedBy",
    header: "Reported By",
    cell: ({ row }) => (
      <div>{`${row.original?.createdBy?.firstName} ${row.original?.createdBy?.lastName}`}</div>
    ),
  },
  {
    id: "actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
