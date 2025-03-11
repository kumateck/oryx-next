import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Units, convertToLargestUnit } from "@/lib";
import {
  BinCardInformationDto,
  ShelfMaterialBatchDto,
} from "@/lib/redux/api/openapi.generated";

export const generalColumns: ColumnDef<ShelfMaterialBatchDto>[] = [
  {
    accessorKey: "warehouseLocation",
    header: "Warehouse Location",
    cell: ({ row }) => <div>{row.original.warehouseLocationShelf?.code}</div>,
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatch?.checklist?.manufacturer?.name ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "arNumber",
    header: "AR Number",
    cell: ({}) => <div>{"-"}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.materialBatch?.checklist?.material?.totalStock as number,
        row.original.uoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value !== 0 ? qty.value.toFixed(2) + qty.unit : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatch?.manufacturingDate?.split("T")[0] ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>{row.original.materialBatch?.expiryDate?.split("T")[0] ?? "-"}</div>
    ),
  },
  {
    accessorKey: "retestdate",
    header: "Retest Date",
    cell: ({ row }) => (
      <div>{row.original.materialBatch?.retestDate?.split("T")[0] ?? "-"}</div>
    ),
  },
];

export const bincardColumns: ColumnDef<BinCardInformationDto>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original?.createdAt, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>{row.original.batch?.checklist?.supplier?.name}</div>
    ),
  },
  {
    accessorKey: "waybill",
    header: "Waybill",
    cell: ({ row }) => <div>{row.original.wayBill ?? "-"}</div>,
  },
  {
    accessorKey: "arNumber",
    header: "AR No.",
    cell: ({ row }) => <div>{row.original.arNumber ?? "-"}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original?.batch?.manufacturingDate
          ? format(
              row.original?.batch?.manufacturingDate as string,
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
        {row.original?.batch?.expiryDate
          ? format(row.original?.batch?.expiryDate as string, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "quantityReceived",
    header: "Quantity Received",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantityReceived as number,
        row.original.uoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value !== 0 ? qty.value.toFixed(2) + qty.unit : ""}
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
        row.original.uoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value !== 0 ? qty.value.toFixed(2) + qty.unit : ""}
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
        row.original.uoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value.toFixed(2)} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.product?.name ?? "-"}</div>,
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batch?.batchNumber ?? "-"}</div>,
  },
];
