import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Units, convertToLargestUnit } from "@/lib";
import { BatchManufacturingRecordDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<BatchManufacturingRecordDto>[] = [
  {
    accessorKey: "createdAt",
    header: "Date Requested",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "productionSchedule",
    header: "Schedule #",
    cell: ({ row }) => <div>{row.original.productionSchedule?.code}</div>,
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => <div>{row.original.product?.code}</div>,
  },
  {
    accessorKey: "product",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.product?.name}</div>,
  },
  {
    accessorKey: "batchQuantity",
    header: "Batch Size",
    cell: ({ row }) => {
      const converted = convertToLargestUnit(
        row.original.batchQuantity as number,
        row.original.product?.baseUoM?.symbol as Units,
      );
      return (
        <div>
          {converted?.value}
          {converted?.unit}
        </div>
      );
    },
  },
];
