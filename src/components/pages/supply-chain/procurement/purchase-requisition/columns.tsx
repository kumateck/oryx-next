import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { Icon } from "@/components/ui";
import { RequisitionStatus, routes } from "@/lib/constants";
import {
  ProductDto,
  RequestStatus,
  RequisitionDtoRead,
} from "@/lib/redux/api/openapi.generated";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ProductDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <section className="flex items-center justify-end gap-2">
      <Link href={routes.viewPlanning(row.original.id as string)}>
        <Icon name="Eye" className="h-5 w-5 cursor-pointer text-neutral-500" />
      </Link>
      <Link href={routes.editPlanning(row.original.id as string)}>
        <Icon
          name="Pencil"
          className="h-5 w-5 cursor-pointer text-neutral-500"
        />
      </Link>
    </section>
  );
}

export const columns: ColumnDef<RequisitionDtoRead>[] = [
  {
    accessorKey: "code",
    header: "Requisition Number",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },

  {
    accessorKey: "createdAt",
    header: "Requested Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "expectedDelivery",
    header: "Expected Delivery Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.expectedDelivery
          ? format(row.original.expectedDelivery, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Requested Department",
    cell: ({ row }) => <div>{row.original.requestedBy?.department?.name}</div>,
  },
  {
    accessorKey: "total",
    header: "Total Items Requested",
    cell: ({ row }) => (
      <div>
        {row.original.items?.reduce((accumulator, item) => {
          return accumulator + (item.quantity || 0);
        }, 0)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-36">
        {RequisitionStatus[row.original?.status as RequestStatus]}
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
