import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { ProductionScheduleDto } from "@/lib/redux/api/openapi.generated";

// import Edit from "./edit";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }
// export function DataTableRowActions<TData extends ProductionScheduleDto>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   return (
//     <section className="flex items-center justify-end gap-2">
//       {/* <Link href={routes.viewPlanning(row.original.id as string)}>
//         <Icon name="Eye" className="h-5 w-5 cursor-pointer text-neutral-500" />
//       </Link>
//       <Link href={routes.editPlanning(row.original.id as string)}>
//         <Icon
//           name="Pencil"
//           className="h-5 w-5 cursor-pointer text-neutral-500"
//         />
//       </Link> */}
//     </section>
//   );
// }

export const columns: ColumnDef<ProductionScheduleDto>[] = [
  {
    accessorKey: "code",
    header: "Shipment ID",
    cell: ({ row }) => <div className="min-w-36">{row.getValue("code")}</div>,
  },
  // {
  //   accessorKey: "product",
  //   header: "Products",
  //   cell: ({ row }) => (
  //     <div className="">
  //       <MultiSelectListViewer
  //         className="max-w-[120ch]"
  //         lists={
  //           row.original.products?.map((p) => {
  //             const productName = p.product?.name as string;
  //             const qty = convertUnits(
  //               p.quantity ?? 0,
  //               p.product?.baseUoM?.symbol as string,
  //               Units.L,
  //             );
  //             const label = `${productName} (${qty}${Units.L})`;
  //             return {
  //               label,
  //             };
  //           }) as Option[]
  //         }
  //       />
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "scheduledStartTime",
  //   header: "Start Time",
  //   cell: ({ row }) => (
  //     <div>
  //       {row.original.scheduledStartTime
  //         ? format(new Date(row.original.scheduledStartTime), "MMM dd, yyyy")
  //         : "-"}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ({ row }) => (
      <div>
        {row.original.scheduledEndTime
          ? format(new Date(row.original.scheduledEndTime), "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  // {
  //   accessorKey: "remarks",
  //   header: "Remarks",
  //   cell: ({ row }) => <div>{row.original.remarks}</div>,
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
