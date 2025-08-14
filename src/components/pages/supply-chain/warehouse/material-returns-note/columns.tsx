import { ColumnDef } from "@tanstack/react-table";
import { MaterialReturnNoteDtoRead } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { cn, getEnumBadge, MaterialReturnsStatus } from "@/lib";

// const batchStatusColors: Record<MaterialReturnsStatus, string> = {
//   [MaterialReturnsStatus.Pending]: "bg-gray-500 text-white",
//   [MaterialReturnsStatus.Approved]: "bg-green-100 text-green-800",
//   [MaterialReturnsStatus.Rejected]: "bg-red-100 text-red-800",
// };

export const columns: ColumnDef<MaterialReturnNoteDtoRead>[] = [
  {
    accessorKey: "productionSchedule",
    header: "Production Schedule",
    cell: ({ row }) => <div>{row.original.productionSchedule?.code}</div>,
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.product?.name}</div>,
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber}</div>,
  },
  {
    accessorKey: "returnType",
    header: "Return Type",
    cell: ({ row }) => {
      const isFull = row.original.isFullReturn;
      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            isFull
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isFull ? "Full" : "Partial"}
        </span>
      );
    },
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    cell: ({ row }) => (
      <div>
        {row.original.returnDate
          ? format(row.original.returnDate, "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  //isFullReturn

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as MaterialReturnsStatus;
      const { label, colorClass } = getEnumBadge(MaterialReturnsStatus, status);
      return (
        <div
          className={cn(
            `inline-block rounded-full px-2 py-1 text-xs font-medium `,
            colorClass,
          )}
        >
          {label}
        </div>
      );
    },
  },
];
