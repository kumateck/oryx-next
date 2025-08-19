import { ColumnDef, Row } from "@tanstack/react-table";
import { ConfirmDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  usePostApiV1ProcurementInventoryMemoItemByIdMarkPaidMutation,
  MemoDtoRead,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThrowErrorMessage from "@/lib/throw-error";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends MemoDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [markMemoItemAsPaid] =
    usePostApiV1ProcurementInventoryMemoItemByIdMarkPaidMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleMarkAsPaid = async (id: string) => {
    try {
      await markMemoItemAsPaid({ id }).unwrap();
      toast.success("Item marked as paid");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      console.error("Failed to mark item as paid:", error);
      ThrowErrorMessage(error);
    }
  };
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem
          onClick={() =>
            router.push(`/extrals/vendors-memo/${row.original.id}`)
          }
          className="group"
        >
          <Icon
            name="Eye"
            className="h-5 w-5 cursor-pointer text-neutral-500"
          />
          <span className="ml-2">View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}} className="group">
          <Icon
            name="Eye"
            className="h-5 w-5 cursor-pointer text-neutral-500"
          />
          <span className="ml-2">Create Memo</span>
        </DropdownMenuItem>
      </TableMenuAction>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        icon="Info"
        title="Mark as Paid"
        confirmText="Update"
        description={`Are you sure you want to mark this item as paid?`}
        onConfirm={() => {
          handleMarkAsPaid(row.original.id as string);
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<MemoDtoRead>[] = [
  {
    accessorKey: "memoCode",
    header: "Memo Code",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.code ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "totalValue",
    header: "Total Value",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.totalValue ?? "N/A"}</div>
    ),
  },

  {
    accessorKey: "totalItems",
    header: "Total Items",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.items?.length ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`w-fit rounded-xl px-2 py-1 text-xs ${row.original?.paid ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}`}
      >
        {row.original?.paid ? "Paid" : "Pending"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
