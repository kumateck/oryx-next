import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

import { AnalyticalTestRequestDto } from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { DropdownMenuItem } from "@/components/ui";
import { AnalyticalTestRequestStatus, fullname } from "@/lib";
import TableBadge from "@/shared/datatable/badge";
import { useState } from "react";
import { TakeSample } from "./forms/sample/create";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends AnalyticalTestRequestDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {row.original.status === AnalyticalTestRequestStatus.Created && (
          <DropdownMenuItem
            className="group"
            onClick={() => setIsSampleModalOpen(true)}
          >
            Pick Sample
          </DropdownMenuItem>
        )}
        {row.original.status === AnalyticalTestRequestStatus.Sampled && (
          <DropdownMenuItem className="group">Start Test</DropdownMenuItem>
        )}
      </TableMenuAction>
      {isSampleModalOpen && (
        <TakeSample
          isOpen={isSampleModalOpen}
          onClose={() => setIsSampleModalOpen(false)}
          id={row.original.id as string}
        />
      )}
    </section>
  );
}
export const columns: ColumnDef<AnalyticalTestRequestDto>[] = [
  {
    accessorKey: "code",
    header: "Schedule Code",
    cell: ({ row }) => {
      const code = row.original.productionSchedule?.code;
      const order = row.original.productionActivityStep?.order;

      return (
        <div className="min-w-36">
          {code}
          {order !== undefined && order !== null && <>: Step: {order}</>}
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="">{row.original.product?.name}</div>,
  },
  {
    accessorKey: "batch",
    header: "Batch #",
    cell: ({ row }) => (
      <div>{row.original.batchManufacturingRecord?.batchNumber}</div>
    ),
  },
  {
    accessorKey: "preparedOn",
    header: "Prepared On",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(new Date(row.original.createdAt), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "preparedBy",
    header: "Prepared By",
    cell: ({ row }) => (
      <div>
        {fullname(
          row.original.createdBy?.firstName as string,
          row.original.createdBy?.lastName as string,
        )}
      </div>
    ),
  },
  {
    accessorKey: "live",
    header: "Product Livespan",
    cell: ({ row }) => (
      <div>
        {row.original.manufacturingDate
          ? format(row.original?.manufacturingDate, "MMM dd, yyyy")
          : "-"}{" "}
        {"-"}{" "}
        {row.original.expiryDate
          ? format(row.original?.expiryDate, "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        <TableBadge
          className="rounded-full px-3 py-1 text-sm font-medium capitalize"
          status={Number(row.original?.status) as AnalyticalTestRequestStatus}
          statusEnum={AnalyticalTestRequestStatus}
        />
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
