import { ColumnDef } from "@tanstack/react-table";

import { LeaveRequestDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";
import { LeaveStatus } from "@/lib";

export const columns: ColumnDef<LeaveRequestDto>[] = [
  {
    id: "daysRequested",
    header: "Days Requested",
    cell: ({ row }) => {
      if (!row.original.endDate || !row.original.startDate) return 0;
      const diff =
        new Date(row.original.endDate).getTime() -
        new Date(row.original.startDate).getTime();
      return Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      return row.original.startDate
        ? format(row.original.startDate, "MMM d, yyyy")
        : "N/A";
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      return row.original.endDate
        ? format(row.original.endDate, "MMM d, yyyy")
        : "N/A";
    },
  },
  {
    id: "leaveBalance",
    header: "Leave Balance",
    cell: ({ row }) => {
      return row.original.employee?.annualLeaveDays || 0;
    },
  },
  {
    id: "leaveStatus",
    header: "Status",
    cell: ({ row }) => {
      return LeaveStatus[row.original.leaveStatus as LeaveStatus];
    },
  },
];
