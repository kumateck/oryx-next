import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
// import { useState } from "react";

// import { Icon } from "@/components/ui";

import { ApprovalEntityRead } from "@/lib/redux/api/openapi.generated";
import { splitWords } from "@/lib";

export const columns: ColumnDef<ApprovalEntityRead>[] = [
  {
    accessorKey: "modelType",
    header: "Approval Type",
    cell: ({ row }) => (
      <div className="min-w-36">
        {splitWords(row.original.modelType as string)}
      </div>
    ),
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.department?.name}</div>
    ),
  },
  {
    accessorKey: "createdBy",
    header: "Requested By",
    cell: ({ row }) => {
      const name = row.original?.requestedBy?.name as string;
      return <div className="min-w-36">{name}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Request Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
];
