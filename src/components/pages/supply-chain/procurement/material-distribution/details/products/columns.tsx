import { ColumnDef } from "@tanstack/react-table";

import { DistributionRequisitionItem } from "@/lib/redux/api/openapi.generated";

export const getColumns = (): ColumnDef<DistributionRequisitionItem>[] => [
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.department?.name}</div>,
  },
  {
    accessorKey: "initialRequestedQuantity",
    header: "Initial Requested Quantity",
    cell: ({ row }) => <div>{row.original.quantityRequested}</div>,
  },
  {
    accessorKey: "distributionQuantity",
    header: "Quantity to be Distributed",
    cell: ({ row }) => <div>{row.original.quantityAllocated}</div>,
  },
  {
    accessorKey: "quantityRemaining",
    header: "Remaining Quantity",
    cell: ({ row }) => <div>{row.original.quantityRemaining}</div>,
  },
];
