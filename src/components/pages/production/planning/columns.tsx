import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// import { DropdownMenuItem, Icon } from "@/components/ui";
import { routes } from "@/lib";
import { ProductDto } from "@/lib/redux/api/openapi.generated";

// import { TableMenuAction } from "@/shared/table-menu";

// import Edit from "./edit";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }
// export function DataTableRowActions<TData extends ProductDto>({
//   row,
// }: DataTableRowActionsProps<TData>) {
//   return (
//     <TableMenuAction>
//       <DropdownMenuItem className="group">
//         <Link
//           href={routes.viewPlanning(row.original.id as string)}
//           className="flex cursor-pointer items-center justify-start gap-2"
//         >
//           <span className="cursor-pointer text-black">
//             <Icon
//               name="Eye"
//               className="h-5 w-5 cursor-pointer text-neutral-500"
//             />
//           </span>
//           <span>View Details</span>
//         </Link>
//       </DropdownMenuItem>{" "}
//       <DropdownMenuItem className="group">
//         <Link
//           href={routes.editPlanning(row.original.id as string)}
//           className="flex cursor-pointer items-center justify-start gap-2"
//         >
//           <span className="cursor-pointer text-black">
//             <Icon
//               name="Pencil"
//               className="h-5 w-5 cursor-pointer text-neutral-500"
//             />
//           </span>
//           <span>Edit</span>
//         </Link>
//       </DropdownMenuItem>
//     </TableMenuAction>
//   );
// }

export const columns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "code",
    header: "Product Code",
    cell: ({ row }) => (
      <div className="min-w-36">
        <Link
          href={routes.viewPlanning(row.original.id as string)}
          className="cursor-pointer hover:underline"
        >
          {row.getValue("code")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="min-w-48">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category?.name}</div>,
  },
  {
    accessorKey: "equipment",
    header: "Equipment",
    cell: ({ row }) => <div>{row.original.equipment?.name}</div>,
  },
  {
    accessorKey: "packageStyle",
    header: "Package Style",
    cell: ({ row }) => <div>{row.original.packageStyle}</div>,
  },
  {
    accessorKey: "base",
    header: "Base Unit",
    cell: ({ row }) => (
      <div>
        {row.original.baseQuantity}
        {row.original.baseUoM?.symbol}
      </div>
    ),
  },
  {
    accessorKey: "basePack",
    header: "Base Package",
    cell: ({ row }) => (
      <div>
        {row.original.basePackingQuantity} {row.original.basePackingUoM?.symbol}
      </div>
    ),
  },
  {
    accessorKey: "shelfLife",
    header: "Shelf Life",
    cell: ({ row }) => <div>{row.getValue("shelfLife")}</div>,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
