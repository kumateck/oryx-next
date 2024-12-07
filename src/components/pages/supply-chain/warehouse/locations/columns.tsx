import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  WarehouseLocationDto,
  useDeleteApiV1WarehouseLocationByLocationIdMutation,
  useLazyGetApiV1WarehouseLocationQuery,
} from "@/lib/redux/api/openapi.generated";

// import Edit from "../raw-materials/edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends WarehouseLocationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] =
    useDeleteApiV1WarehouseLocationByLocationIdMutation();
  // const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<WarehouseLocationDto>(
    {} as WarehouseLocationDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadWarehouseLocation] = useLazyGetApiV1WarehouseLocationQuery();
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          setDetails(row.original);
          // setIsOpen(true);
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

      {/* {details.id && isOpen && (
        <Edit
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )} */}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              locationId: details.id as string,
            }).unwrap();
            toast.success("Warehouse deleted successfully");
            loadWarehouseLocation({
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

export const columns: ColumnDef<WarehouseLocationDto>[] = [
  {
    accessorKey: "locations",
    header: "Location",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "floor",
    header: "Floor",
    cell: ({ row }) => <div>{row.original.floorName}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
