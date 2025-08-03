import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { AnalyticalTestRequestDto } from "@/lib/redux/api/openapi.generated";

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
export const columns: ColumnDef<AnalyticalTestRequestDto>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="min-w-36">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => <div className="">{row.original.product?.name}</div>,
  },
  {
    accessorKey: "batch",
    header: "Batch #",
    cell: ({ row }) => <div>{row.original.batchManufacturingRecord?.name}</div>,
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
