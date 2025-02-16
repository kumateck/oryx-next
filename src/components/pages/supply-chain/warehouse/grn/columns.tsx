import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { ProductionScheduleDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<ProductionScheduleDto>[] = [
  {
    accessorKey: "code",
    header: "GRN Number",
    cell: ({ row }) => <div className="min-w-36">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "scheduledEndTime",
    header: "Number of Items",
    cell: ({ row }) => <div>{row.original.remarks}</div>,
  },
  {
    accessorKey: "scheduledStartTime",
    header: "Date Received",
    cell: ({ row }) => (
      <div>
        {row.original.scheduledStartTime
          ? format(new Date(row.original.scheduledStartTime), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  // {
  //   accessorKey: "remarks",
  //   header: "Remarks",
  //   cell: ({ row }) => <div>{row.original.remarks}</div>,
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
