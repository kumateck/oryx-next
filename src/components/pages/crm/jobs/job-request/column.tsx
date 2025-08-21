import { GetApiV1JobRequestsApiResponse } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";

export const column: ColumnDef<GetApiV1JobRequestsApiResponse>[] = [
  {
    header: "Job Request ID",
    accessorKey: "id",
    cell: ({ row }) => <div>{row.original && "N/A"}</div>,
  },
];
