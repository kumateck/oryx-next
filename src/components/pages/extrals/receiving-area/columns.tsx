import { Button, Icon } from "@/components/ui";
import { ApprovalStatus } from "@/lib";
import {
  StockEntryDtoRead,
  usePostApiV1ProcurementInventoryItemsByIdApproveMutation,
  usePostApiV1ProcurementInventoryItemsByIdRejectMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import ThrowErrorMessage from "@/lib/throw-error";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const statusColors: Record<ApprovalStatus, string> = {
  [ApprovalStatus.Pending]: "bg-gray-500 text-white",
  [ApprovalStatus.Approved]: "bg-green-500 text-white",
  [ApprovalStatus.Rejected]: "bg-red-500 text-white",
};

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends StockEntryDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [approve, { isLoading: isApproving }] =
    usePostApiV1ProcurementInventoryItemsByIdApproveMutation();
  const [reject, { isLoading: isRejecting }] =
    usePostApiV1ProcurementInventoryItemsByIdRejectMutation();
  return (
    <section className="flex items-center justify-end gap-2">
      <div className="flex items-center gap-2">
        <Button
          disabled={isApproving || isRejecting}
          className="flex items-center justify-center gap-1"
          onClick={async () => {
            try {
              await approve({
                id: row.original.id as string,
              }).unwrap();
              dispatch(commonActions.setTriggerReload());
              toast.success("Approved successfully");
            } catch (error) {
              ThrowErrorMessage(error);
            }
          }}
        >
          <Icon
            name={isApproving ? "LoaderCircle" : "Check"}
            className="mr-2"
          />
          Approve
        </Button>
        <Button
          disabled={isRejecting || isApproving}
          variant="destructive"
          className="flex items-center justify-center gap-1"
          onClick={async () => {
            try {
              await reject({ id: row.original.id as string }).unwrap();
              dispatch(commonActions.setTriggerReload());
              toast.success("Rejected successfully");
            } catch (error) {
              console.log(error);
              ThrowErrorMessage(error);
            }
          }}
        >
          <Icon name={isRejecting ? "LoaderCircle" : "X"} className="mr-2" />
          Reject
        </Button>
      </div>
    </section>
  );
}
export const columns: ColumnDef<StockEntryDtoRead>[] = [
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => <div>{row.original?.item?.name}</div>,
  },
  {
    accessorKey: "itemCode",
    header: "Memo Code",
    cell: ({ row }) => <div>{row.original?.memo?.code}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original?.quantity}</div>,
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => (
      <div
        className={`rounded-md px-2 py-1 text-xs font-medium ${row.original?.memo?.paid ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
      >
        {row.original?.memo?.paid ? "Paid" : "Unpaid"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Approval Status",
    cell: ({ row }) => (
      <div
        className={`rounded-md px-2 py-1 text-xs font-medium ${statusColors[row.original?.status as ApprovalStatus]}`}
      >
        {ApprovalStatus[row.original?.status as ApprovalStatus]}
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
