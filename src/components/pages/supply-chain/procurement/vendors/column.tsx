import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialDto,
  SupplierDtoRead,
  useDeleteApiV1MaterialByMaterialIdMutation,
  useLazyGetApiV1MaterialQuery,
} from "@/lib/redux/api/openapi.generated";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends SupplierDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1MaterialByMaterialIdMutation();
  // const [isOpen, setIsOpen] = useState(false);
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
              materialId: details.id as string,
            }).unwrap();
            toast.success("Vendor deleted successfully");
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

export const columns: ColumnDef<SupplierDtoRead>[] = [
  {
    accessorKey: "name",
    header: "Name",

    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",

    cell: ({ row }) => <div>{row.getValue("contactPerson")}</div>,
  },
  {
    accessorKey: "contactNumber",
    header: "Telephone Number",

    cell: ({ row }) => <div>{row.getValue("contactNumber")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",

    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
