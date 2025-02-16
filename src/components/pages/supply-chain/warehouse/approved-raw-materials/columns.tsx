import { ColumnDef } from "@tanstack/react-table";

import { ProductionScheduleDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<ProductionScheduleDto>[] = [
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.remarks}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
];
