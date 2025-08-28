import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";
import { SupplierQuotationItemDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<SupplierQuotationItemDto>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div>{row.original.material?.code}</div>,
  },
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
            row.original.uoM?.symbol as Units,
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
          row.original.uoM?.symbol as Units,
        ).unit ?? row.original.uoM?.name}
      </div>
    ),
  },
];
