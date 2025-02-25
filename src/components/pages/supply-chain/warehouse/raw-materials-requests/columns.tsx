import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { GrnDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<GrnDto>[] = [
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
    accessorKey: "scheduledStartTime",
    header: "Vehicle Number",
    cell: ({ row }) => (
      // <div>{row.original.materialBatches?.map((batch)=>(batch.dateReceived))}</div>
      <div>
        {row.original.materialBatches?.map((batch) => batch.dateReceived)
          ? row.original.materialBatches
              ?.map((batch) =>
                batch.dateReceived
                  ? format(new Date(batch.dateReceived), "MMM dd, yyyy")
                  : "-",
              )
              .join(", ")
          : "-"}
      </div>
    ),
  },
];
