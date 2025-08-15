"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductionOrderDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { TableCheckbox } from "@/shared/datatable/table-check";
// import { ProductionOrderType } from "@/lib";

export const columns: ColumnDef<ProductionOrderDto>[] = [
  TableCheckbox<ProductionOrderDto>({}),
  {
    accessorKey: "productOrderCode",
    header: "Product Order Code",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.code ?? "N/A"}</div>
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
          ? format(new Date(row.original.createdAt), "dd MMMM, yyyy")
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
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className=" px-2 py-1 text-center text-xs rounded-3xl bg-gray-200">
        {row && "Pending"}
      </div>
    ),
  },
];
