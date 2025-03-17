import { ColumnDef } from "@tanstack/react-table";

import { SrDto } from "@/lib/redux/api/openapi.generated";

export const sampleWeightColumns: ColumnDef<SrDto>[] = [
  {
    accessorKey: "srNumber",
    header: "SR Number",
  },
  {
    accessorKey: "grossWeight",
    header: "Gross Weight",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.grossWeight ?? "-"} {row.original?.uoM?.symbol || ""}
        </div>
      );
    },
  },
];
