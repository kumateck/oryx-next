import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { DistributedFinishedProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { Button, DropdownMenuItem, Icon } from "@/components/ui";
import { TableMenuAction } from "@/shared/table-menu";
import { useState } from "react";
import { ApproveTransferNote } from "./approve";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends DistributedFinishedProductDtoRead,
>({ row }: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <Button onClick={() => setOpen(true)}>
            <Icon
              name="Check"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Approve</span>
          </Button>
        </DropdownMenuItem>
      </TableMenuAction>
      <ApproveTransferNote
        isOpen={open}
        onClose={() => setOpen(false)}
        id={row.original.id as string}
      />
    </section>
  );
}

export const columns: ColumnDef<DistributedFinishedProductDtoRead>[] = [
  {
    accessorKey: "qarNumber",
    header: "Transfer Note Code",
    cell: ({ row }) => <div>{row.original.transferNote?.qarNumber}</div>,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.product?.name}</div>,
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => <div>{row.original.product?.code}</div>,
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => (
      <div>{row.original.batchManufacturingRecord?.batchNumber}</div>
    ),
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.batchManufacturingRecord?.manufacturingDate
          ? format(
              row.original.batchManufacturingRecord?.manufacturingDate,
              "MMMM dd, yyyy",
            )
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original.batchManufacturingRecord?.expiryDate
          ? format(
              row.original.batchManufacturingRecord?.expiryDate,
              "MMMM dd, yyyy",
            )
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Transfer Quantity",
    cell: ({ row }) => (
      <div>{`${row.original.quantity} ${row.original.uom?.name}`} </div>
    ),
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
