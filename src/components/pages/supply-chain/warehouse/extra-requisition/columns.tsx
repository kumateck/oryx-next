import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

import { Icon } from "@/components/ui";
import { routes } from "@/lib";
import {
  ProductDto,
  ProductionExtraPackingDto,
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

export const columns: ColumnDef<ProductionExtraPackingDto>[] = [
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
    accessorKey: "requestedBy",
    header: "Requested By",
    cell: ({ row }) => (
      <div className="">{row.original.createdBy?.firstName}</div>
    ),
  },
  {
    accessorKey: "psId",
    header: "Schedule Code",
    cell: ({ row }) => (
      <div className="">{row.original.productionSchedule?.code}</div>
    ),
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="">{row.original.product?.name}</div>,
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div className="">{row.original.material?.name}</div>,
  },
  {
    accessorKey: "uom",
    header: "UOM",
    cell: ({ row }) => <div className="">{row.original.uoM?.symbol}</div>,
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row }) => <div className="">{row.original.quantity}</div>,
  },

  // {
  //   accessorKey: "comment",
  //   header: "Justification for Request",
  //   cell: ({ row }) => <div>{row.original.comments}</div>,
  // },
  // {
  //   accessorKey: "total",
  //   header: "Total Requested",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.items?.reduce((accumulator, item) => {
  //         return accumulator + (item.quantity || 0);
  //       }, 0)}
  //     </div>
  //   ),
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
