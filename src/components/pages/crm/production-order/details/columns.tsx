"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductionOrderProductsDto } from "@/lib/redux/api/openapi.generated";
import { sanitizeNumber } from "@/lib";
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
      <div className="">{row.original?.totalOrderQuantity}</div>
    ),
  },
  {
    accessorKey: "Volume",
    header: "Volume Per Pieces",
    cell: ({ row }) => (
      <div className="">{row.original?.product?.basePackingQuantity}</div>
    ),
  },
  {
    accessorKey: "totalBatches",
    header: "Total Batches",
    cell: ({ row }) => {
      const totalBatches =
        (sanitizeNumber(row.original.totalOrderQuantity) *
          sanitizeNumber(row.original?.product?.basePackingQuantity)) /
        sanitizeNumber(row.original?.product?.fullBatchSize);
      return <div className="">{totalBatches}</div>;
    },
  },
  {
    accessorKey: "packPerShipper",
    header: "Pack Per Shipper",
    cell: ({ row }) => (
      <div className="">{row.original.product?.packPerShipper}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    cell: ({ row }) => <div className="">{row.original.product?.price}</div>,
  },
  {
    accessorKey: "cost",
    header: "Total Cost",
    cell: ({ row }) => {
      const totalcost =
        sanitizeNumber(row.original.totalOrderQuantity) *
        sanitizeNumber(row.original.product?.price);
      return <div className="">{totalcost}</div>;
    },
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
