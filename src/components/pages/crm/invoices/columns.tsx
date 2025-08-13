"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { InvoiceDto } from "@/lib/redux/api/openapi.generated";
import { DropdownMenuItem, Icon } from "@/components/ui";
import { TableMenuAction } from "@/shared/table-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<
  TData extends InvoiceDto,
>({}: DataTableRowActionsProps<TData>) {
  return (
    <TableMenuAction>
      <DropdownMenuItem className="group flex items-center justify-center gap-1">
        <Icon name="Download" className="h-5 w-5 text-neutral-500" />
        <span>Download</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="group flex items-center justify-center gap-1">
        <Icon name="Pencil" className="h-5 w-5 text-neutral-500" />
        <span>Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="group flex items-center justify-center gap-1">
        <Icon name="ChartBarStacked" className="h-5 w-5 text-neutral-500" />
        <span>Mark as paid</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="group flex items-center justify-center gap-1">
        <Icon name="Truck" className="h-5 w-5 text-neutral-500" />
        <span>Create shipment</span>
      </DropdownMenuItem>
    </TableMenuAction>
  );
}

export const columns: ColumnDef<InvoiceDto>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.proformaInvoice?.productionOrder?.code ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.proformaInvoice?.productionOrder?.customer?.name ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "totalAmmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original?.proformaInvoice?.productionOrder?.totalValue ?? "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.status ?? "N/A"}</div>
    ),
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
