import { sanitizeNumber } from "@/lib";
import {
  BinCardInformationDtoRead,
  FinishedGoodsTransferNoteDtoRead,
} from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const generalColumn: ColumnDef<FinishedGoodsTransferNoteDtoRead>[] = [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => (
      <div>{row.original.batchManufacturingRecord?.batchNumber}</div>
    ),
  },
  {
    accessorKey: "qarNumber",
    header: "QAR #",
    cell: ({ row }) => <div>{row.original?.qarNumber}</div>,
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
    accessorKey: "quantityPerPack",
    header: "Qty Per Pack",
    cell: ({ row }) => <div>{row.original.quantityPerPack}</div>,
  },
  {
    accessorKey: "packageStyle",
    header: "Packing Style",
    cell: ({ row }) => (
      <div>
        {row.original.totalQuantity} {row.original.packageStyle?.name}
      </div>
    ),
  },
  {
    accessorKey: "loose",
    header: "Loose/Pack",
    cell: ({ row }) => <div>{row.original.loose}</div>,
  },
  {
    accessorKey: "totalQuantity",
    header: "Total Qty Transfer",
    cell: ({ row }) => {
      const total =
        sanitizeNumber(row.original.quantityPerPack) *
          sanitizeNumber(row.original.totalQuantity) +
        sanitizeNumber(row.original.loose);

      return (
        <div>
          {total} {row.original.uoM?.symbol}
        </div>
      );
    },
  },
];

export const bincardColumn: ColumnDef<BinCardInformationDtoRead>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>
        {row.original?.createdAt
          ? format(row.original?.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original?.description}</div>,
  },
  {
    accessorKey: "wayBill",
    header: "Waybill",
    cell: ({ row }) => <div>{row.original?.wayBill}</div>,
  },
  {
    accessorKey: "materialBatch",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original?.materialBatch?.batchNumber}</div>,
  },
  {
    accessorKey: "arNumber",
    header: "AR No.",
    cell: ({ row }) => <div>{row.original?.arNumber}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatch?.manufacturingDate
          ? format(row.original.materialBatch?.manufacturingDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatch?.expiryDate
          ? format(row.original.materialBatch?.expiryDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "quantityReceived",
    header: "Quantity Received",
    cell: ({ row }) => {
      return (
        <div className=" text-green-700 ">{row.original.quantityReceived}</div>
      );
    },
  },
  {
    accessorKey: "quantityIssued",
    header: "Quantity Issued",
    cell: ({ row }) => {
      return (
        <div className="w-full text-red-700 ">
          {row.original.quantityIssued}
        </div>
      );
    },
  },
  {
    accessorKey: "balanceQuantity",
    header: "Balance Quantity",
    cell: ({ row }) => {
      return <div>{row.original.balanceQuantity}</div>;
    },
  },
];
