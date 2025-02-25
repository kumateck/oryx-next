import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Icon } from "@/components/ui";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

import AssignLocationDialog from "./assign-location";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends BatchColumns>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState<BatchColumns | null>(null);
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              setSelectedBatch(row.original);
              setIsAssignLocationOpen(true);
            }}
          >
            <Icon
              name="MapPin"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Assign Location</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      <AssignLocationDialog
        open={isAssignLocationOpen}
        onOpenChange={setIsAssignLocationOpen}
        onSuccess={() => dispatch(commonActions.setTriggerReload())}
        selectedBatch={selectedBatch}
      />
    </section>
  );
}

export interface BatchColumns {
  id?: string;
  code?: string | null;
  batchNumber?: string | null;
  materialName?: string | null;
  manufacturerName?: string | null;
  invoiceNumber?: string | null;
  status?: number;
  dateReceived?: string;
  dateApproved?: string | null;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string;
}

export const getColumns = (): ColumnDef<BatchColumns>[] => [
  {
    accessorKey: "code",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber ?? "N/A"}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.materialName ?? "N/A"}</div>,
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => <div>{row.original.manufacturerName ?? "N/A"}</div>,
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => <div>{row.original.invoiceNumber ?? "N/A"}</div>,
  },
  {
    accessorKey: "totalQuantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.totalQuantity}</div>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <div>{row.original.expiryDate}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Expiry Date",
    cell: ({ row }) => <div>{row.original.expiryDate}</div>,
  },
  {
    accessorKey: "retestDate",
    header: "Retest Date",
    cell: ({ row }) => <div>{row.original.expiryDate}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
