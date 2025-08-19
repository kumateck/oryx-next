import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse, PermissionKeys } from "@/lib";
import {
  WarehouseLocationRackDto,
  useDeleteApiV1WarehouseRackByRackIdMutation,
  useLazyGetApiV1WarehouseRackQuery,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";

import Edit from "./edit";
import { useUserPermissions } from "@/hooks/use-permission";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends WarehouseLocationRackDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1WarehouseRackByRackIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<WarehouseLocationRackDto>(
    {} as WarehouseLocationRackDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadWarehouseLocationRacks] = useLazyGetApiV1WarehouseRackQuery();
  const dispatch = useDispatch();

  // check permissions here
  const { hasPermissionAccess } = useUserPermissions();
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {hasPermissionAccess(PermissionKeys.warehouse.editRack) && (
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

      {details.name && isOpen && (
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
              rackId: details.id as string,
            }).unwrap();
            toast.success("Rack deleted successfully");
            dispatch(commonActions.setTriggerReload());
            loadWarehouseLocationRacks({
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

export const columns: ColumnDef<WarehouseLocationRackDto>[] = [
  {
    accessorKey: "rack",
    header: "Rack",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => (
      <div>{row.original?.warehouseLocation?.warehouse?.name}</div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.original.warehouseLocation?.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>
        {<TheAduseiEditorViewer content={row?.original?.description ?? ""} />}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
