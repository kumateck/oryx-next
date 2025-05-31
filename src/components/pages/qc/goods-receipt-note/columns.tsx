import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { SampleData } from ".";

const batchStatusColors = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-grey-100 text-gray-800";
    case "Approved":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
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
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`${batchStatusColors(row.original.status.toLocaleString())} rounded-full px-2 py-1 w-fit text-center`}
      >
        {row.original.status}
      </div>
    ),
  },
];
