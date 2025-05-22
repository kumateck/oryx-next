import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  BatchStatus,
  Units,
  convertToLargestUnit,
  getSmallestUnit,
} from "@/lib";
import { Icon } from "@/components/ui";
import { BatchToSupply } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { TableMenuAction } from "@/shared/table-menu";
import { DropdownMenuItem } from "@/components/ui";
import AssignLocationDialog from "./assign-location";

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

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends BatchToSupply>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState<BatchToSupply | null>(
    null,
  );
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

export const getColumns = (): ColumnDef<BatchToSupply>[] => [
  {
    accessorKey: "code",
    header: "Material Batch #",
    cell: ({ row }) => <div>{row.original.batch?.batchNumber ?? "N/A"}</div>,
  },
  {
    accessorKey: "totalqty",
    header: "Available Qty",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original?.batch?.remainingQuantity as number,
        getSmallestUnit(row.original?.batch?.uoM?.symbol as Units),
      );
      return <div>{`${qty.value} ${qty.unit}`}</div>;
    },
  },
  {
    accessorKey: "requestedQty",
    header: "Requested Qty",
    // cell: ({ row }) => {
    //   return <div>{row.original?.quantityToTake ?? "N/A"}</div>;
    // },
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original?.quantityToTake as number,
        getSmallestUnit(row.original?.batch?.uoM?.symbol as Units),
      );
      return <div>{`${qty.value} ${qty.unit}`}</div>;
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original?.batch?.expiryDate
          ? format(
              new Date(row?.original?.batch?.expiryDate ?? ""),
              "MMM d, yyyy",
            )
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>{BatchStatus[row.original.batch?.status as number]}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
