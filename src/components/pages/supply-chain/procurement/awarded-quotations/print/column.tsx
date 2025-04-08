import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";
import { PurchaseOrderItemDtoRead } from "@/lib/redux/api/openapi.generated";

export const getColums = (
  currency: string,
): ColumnDef<PurchaseOrderItemDtoRead>[] => [
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div>
        {
          convertToLargestUnit(
            row.original.quantity as number,
            row.original.uom?.symbol as Units,
          ).value
        }
      </div>
    ),
  },
  {
    accessorKey: "uom",
    header: "UOM",
    cell: ({ row }) => (
      <div>
        {
          convertToLargestUnit(
            row.original.quantity as number,
            row.original.uom?.symbol as Units,
          ).unit
        }
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div>
        {" "}
        {currency} {row.original.price}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => (
      <div>
        {currency}{" "}
        {(
          (row.original.price || 0) *
          (convertToLargestUnit(
            row.original.quantity as number,
            row.original.uom?.symbol as Units,
          ).value || 0)
        ).toFixed(2)}
      </div>
    ),
  },
];
