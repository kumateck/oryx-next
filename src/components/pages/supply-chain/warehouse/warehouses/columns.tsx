import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import {
  ErrorResponse,
  PermissionKeys,
  Section,
  WarehouseType,
  findRecordWithFullAccess,
  isErrorResponse,
  splitWords,
} from "@/lib";
import {
  WarehouseDto,
  useDeleteApiV1WarehouseByWarehouseIdMutation,
  useLazyGetApiV1WarehouseQuery,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends WarehouseDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1WarehouseByWarehouseIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<WarehouseDto>({} as WarehouseDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadWarehouse] = useLazyGetApiV1WarehouseQuery();
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  return (
    <section className="flex items-center justify-end gap-2">
      {findRecordWithFullAccess(
        permissions,
        PermissionKeys.warehouse.editWarehouse,
      ) && (
        <Icon
          name="Pencil"
          className="h-5 w-5 cursor-pointer text-neutral-500"
          onClick={() => {
            setDetails(row.original);
            setIsOpen(true);
          }}
        />
      )}
      <Icon
        name="Trash2"
        className="text-danger-500 h-5 w-5 cursor-pointer"
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
              warehouseId: details.id as string,
            }).unwrap();
            toast.success("Warehouse deleted successfully");
            loadWarehouse({
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

export const columns: ColumnDef<WarehouseDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div>{splitWords(WarehouseType[row.original.type as WarehouseType])}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
