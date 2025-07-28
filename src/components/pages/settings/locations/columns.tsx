import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  ErrorResponse,
  PermissionKeys,
  WarehouseType,
  isErrorResponse,
} from "@/lib";
import {
  WarehouseLocationDto,
  useDeleteApiV1WarehouseLocationByLocationIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";

import Edit from "./edit";
import { useUserPermissions } from "@/hooks/use-permission";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends WarehouseLocationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] =
    useDeleteApiV1WarehouseLocationByLocationIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<WarehouseLocationDto>(
    {} as WarehouseLocationDto,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dispatch = useDispatch();

  const { hasPermissionAccess } = useUserPermissions();
  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {hasPermissionAccess(PermissionKeys.warehouse.editLocation) && (
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
              locationId: details.id as string,
            }).unwrap();
            toast.success("Location deleted successfully");
            dispatch(commonActions.setTriggerReload());
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
    cell: ({ row }) => (
      <div>
        {row.original.name} (
        {WarehouseType[Number(row.original.warehouse?.type)]})
      </div>
    ),
  },
  {
    accessorKey: "floor",
    header: "Floor",
    cell: ({ row }) => <div>{row.original.floorName}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div>
        <TheAduseiEditorViewer content={row.original.description as string} />
      </div>
    ),
  },
  {
    accessorKey: "warehouse",
    header: "Warehouse",
    cell: ({ row }) => <div>{row.original.warehouse?.name}</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
