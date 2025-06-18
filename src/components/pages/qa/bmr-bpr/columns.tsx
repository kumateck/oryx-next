import { ProductAnalyticalRawDataDto } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductAnalyticalRawDataDto>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "batchNumbe",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
];
