import { DistributedFinishedProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DistributedFinishedProductDtoRead>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original?.product?.name}</div>,
  },

  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => <div>{row.original?.product?.code}</div>,
  },
  {
    accessorKey: "productQuantity",
    header: "Product Quantity",
    cell: ({ row }) => <div>{row.original?.quantity}</div>,
  },
];
