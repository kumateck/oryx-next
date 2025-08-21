"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductionOrderProductsDto } from "@/lib/redux/api/openapi.generated";
// import { ProductionOrderType } from "@/lib";

export const columns: ColumnDef<ProductionOrderProductsDto>[] = [
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => <div className="min-w-36">{row.index + 1}</div>,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.product?.name ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.product?.code ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="">{row.original?.totalOrderQuantity ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "Volume",
    header: "Volume Per Pieces",
    cell: ({ row }) => (
      <div className="">{row.original?.volumePerPiece ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "totalBatches",
    header: "Total Batches",
    cell: ({ row }) => (
      <div className="">{row.original?.totalBatches ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => (
      <div className="">{row.original.product?.name && "N/A"}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="">{row.original && "N/A"}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className=" px-2 py-1 text-xs rounded-3xl bg-gray-200">
        {row && "Pending"}
      </div>
    ),
  },
];
