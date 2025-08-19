"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ProformaInvoiceDto } from "@/lib/redux/api/openapi.generated";
import { DropdownMenuItem, Icon } from "@/components/ui";
import { TableMenuAction } from "@/shared/table-menu";
import { useState } from "react";
import AttachProductionOrder from "./attech-production-order";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ProformaInvoiceDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TableMenuAction>
      {isOpen && (
        <AttachProductionOrder
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          id={row.original.id as string}
        />
      )}
      <DropdownMenuItem
        onClick={() => setIsOpen(true)}
        className="group flex items-center justify-center gap-1"
      >
        <Icon name="Upload" className="h-5 w-5 text-neutral-500" />
        <span>Attach Purchase Order</span>
      </DropdownMenuItem>
    </TableMenuAction>
  );
}

export const columns: ColumnDef<ProformaInvoiceDto>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.productionOrder?.code ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.productionOrder?.customer?.name ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "totalAmmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original?.productionOrder?.totalValue ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="min-w-36">{row.original && "N/A"}</div>,
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
