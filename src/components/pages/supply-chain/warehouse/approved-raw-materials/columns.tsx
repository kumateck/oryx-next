import { ColumnDef } from "@tanstack/react-table";

import { MaterialBatchDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<MaterialBatchDto>[] = [
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.checklist?.material?.name}</div>,
  },
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.checklist?.material?.code}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div>{row.original.checklist?.material?.totalStock}</div>
    ),
  },
];
