import { ServiceDto } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<ServiceDto>[] = [
  {
    accessorKey: "serviceCode",
    header: "Service Code",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "serviceName",
    header: "Service Name",
    cell: ({ row }) => <div>{row.original?.name}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div>
        {row.original?.startDate
          ? format(row.original.startDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      // { row }
      <div>
        {row.original.endDate
          ? format(row.original.endDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
];
