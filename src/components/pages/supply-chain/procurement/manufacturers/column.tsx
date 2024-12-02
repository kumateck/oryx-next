import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  ManufacturerDtoRead,
  MaterialDto,
  useDeleteApiV1MaterialByMaterialIdMutation,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ManufacturerDtoRead>({
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
            toast.success("Manufacturer deleted successfully");
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

export const columns: ColumnDef<ManufacturerDtoRead>[] = [
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",

    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "approvedAt",
    header: "Approved At",

    cell: ({ row }) => <div>{row.getValue("approvedAt")}</div>,
  },
  {
    accessorKey: "validityDate",
    header: "Validity Date",
    cell: ({ row }) => <div>{row.getValue("validityDate")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
