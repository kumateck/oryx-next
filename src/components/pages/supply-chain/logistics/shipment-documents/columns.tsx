import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
// import { Option } from "@/lib";
import {
  ShipmentDocumentDto,
  usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedMutation,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";

// import MultiSelectListViewer from "@/shared/multi-select-lists";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ShipmentDocumentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [id, setId] = useState<string>("");
  const [isArrivedOpen, setIsArrivedOpen] = useState(false);
  const [arrivedMutation, { isLoading }] =
    usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedMutation();
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

      <ConfirmDeleteDialog
        open={isArrivedOpen}
        onClose={() => setIsArrivedOpen(false)}
        onConfirm={async () => {
          try {
            await arrivedMutation({
              shipmentDocumentId: id,
            }).unwrap();
            toast.success("Shipment Arrived successfully");
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
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
  // {
  //   accessorKey: "purchaseOrders",
  //   header: "Purchase Orders",
  //   cell: ({ row }) => {
  //     const uniquePurchaseOrders = Array.from(
  //       new Map(
  //         row.original.shipmentInvoice?.items?.map((item) => [
  //           item?.purchaseOrder?.id,
  //           item.purchaseOrder,
  //         ]),
  //       ).values(),
  //     );
  //     return (
  //       <div className="min-w-36">
  //         <MultiSelectListViewer
  //           className="max-w-[120ch]"
  //           lists={
  //             uniquePurchaseOrders?.map((item) => {
  //               return {
  //                 label: item?.code,
  //               };
  //             }) as Option[]
  //           }
  //         />
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: "Shipment Date",
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
