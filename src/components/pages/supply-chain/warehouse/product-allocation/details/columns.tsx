import { ProductionOrderProductsDto } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";
// import { format } from "date-fns";

export const column: ColumnDef<ProductionOrderProductsDto>[] = [
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
    accessorKey: "totalOrderQuantity",
    header: "Total Order Qty",
    cell: ({ row }) => <div>{row.original?.totalOrderQuantity}</div>,
  },
  {
    accessorKey: "volumePerPiece",
    header: "Volume Per Piece",
    cell: ({ row }) => <div>{row.original?.volumePerPiece}</div>,
  },
  {
    accessorKey: "totalBatches",
    header: "Total Batches",
    cell: ({ row }) => <div>{row.original?.totalBatches}</div>,
  },
  {
    accessorKey: "totalValue",
    header: "Total Value",
    cell: ({ row }) => <div>{row.original?.totalValue}</div>,
  },
  {
    accessorKey: "fulfilled",
    header: "Fulfilled",
    cell: ({ row }) => (
      <div
        className={`px-2 py-1 rounded-xl text-center ${row.original?.fulfilled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
      >
        {row.original?.fulfilled ? "Yes" : "No"}
      </div>
    ),
  },
];
