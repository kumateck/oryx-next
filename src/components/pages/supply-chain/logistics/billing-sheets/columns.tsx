import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { BillingSheetDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<BillingSheetDto>[] = [
  {
    accessorKey: "billingSheetId",
    header: "Billing Sheet ID",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.supplier?.name}</div>
    ),
  },
  // {
  //   accessorKey: "invoiceAmount",
  //   header: "Invoice Amount",
  //   cell: ({ row }) => (
  //     <div className="min-w-36">
  //       {row.original.invoice?.name} {/*replace with amount */}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.invoice?.code}</div>
    ),
  },
  // {
  //   accessorKey: "amount",
  //   header: "Amount",
  //   cell: (
  //     {
  //       row
  //     },
  //   ) => <div className="min-w-36">{row.original.}</div>,
  // },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original?.createdAt, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expectedDeliveryDate",
    header: "Expected delivery Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.expectedArrivalDate
          ? format(row.original?.expectedArrivalDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: (
  //     {
  //       row
  //     },
  //   ) => <div className="min-w-36">{row.original.sta}</div>,
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
