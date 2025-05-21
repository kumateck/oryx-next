import { ColumnDef } from "@tanstack/react-table";
import { MaterialReturnNoteDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { MaterialReturnsStatus } from "@/lib";

const batchStatusColors: Record<MaterialReturnsStatus, string> = {
  [MaterialReturnsStatus.Pending]: "bg-gray-500 text-white",
  [MaterialReturnsStatus.Approved]: "bg-green-100 text-green-800",
  [MaterialReturnsStatus.Rejected]: "bg-red-100 text-red-800",
};

export const columns: ColumnDef<MaterialReturnNoteDto>[] = [
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
  {
    accessorKey: "productionSchedule",
    header: "Production Schedule",
    cell: ({ row }) => <div>{row.original.productionSchedule?.code}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as MaterialReturnsStatus;
      return (
        <div
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        >
          {MaterialReturnsStatus[status]}
        </div>
      );
    },
  },
];
