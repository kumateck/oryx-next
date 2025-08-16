import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { GrnListDto } from "@/lib/redux/api/openapi.generated";
import { getEnumBadge, GRNStatus } from "@/lib";
import StatusBadge from "@/shared/status-badge";

export const columns: ColumnDef<GrnListDto>[] = [
  {
    accessorKey: "grnNumber",
    header: "GRN Number",
    cell: ({ row }) => <div>{row.original.grnNumber}</div>,
  },
  {
    accessorKey: "items",
    header: "Number of Items",
    cell: ({ row }) => <div>{row.original.materialBatches?.length}</div>,
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
    cell: ({ row }) => {
      const status = row.original.status as GRNStatus;
      const { label, colorClass } = getEnumBadge(GRNStatus, status);

      return <StatusBadge label={label} colorClass={colorClass} />;
    },
  },
];
