import { ColumnDef } from "@tanstack/react-table";

import { BatchStatus, GrnDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<GrnDto>[] = [
  {
    accessorKey: "requisitionId",
    header: "Requisition ID",
    cell: ({ row }) => <div className="min-w-36">{row.original.grnNumber}</div>,
  },
  {
    accessorKey: "requestDepartment",
    header: "Request Department",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatches?.map(
          (batch) => batch.checklist?.manufacturer?.name,
        )}
      </div>
    ),
  },
  {
    accessorKey: "requestItems",
    header: "Request Items",
    cell: ({ row }) => <div>{row.original.materialBatches?.length}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatches?.map((batch) =>
          (batch.status as BatchStatus) === 0 ? "Pending" : "Pending",
        )}
      </div>
    ),
  },
];
