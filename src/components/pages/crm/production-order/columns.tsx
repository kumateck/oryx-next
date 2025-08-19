"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ProductionOrderDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { TableMenuAction } from "@/shared/table-menu";
import { useState } from "react";
import { DropdownMenuItem, Button } from "@/components/ui";
import { CreateInvoiceSchema } from "./pro-formal-invoice/type";
import CreateProFormalInvoice from "./pro-formal-invoice";
// import { ProductionOrderType } from "@/lib";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ProductionOrderDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<CreateInvoiceSchema>(
    {} as CreateInvoiceSchema,
  );
  return (
    <section>
      <TableMenuAction>
        {isOpen && (
          <CreateProFormalInvoice
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            details={details}
          />
        )}
        <DropdownMenuItem className="group">
          <Button
            variant="ghost"
            className="w-full gap-1 text-center items-center justify-center"
            onClick={() => {
              setDetails({
                productionOrderId: row.original.id as string,
                productionOrderName: row.original.code as string,
                products:
                  row.original?.products?.map((product) => ({
                    productId: product.product?.id as string,
                    productName: product.product?.name as string,
                    quantity: product.totalOrderQuantity as number,
                  })) || ([] as CreateInvoiceSchema["products"]),
              });
              setIsOpen(true);
            }}
          >
            <span>Create Pro-formal Invoice</span>
          </Button>
        </DropdownMenuItem>
      </TableMenuAction>
    </section>
  );
}

export const columns: ColumnDef<ProductionOrderDto>[] = [
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
  // {
  //   id: "action",
  //   meta: {
  //     omitRowClick: true,
  //   },
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
