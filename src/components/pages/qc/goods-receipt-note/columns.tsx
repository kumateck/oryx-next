import { ColumnDef } from "@tanstack/react-table";
import { ApprovalStatus, GRNStatus, splitWords } from "@/lib";
import { format } from "date-fns";
import { SampleData } from ".";

const batchStatusColors: Record<GRNStatus, string> = {
  [GRNStatus.Pending]: "bg-gray-500 text-white",
  [GRNStatus.IN_PROGRESS]: "bg-green-100 text-green-800",
  [GRNStatus.Completed]: "bg-red-100 text-red-800",
};

export const columns: ColumnDef<SampleData>[] = [
  {
    accessorKey: "grnNumber",
    header: "GRN Number",
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
  {
    accessorKey: "items",
    header: "Number of Items",
    cell: ({ row }) => <div>{row.original.items}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Received At",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original?.createdAt, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as ApprovalStatus;
      const formattedStatus = splitWords(ApprovalStatus[status]);
      return (
        <div
          className={`inline-block rounded-full ml-auto px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        >
          {formattedStatus}
        </div>
      );
    },
  },
];
