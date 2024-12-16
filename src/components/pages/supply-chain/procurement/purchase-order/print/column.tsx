import { ColumnDef } from "@tanstack/react-table";

import { PurchaseOrderItemDtoRead } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<PurchaseOrderItemDtoRead>[] = [
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "uom",
    header: "Unit of Measurement",
    cell: ({ row }) => <div>{row.original.uom?.name}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>{row.original.price}</div>,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <div>{(row.original.price || 0) * (row.original.quantity || 0)}</div>
    ),
  },
];
