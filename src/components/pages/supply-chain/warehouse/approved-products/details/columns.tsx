import { convertToLargestUnit, getSmallestUnit, Units } from "@/lib";
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
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.totalQuantity}</div>,
  },
  {
    accessorKey: "manufactureData",
    header: "Manufacture Date",
    cell: ({ row }) => (
      <div>
        {row.original.batchManufacturingRecord?.manufacturingDate
          ? format(
              row.original.batchManufacturingRecord?.manufacturingDate,
              "MMM d, yyyy",
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
        {row.original?.batchManufacturingRecord?.expiryDate &&
          format(
            row.original.batchManufacturingRecord?.expiryDate ?? "",
            "MMM d, yyyy",
          )}
      </div>
    ),
  },
];

export const bincardColumn: ColumnDef<BinCardInformationDtoRead>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>{format(row.original.createdAt ?? "", "MMM d, yyyy")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },
  {
    accessorKey: "wayBill",
    header: "Waybill",
    cell: ({ row }) => <div>{row.original.wayBill}</div>,
  },
  {
    accessorKey: "materialBatch",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.materialBatch?.batchNumber}</div>,
  },
  {
    accessorKey: "arNumber",
    header: "AR No.",
    cell: ({ row }) => <div>{row.original.arNumber}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {format(
          row.original.materialBatch?.manufacturingDate ?? "",
          "MMM d, yyyy",
        )}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {format(row.original.materialBatch?.expiryDate ?? "", "MMM d, yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "quantityReceived",
    header: "Quantity Received",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantityReceived as number,
        getSmallestUnit(row.original.materialBatch?.uoM?.symbol as Units),
      );
      return (
        <div className=" text-green-700 ">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "quantityIssued",
    header: "Quantity Issued",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantityIssued as number,
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div className="w-full text-red-700 ">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "balanceQuantity",
    header: "Balance Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.balanceQuantity as number,
        getSmallestUnit(row.original.uoM?.symbol as Units),
      );
      return (
        <div>
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.product?.name}</div>,
  },
];
