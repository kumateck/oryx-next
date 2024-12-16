import { ColumnDef } from "@tanstack/react-table";

import { SourceRequisitionItemDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<SourceRequisitionItemDto>[] = [
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "uom",
    header: "Unit of Measurement",
    cell: ({ row }) => <div>{row.original.uoM?.name}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
];
