import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";
import { MaterialDetailsDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<MaterialDetailsDto>[] = [
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original?.material?.code}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original?.material?.name}</div>,
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original?.totalAvailableQuantity as number,
        row.original.unitOfMeasure?.symbol as Units,
      );
      return (
        <div>
          {qty.value}
          {qty.unit}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "reOrderLevel",
  //   header: "Reorder Level",
  //   cell: ({ row }) => <div>{row.original?.material?.reOrderLevel}</div>,
  // },
];
