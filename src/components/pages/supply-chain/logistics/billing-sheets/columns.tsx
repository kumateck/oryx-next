import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { BillingSheetStatus, getEnumBadge } from "@/lib";
import { BillingSheetDto } from "@/lib/redux/api/openapi.generated";
import StatusBadge from "@/shared/status-badge";

// const batchStatusColors: Record<BillingSheetStatus, string> = {
//   [BillingSheetStatus.Pending]: "bg-yellow-100 text-yellow-800",
//   [BillingSheetStatus.Paid]: "bg-green-100 text-green-800",
// };

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
      <div className="min-w-36">{row.original.invoice?.supplier?.name}</div>
    ),
  },
  // {
  //   accessorKey: "invoiceAmount",
  //   header: "Invoice Amount",
  //   cell: (
  //     {
  //       // row
  //     },
  //   ) => (
  //     <div className="min-w-36">
  //       {"invoice amount"} {/*replace with amount */}
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
  //   ) => <div className="min-w-36">{row.original.invoice?.amount}</div>,
  // },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.invoice?.createdAt
          ? format(row.original?.invoice.createdAt, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expectedDeliveryDate",
    header: "Expected delivery Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original?.expectedArrivalDate
          ? format(row.original?.expectedArrivalDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as BillingSheetStatus;
      const { label, colorClass } = getEnumBadge(BillingSheetStatus, status);

      return <StatusBadge label={label} colorClass={colorClass} />;
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
