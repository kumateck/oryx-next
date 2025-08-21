import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Option, SupplierType } from "@/lib";
// import { Icon } from "@/components/ui";
import { ShipmentInvoiceDto } from "@/lib/redux/api/openapi.generated";
import MultiSelectListViewer from "@/shared/multi-select-lists";

// import Edit from "./edit";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }
// export function DataTableRowActions<TData extends ShipmentInvoiceDto>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   return (
//     <section className="flex items-center justify-end gap-2">
//       <Icon
//         name="View"
//         className="h-5 w-5 cursor-pointer text-neutral-500"
//         onClick={() => {
//           console.log(row.original.code);
//         }}
//       />
//     </section>
//   );
// }

export const columns: ColumnDef<ShipmentInvoiceDto>[] = [
  {
    accessorKey: "code",
    header: "Invoice No",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "type",
    header: "Supplier Type",
    cell: ({ row }) => (
      <div className="min-w-36">
        {SupplierType[Number(row.original.supplier?.type)]}
      </div>
    ),
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.supplier?.name}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Invoice Date",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "purchaseOrders",
    header: "Purchase Orders",
    cell: ({ row }) => {
      const uniquePurchaseOrders = Array.from(
        new Map(
          row.original.items?.map((item) => [
            item?.purchaseOrder?.id,
            item.purchaseOrder,
          ]),
        ).values(),
      );
      return (
        <div className="min-w-36">
          <MultiSelectListViewer
            className="max-w-[120ch]"
            lists={
              uniquePurchaseOrders?.map((item) => {
                return {
                  label: item?.code,
                };
              }) as Option[]
            }
          />
        </div>
      );
    },
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
