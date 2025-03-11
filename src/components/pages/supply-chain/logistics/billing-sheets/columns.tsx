import { ColumnDef } from "@tanstack/react-table";

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
  {
    accessorKey: "invoiceAmount",
    header: "Invoice Amount",
    cell: (
      {
        // row
      },
    ) => (
      <div className="min-w-36">
        {"invoice amount"} {/*replace with amount */}
      </div>
    ),
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.invoice?.code}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (
      {
        // row
      },
    ) => <div className="min-w-36">{"billing sheet amount"}</div>,
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: (
      {
        // row
      },
    ) => <div className="min-w-36">{"order date"}</div>,
  },
  {
    accessorKey: "expectedDeliveryDate",
    header: "Expected delivery Date",
    cell: (
      {
        // row
      },
    ) => <div className="min-w-36">{"Expected delivery date"}</div>,
  },
  {
    accessorKey: "status",
    header: "Expected delivery Date",
    cell: (
      {
        // row
      },
    ) => <div className="min-w-36">{"status"}</div>,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
