import { ColumnDef, Row } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  ErrorResponse,
  PermissionKeys,
  Section,
  WaybillStatus,
  WaybillStatusOptions,
  findRecordWithFullAccess,
  isErrorResponse,
} from "@/lib";
import {
  ShipmentDocumentDto,
  usePutApiV1ProcurementShipmentsByShipmentIdStatusMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowStatus<TData extends ShipmentDocumentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [updateMutation] =
    usePutApiV1ProcurementShipmentsByShipmentIdStatusMutation();
  const dispatch = useDispatch();
  const handleStatusUpdate = async (status: WaybillStatus) => {
    try {
      await updateMutation({
        shipmentId: row.original.id as string,
        updateShipmentStatusRequest: { status },
      }).unwrap();
      dispatch(commonActions.setTriggerReload());
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  return (
    <div className="flex items-center gap-2">
      {findRecordWithFullAccess(
        permissions,
        PermissionKeys.logistics.changeWaybillStatus,
      ) && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                statusColors[row.original.status as WaybillStatus] ?? ""
              }`}
            >
              {WaybillStatus[row.original.status as WaybillStatus] ?? "Unknown"}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="bottom"
            className="rounded-2xl"
          >
            {WaybillStatusOptions.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() =>
                  handleStatusUpdate(Number(opt.value) as WaybillStatus)
                }
                className="group flex cursor-pointer items-center gap-2"
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export const columns: ColumnDef<ShipmentDocumentDto>[] = [
  {
    accessorKey: "code",
    header: "Shipment Document Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.shipmentInvoice?.supplier?.name || "-"}
      </div>
    ),
  },
  {
    accessorKey: "invoice",
    header: "Invoice No",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.shipmentInvoice?.code || "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DataTableRowStatus row={row} />,
  },
];

const statusColors: Record<WaybillStatus, string> = {
  [WaybillStatus.New]: "bg-blue-100 text-blue-800",
  [WaybillStatus.Cleared]: "bg-purple-100 text-purple-800",
  [WaybillStatus.Arrived]: "bg-green-100 text-green-800",
};
