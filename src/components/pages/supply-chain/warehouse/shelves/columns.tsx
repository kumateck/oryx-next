import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  ErrorResponse,
  findRecordWithAccess,
  isErrorResponse,
  PermissionKeys,
  Section,
} from "@/lib";
import {
  WarehouseLocationShelfDto,
  useDeleteApiV1WarehouseShelfByShelfIdMutation,
  useLazyGetApiV1WarehouseShelfQuery,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";

import Edit from "./edit";
import { useSelector } from "@/lib/redux/store";

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

  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {findRecordWithAccess(
          permissions,
          PermissionKeys.warehouse.viewShelves,
        ) && (
          <DropdownMenuItem className="group">
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={() => {
                setDetails(row.original);
                setIsOpen(true);
              }}
            >
              <Icon
                name="Pencil"
                className="h-5 w-5 cursor-pointer text-neutral-500"
              />
              <span>Edit</span>
            </div>
          </DropdownMenuItem>
        )}
        {/* <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-start gap-2"
            onClick={() => {
              setDetails(row.original);
              setIsDeleteOpen(true);
            }}
          >
            <Icon
              name="Trash2"
              className="text-danger-500 h-5 w-5 cursor-pointer"
            />
            <span>Delete</span>
          </div>
        </DropdownMenuItem> */}
      </TableMenuAction>
      {/* <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          setDetails(row.original);
          setIsOpen(true);
        }}
      />
      <Icon
        name="Trash2"
        className="text-danger-500 h-5 w-5 cursor-pointer"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      /> */}

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
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div>{row.original.warehouseLocationRack?.warehouseLocation?.name}</div>
    ),
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
