import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  WarehouseLocationShelfDto,
  useDeleteApiV1WarehouseShelfByShelfIdMutation,
  useLazyGetApiV1WarehouseShelfQuery,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";

// import Edit from "../raw-materials/edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends WarehouseLocationShelfDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1WarehouseShelfByShelfIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<WarehouseLocationShelfDto>(
    {} as WarehouseLocationShelfDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadShelves] = useLazyGetApiV1WarehouseShelfQuery();
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          setDetails(row.original);
          setIsOpen(true);
        }}
      />
      <Icon
        name="Trash2"
        className="h-5 w-5 cursor-pointer text-danger-500"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      />

      {details.id && isOpen && (
        <Edit
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              shelfId: details.id as string,
            }).unwrap();
            toast.success("Warehouse deleted successfully");
            loadShelves({
              pageSize: 30,
            });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<WarehouseLocationShelfDto>[] = [
  {
    accessorKey: "shelfCode",
    header: "Shelf Code",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "shelf",
    header: "Shelf",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "rack",
    header: "Rack",
    cell: ({ row }) => <div>{row.original.warehouseLocationRack?.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
