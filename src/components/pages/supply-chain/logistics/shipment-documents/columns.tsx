import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from "@/components/ui";
import {
  ErrorResponse,
  ShipmentStatus,
  ShipmentStatusOptions,
  isErrorResponse,
  splitWords,
} from "@/lib";
import {
  ShipmentDocumentDto,
  usePutApiV1ProcurementShipmentsByShipmentIdStatusMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowStatus<TData extends ShipmentDocumentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [updateMutation] =
    usePutApiV1ProcurementShipmentsByShipmentIdStatusMutation();

  const handleStatusUpdate = async (status: ShipmentStatus) => {
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

  return (
    <div className="flex items-center justify-start gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
              statusColors[row.original.status as ShipmentStatus]
            }`}
          >
            {splitWords(ShipmentStatus[row.original.status as ShipmentStatus])}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom" className="rounded-2xl">
          {ShipmentStatusOptions?.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              onClick={() =>
                handleStatusUpdate(Number(opt.value) as ShipmentStatus)
              }
              className="group flex cursor-pointer items-center justify-start gap-2"
            >
              <span>{splitWords(opt.label)}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function DataTableRowActions<TData extends ShipmentDocumentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  // Hide the component when status is not 0 (New)
  if (row.original.status !== ShipmentStatus.New) {
    return null;
  }

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              const invoiceId = row.original.shipmentInvoice?.id;
              if (invoiceId) {
                router.push(
                  `/logistics/billing-sheets/create?invoiceId=${invoiceId}`,
                );
              } else {
                toast.error("Shipment invoice not found");
              }
            }}
          >
            <Icon
              name="Banknote"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Billing Sheet</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>
    </section>
  );
}

export const columns: ColumnDef<ShipmentDocumentDto>[] = [
  {
    accessorKey: "code",
    header: "Shipment Document Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.shipmentInvoice?.supplier?.name}
      </div>
    ),
  },
  {
    accessorKey: "invoice",
    header: "Invoice No",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.shipmentInvoice?.code}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Shipment Arrival Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.arrivedAt
          ? format(row.original.arrivedAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <DataTableRowStatus row={row} />,
  },
  {
    id: "actions",
    meta: { omitRowClick: true },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

const statusColors: Record<ShipmentStatus, string> = {
  [ShipmentStatus.New]: "bg-blue-100 text-blue-800",
  [ShipmentStatus.InTransit]: "bg-yellow-100 text-yellow-800",
  [ShipmentStatus.Cleared]: "bg-purple-100 text-purple-800",
  [ShipmentStatus.Arrived]: "bg-green-100 text-green-800",
};
