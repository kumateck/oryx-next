import { ColumnDef } from "@tanstack/react-table";

import { PurchaseOrderItemDtoRead } from "@/lib/redux/api/openapi.generated";

export const getColumns = (
  currency: string,
): ColumnDef<PurchaseOrderItemDtoRead>[] => [
  {
    accessorKey: "number",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "materialId",
    header: "Material",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "uom",
    header: "UOM",
    cell: ({ row }) => <div>{row.original.uom?.name}</div>,
  },
  {
    accessorKey: "quantity",
    header: " Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div>
        {currency} {row.original.price}
      </div>
    ),
  },
];
