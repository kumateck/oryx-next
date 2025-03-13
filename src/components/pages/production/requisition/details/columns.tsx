import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit, getSmallestUnit } from "@/lib";
import { RequisitionItemDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<RequisitionItemDto>[] = [
  {
    accessorKey: "code",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.material?.code ?? "-"}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.material?.name ?? "-"}</div>,
  },
  {
    accessorKey: "requestedQuantity",
    header: "Requested Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantity as number,
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div>
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
];
