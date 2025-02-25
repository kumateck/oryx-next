import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Icon } from "@/components/ui";
import { BatchStatus as BatchStatusEnum } from "@/lib";
import { BatchStatus } from "@/lib/redux/api/openapi.generated";
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
  status?: BatchStatus;
  dateReceived?: string;
  dateApproved?: string | null;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string;
}

const batchStatusColors: Record<BatchStatus, string> = {
  [BatchStatusEnum.Received]: "bg-blue-100 text-blue-800",
  [BatchStatusEnum.Quarantine]: "bg-yellow-100 text-yellow-800",
  [BatchStatusEnum.Testing]: "bg-purple-100 text-purple-800",
  [BatchStatusEnum.Available]: "bg-green-100 text-green-800",
  [BatchStatusEnum.Rejected]: "bg-red-100 text-red-800",
  [BatchStatusEnum.Retest]: "bg-orange-100 text-orange-800",
  // [BatchStatusEnum.Frozen]: "bg-orange-100 text-orange-800",
  // [BatchStatusEnum.Consumed]: "bg-orange-100 text-orange-800",
};

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
    header: "Manufacturing Date",
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
    cell: ({ row }) => {
      const status = row.original.status as BatchStatus;
      return (
        <div
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        >
          {BatchStatusEnum[status]}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
