import { ColumnDef } from "@tanstack/react-table";

import { MaterialDetailsDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<MaterialDetailsDto>[] = [
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original?.material?.name}</div>,
  },
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original?.material?.code}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original?.material?.totalStock}</div>,
  },
];
