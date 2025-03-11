import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { ConfirmDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  ShipmentDocumentDto,
  usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ShipmentDocumentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>("");
  const [isArrivedOpen, setIsArrivedOpen] = useState(false);
  const [arrivedMutation, { isLoading }] =
    usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedMutation();

  const handleArrived = async () => {
    try {
      await arrivedMutation({
        shipmentDocumentId: id,
      }).unwrap();
      toast.success("Shipment Arrived successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <section className="flex items-center justify-end gap-2">
      {isLoading && (
        <Icon name="LoaderCircle" className="size-5 animate-spin" />
      )}
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              setId(row.original.id as string);
              setIsArrivedOpen(true);
            }}
          >
            <Icon
              name="CircleCheck"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Mark as Arrived</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      <ConfirmDialog
        open={isArrivedOpen}
        onClose={() => setIsArrivedOpen(false)}
        onConfirm={handleArrived}
        title="Mark as Arrived"
        description="Are you sure you want to mark this shipment as arrived?"
        icon="CircleCheck"
        confirmText="Confirm"
      />
    </section>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "code",
    header: "Waybill Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.arrivedAt ? "Arrived" : "Pending"}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
