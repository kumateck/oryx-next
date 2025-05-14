import { ColumnDef } from "@tanstack/react-table";

import { ActivityLogDto } from "@/lib/redux/api/openapi.generated";
import { format } from "date-fns";

export const columns: ColumnDef<ActivityLogDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="min-w-36 flex items-center gap-2">
        {/* {row.original.user?.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.original.user.avatar}
            alt={`${row.original.user.firstName}'s avatar`}
            width={24}
            height={24}
            className="rounded-full"
          />
        )} */}
        {row.original.user?.firstName} {row.original.user?.lastName}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <div className="min-w-36">{row.original.action}</div>,
  },
  {
    accessorKey: "dateTime",
    header: "Date and Time",
    cell: ({ row }) => {
      const actionDate = new Date(row.original.createdAt as string);
      const dateStr = format(actionDate, "MMM dd, yyyy");
      const timeStr = format(actionDate, "h:mm a");

      return (
        <div className="min-w-36">
          {dateStr} @ {timeStr}
        </div>
      );
    },
  },
];
