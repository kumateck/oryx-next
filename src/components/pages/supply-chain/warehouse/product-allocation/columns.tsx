import { DropdownMenuItem, Icon } from "@/components/ui";
import { AllocateProductionOrderDtoRead } from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<
  TData extends AllocateProductionOrderDtoRead,
>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  return (
    <TableMenuAction>
      <DropdownMenuItem
        className="group flex items-center"
        onClick={() =>
          router.push(`/warehouse/allocate-products/${row.original.id}`)
        }
      >
        <Icon name="Eye" />
        <span>View Details</span>
      </DropdownMenuItem>
    </TableMenuAction>
  );
}

export const columns: ColumnDef<AllocateProductionOrderDtoRead>[] = [
  {
    accessorKey: "orderCode",
    header: "Order Code",
    cell: ({ row }) => <div>{row.original?.productionOrder?.code}</div>,
  },

  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <div>{row.original?.productionOrder?.customer?.name}</div>
    ),
  },
  {
    accessorKey: "Delivered",
    header: "Delivered",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.deliveredAt &&
            format(row.original.deliveredAt, "dd/MM/yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "TotalProducts",
    header: "Total Products",
    cell: ({ row }) => {
      return <div className="">{row.original?.products?.length ?? 0}</div>;
    },
  },
  {
    accessorKey: "totalValue",
    header: "Total Value",
    cell: ({ row }) => {
      return <div className="">{row.original.productionOrder?.totalValue}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={`px-2 rounded-xl text-center py-1 ${row.original?.approved ? "bg-green-100 text-green-800" : "bg-gray-400 text-white"}`}
        >
          {row.original?.approved ? "Approved" : "Pending"}
        </div>
      );
    },
  },
  {
    accessorKey: "Action",
    header: "Action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
