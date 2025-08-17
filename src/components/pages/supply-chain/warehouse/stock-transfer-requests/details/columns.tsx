import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import {
  BatchStatus,
  Units,
  convertToLargestUnit,
  getEnumBadgeWithHexColors,
  getSmallestUnit,
} from "@/lib";
import { BatchToSupply } from "@/lib/redux/api/openapi.generated";
import StatusBadge from "@/shared/status-badge";

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
    cell: ({ row }) => {
      const status = row.original?.batch?.status as BatchStatus;
      const { label, style } = getEnumBadgeWithHexColors(BatchStatus, status);

      return <StatusBadge label={label} style={style} />;
    },
  },
];
