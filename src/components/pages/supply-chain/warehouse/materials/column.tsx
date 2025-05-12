import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, DropdownMenuItem, Icon } from "@/components/ui";
import {
  ErrorResponse,
  findRecordWithFullAccess,
  isErrorResponse,
  PermissionKeys,
  Section,
} from "@/lib";
import {
  MaterialDto,
  useDeleteApiV1MaterialByMaterialIdMutation,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";

import Edit from "./edit";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends MaterialDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1MaterialByMaterialIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<MaterialDto>({} as MaterialDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadMaterials] = useLazyGetApiV1MaterialQuery();

  //permissions checks
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  const cantEditRawMaterial = findRecordWithFullAccess(
    permissions,
    PermissionKeys.warehouse.editRawMaterials,
  );
  const cantDitPackagingMaterial = findRecordWithFullAccess(
    permissions,
    PermissionKeys.warehouse.editPackagingMaterials,
  );
  return (
    <div className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {(cantEditRawMaterial || cantDitPackagingMaterial) && (
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
        {(cantEditRawMaterial || cantDitPackagingMaterial) && (
          <DropdownMenuItem className="group">
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
          </DropdownMenuItem>
        )}
      </TableMenuAction>

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
              materialId: details.id as string,
            }).unwrap();
            toast.success("Material deleted successfully");
            loadMaterials({
              pageSize: 30,
            });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}

export const columns: ColumnDef<MaterialDto>[] = [
  {
    accessorKey: "code",
    header: "Code",

    cell: ({ row }) => <div>{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "kind",
    header: "Kind",

    cell: ({ row }) => (
      <div>{Number(row.original.kind) === 1 ? "Package" : "Raw"}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.materialCategory?.name}</div>,
  },
  {
    accessorKey: "pharmacopoeia",
    header: "Pharmacopoeia",
    cell: ({ row }) => <div>{row.original.pharmacopoeia}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },

  {
    id: "actions",
    meta: { omitRowClick: true },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
