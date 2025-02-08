import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";

import { DropdownMenuItem, Icon } from "@/components/ui";
import { routes } from "@/lib/constants";
import { ProductDto } from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ProductDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <TableMenuAction>
      <DropdownMenuItem className="group">
        <Link
          href={routes.viewPlanning(row.original.id as string)}
          className="flex cursor-pointer items-center justify-start gap-2"
        >
          <span className="cursor-pointer text-black">
            <Icon
              name="Eye"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
          </span>
          <span>View Details</span>
        </Link>
      </DropdownMenuItem>{" "}
      <DropdownMenuItem className="group">
        <Link
          href={routes.editPlanning(row.original.id as string)}
          className="flex cursor-pointer items-center justify-start gap-2"
        >
          <span className="cursor-pointer text-black">
            <Icon
              name="Pencil"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
          </span>
          <span>Edit</span>
        </Link>
      </DropdownMenuItem>
    </TableMenuAction>
  );
}

export const columns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "code",
    header: "Product Code",
    cell: ({ row }) => <div className="min-w-36">{row.getValue("code")}</div>,
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
