import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  ErrorResponse,
  InventoryClassificationEnum,
  isErrorResponse,
} from "@/lib";
import {
  ItemDto,
  useDeleteApiV1ItemsMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ItemDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const [deleteItem] = useDeleteApiV1ItemsMutation();
  const router = useRouter();
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem>
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              router.push(
                `/extrals/general-inventory-config/${row.original.id}`,
              );
            }}
          >
            <Icon
              name="Eye"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>View Details</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <div
            className="flex w-full cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              router.push(
                `/extrals/general-inventory-config/${row.original.id}/edit?storeType=${row.original.store}`,
              );
            }}
          >
            <Icon
              name="Pencil"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Edit</span>
          </div>
        </DropdownMenuItem>
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
            console.log(row.original.id);
            try {
              await deleteItem({
                id: row.original.id as string,
              }).unwrap();
              setIsDelete(false);
              dispatch(commonActions.setTriggerReload());
              toast.success("Material specification deleted successfully.");
            } catch (error) {
              console.error("Error deleting specification:", error);
              toast.error(isErrorResponse(error as ErrorResponse)?.description);
            }
          }}
        />
      )}
    </section>
  );
}
export const columns: ColumnDef<ItemDto>[] = [
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => <div>{row.original?.name}</div>,
  },
  {
    accessorKey: "code",
    header: "Item Code",
    cell: ({ row }) => <div>{row.original?.code}</div>,
  },
  //TODO: update this to use the correct item quantity
  {
    accessorKey: "quantity",
    header: "Available Quantity",
    cell: ({ row }) => <div>{row.original?.maximumLevel}</div>,
  },
  {
    accessorKey: "classification",
    header: "Classification",
    cell: ({ row }) => (
      <div>
        {
          InventoryClassificationEnum[
            row.original?.classification as InventoryClassificationEnum
          ]
        }
      </div>
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
