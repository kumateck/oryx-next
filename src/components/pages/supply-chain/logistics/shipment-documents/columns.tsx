import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { ShipmentDocumentDtoRead } from "@/lib/redux/api/openapi.generated";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ShipmentDocumentDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <section className="flex items-center justify-end gap-2">
      {row.original.code}
    </section>
  );
}

export const columns: ColumnDef<ShipmentDocumentDtoRead>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "invoice",
    header: "Invoice No",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.invoiceNumber}</div>
    ),
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.purchaseOrder?.supplier?.name}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Expected Delivery Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.purchaseOrder?.expectedDeliveryDate
          ? format(
              row.original.purchaseOrder?.expectedDeliveryDate,
              "MMM d, yyyy",
            )
          : ""}
      </div>
    ),
  },

  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div className="min-w-36">
  //       {PurchaseOrderStatusList[row.original?.status as PurchaseOrderStatus]}
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
