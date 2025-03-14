import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";

import { MaterialRequestDto } from "./types";

export const columns: ColumnDef<MaterialRequestDto>[] = [
  {
    accessorKey: "code",
    header: "Material Code",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturers",
  },
  {
    accessorKey: "expectedQuantity",
    header: "Order Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.expectedQuantity as number,
        row.original.uomName as Units,
      );
      return (
        <div className="">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "uomName",
    header: "Unit of Measurement",
  },
  {
    accessorKey: "costPrice",
    header: "Price per Unit",
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({ row }) => (
      <div>
        {row.original.costPrice !== undefined
          ? Number(row.original.receivedQuantity) *
            Number(row.original.costPrice)
          : "-"}
      </div>
    ),
  },
];
