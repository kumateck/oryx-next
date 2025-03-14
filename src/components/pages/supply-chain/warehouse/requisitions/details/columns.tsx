import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Units, convertToLargestUnit, getSmallestUnit } from "@/lib";
import {
  BatchToSupply,
  RequisitionItemDto,
} from "@/lib/redux/api/openapi.generated";

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

export const getColumns = (): ColumnDef<RequisitionItemDto>[] => [
  {
    accessorKey: "code",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.material?.code}</div>,
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },

  {
    accessorKey: "requestedQty",
    header: "Requested Qty",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original?.quantity as number,
        getSmallestUnit(row.original?.uoM?.symbol as Units),
      );
      return <div>{`${qty.value} ${qty.unit}`}</div>;
    },
  },
  {
    accessorKey: "issuedQty",
    header: "Total Issued Qty",

    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original?.quantity as number,
        getSmallestUnit(row.original?.uoM?.symbol as Units),
      );
      return <div>{`${qty.value} ${qty.unit}`}</div>;
    },
  },
  {
    accessorKey: "batchbreakdown",
    header: "Batchwise Breakdown",
    cell: ({ row }) => (
      <div>
        <ul className="flex flex-wrap gap-2">
          {row.original.batches?.map((batch: BatchToSupply, idx: number) => {
            const qty = convertToLargestUnit(
              batch?.quantityToTake as number,
              getSmallestUnit(row.original?.uoM?.symbol as Units),
            );
            return (
              <li
                className="inline-block rounded-2xl border px-2 py-1 text-sm"
                key={idx}
              >
                <div className="flex gap-2">
                  <div className="text-primary-default">
                    {batch.batch?.batchNumber}
                  </div>
                  <div className="font-semibold">
                    ({`${qty.value} ${qty.unit}`})
                  </div>
                </div>
                <div className="text-xs text-danger-default">
                  {batch.batch?.expiryDate
                    ? format(
                        new Date(batch?.batch?.expiryDate ?? ""),
                        "MMM d, yyyy",
                      )
                    : "N/A"}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    ),
  },
];
