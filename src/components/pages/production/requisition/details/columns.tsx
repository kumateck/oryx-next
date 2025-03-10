import { ColumnDef } from "@tanstack/react-table";

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
    cell: ({ row }) => <div>{row.original.quantity ?? "-"}</div>,
  },
];
