import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { Icon } from "@/components/ui";
import {
  getEnumBadgeWithHexColors,
  RequisitionStatus,
  RequisitionType,
  routes,
} from "@/lib";
import { ProductDto, RequisitionDto } from "@/lib/redux/api/openapi.generated";
import StatusBadge from "@/shared/status-badge";

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

export const columns: ColumnDef<RequisitionDto>[] = [
  {
    accessorKey: "code",
    header: "Requisition Number",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.requisitionType === RequisitionType.StockVoucher
          ? "Stock Voucher"
          : "Purchase Voucher"}
      </div>
    ),
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as RequisitionStatus;
      const { label, style } = getEnumBadgeWithHexColors(
        RequisitionStatus,
        status,
      );

      return <StatusBadge label={label} style={style} />;
    },
  },
];
