import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { GrnListDto } from "@/lib/redux/api/openapi.generated";
import { getEnumBadge, GRNStatus } from "@/lib";
import StatusBadge from "@/shared/status-badge";

export const columns: ColumnDef<GrnListDto>[] = [
  {
    accessorKey: "grnNumber",
    header: "GRN Number",
    cell: ({ row }) => <div className="min-w-36">{row.original.grnNumber}</div>,
  },
  {
    accessorKey: "numberOfItems",
    header: "Number of Items",
    cell: ({ row }) => <div>{row.original.materialBatches?.length}</div>,
  },
  {
    accessorKey: "dateReceived",
    header: "Date Received",
    cell: ({ row }) => (
      // <div>{row.original.materialBatches?.map((batch)=>(batch.dateReceived))}</div>
      <div>
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "MMM dd, yyyy")
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
