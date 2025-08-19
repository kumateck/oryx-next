import { ColumnDef, Row } from "@tanstack/react-table";
import { DropdownMenuItem, Icon } from "@/components/ui";
import {
  MarketRequisitionVendorDto,
  ProductDto,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ProductDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem
          onClick={() =>
            router.push(`/extrals/vendors-memo/${row.original.id}`)
          }
          className="group"
        >
          <Icon
            name="Eye"
            className="h-5 w-5 cursor-pointer text-neutral-500"
          />
          <span className="ml-2">View Details</span>
        </DropdownMenuItem>
      </TableMenuAction>
    </section>
  );
}

export const columns: ColumnDef<MarketRequisitionVendorDto>[] = [
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => <div className="min-w-36">{row.original && "N/A"}</div>,
  },
  {
    accessorKey: "itemCode",
    header: "Item ID",
    cell: ({ row }) => <div className="min-w-36">{row.original && "N/A"}</div>,
  },

  {
    accessorKey: "requisitionID",
    header: "Requisition Id",
    cell: ({ row }) => <div className="min-w-36">{row.original && "N/A"}</div>,
  },
  {
    accessorKey: "requestDate",
    header: "Request Date",
    cell: ({ row }) => <div className="min-w-36">{row.original && "N/A"}</div>,
  },
  {
    accessorKey: "expectedDeliveryDate",
    header: "Expected Delivery Date",
    cell: ({ row }) => <div className="min-w-36">{row.original && "N/A"}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original && "N/A"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
