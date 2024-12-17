import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { BillingSheetDto } from "@/lib/redux/api/openapi.generated";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends BillingSheetDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <section className="flex items-center justify-end gap-2">
      {row.original.code}
    </section>
  );
}

export const columns: ColumnDef<BillingSheetDto>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },

  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.supplier?.name}</div>
    ),
  },
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.invoice?.name}</div>
    ),
  },
  {
    accessorKey: "invoice",
    header: "Invoice No",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.invoice?.code}</div>
    ),
  },
  {
    accessorKey: "demurrageStartDate",
    header: "Order Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.demurrageStartDate
          ? format(row.original.demurrageStartDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expectedArrivalDate",
    header: "Expected Arrival Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.expectedArrivalDate
          ? format(row.original.expectedArrivalDate, "MMM d, yyyy")
          : "-"}
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
