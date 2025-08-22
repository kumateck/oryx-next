import { AllocateProductionOrderProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns";

export const column: ColumnDef<AllocateProductionOrderProductDtoRead>[] = [
  {
    accessorKey: "ProductName",
    header: "Order Code",
    cell: ({ row }) => <div>{row.original?.product?.code}</div>,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original?.product?.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Product Description",
    cell: ({ row }) => <div>{row.original?.product?.description}</div>,
  },
  {
    accessorKey: "description",
    header: "Product Description",
    cell: ({ row }) => <div>{row.original?.product?.symbol}</div>,
  },
];
