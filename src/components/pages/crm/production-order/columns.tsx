"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductionOrderDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";

export const columns: ColumnDef<ProductionOrderDto>[] = [
  {
    accessorKey: "productOrderCode",
    header: "Product Order Code",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.productionOrderCode ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.customer?.name ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original?.createdAt
          ? format(new Date(row.original.createdAt), "yyyy-MM-dd")
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "numberOfOrders",
    header: "Number of Orders",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.products?.length ?? "N/A"}</div>
    ),
  },
  {
    accessorKey: "totalValue",
    header: "Total Value",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.totalValue ?? "N/A"}</div>
    ),
  },
];
