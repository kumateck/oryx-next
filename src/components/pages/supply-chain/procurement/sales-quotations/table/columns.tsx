import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";
import { ColumnType } from "@/shared/datatable";

// import Edit from "./edit";
import { MaterialRequestDto } from "./type";

export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  currency?: string,
): ColumnDef<MaterialRequestDto>[] => [
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div>
        {
          convertToLargestUnit(
            row.original.quantity as number,
            row.original.uom as Units,
          ).value
        }
      </div>
    ),
  },
  {
    accessorKey: "uom",
    header: "Unit of Measurement",
    cell: ({ row }) => (
      <div>
        {convertToLargestUnit(
          row.original.quantity as number,
          row.original.uom as Units,
        ).unit ?? row.original.uom}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    meta: {
      edittableCell: {
        type: ColumnType.NUMBER,
        prefixText: currency,
        editable: true,
        required: true,
        setItemLists,
      },
    },
  },
];
