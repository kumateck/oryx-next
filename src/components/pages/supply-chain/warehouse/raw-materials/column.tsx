import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialDto,
  useDeleteApiV1MaterialByMaterialIdMutation,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";

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
    </section>
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
