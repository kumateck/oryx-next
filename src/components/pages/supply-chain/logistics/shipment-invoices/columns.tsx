import { ColumnDef, Row } from "@tanstack/react-table";

import { Icon } from "@/components/ui";
import { ShipmentDocumentDto } from "@/lib/redux/api/openapi.generated";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ShipmentDocumentDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="View"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          console.log(row.original.code);
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<ShipmentDocumentDto>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },

  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div className="min-w-36">
  //       {PurchaseOrderStatusList[row.original?.status as PurchaseOrderStatus]}
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
