import { ColumnDef } from "@tanstack/react-table";
import { MaterialDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<MaterialDto>[] = [
  {
    accessorKey: "srNumber",
    header: "SR Number",

    cell: ({ row }) => <div>{row.getValue("srNumber") ?? "N/A"}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.materialCategory?.name}</div>,
  },
  {
    accessorKey: "code",
    header: "Code",

    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    accessorKey: "pharmacopoeia",
    header: "Pharmacopoeia",
    cell: ({ row }) => <div>{row.original.pharmacopoeia}</div>,
  },
];
