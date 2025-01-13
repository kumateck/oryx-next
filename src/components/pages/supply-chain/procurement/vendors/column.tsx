import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, SupplierType, isErrorResponse } from "@/lib";
import {
  MaterialDto,
  SupplierDtoRead,
  useDeleteApiV1ProcurementSupplierBySupplierIdMutation,
  useLazyGetApiV1ProcurementSupplierQuery,
} from "@/lib/redux/api/openapi.generated";

// import Edit from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends SupplierDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] =
    useDeleteApiV1ProcurementSupplierBySupplierIdMutation();
  // const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<MaterialDto>({} as MaterialDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [reload] = useLazyGetApiV1ProcurementSupplierQuery();
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
              supplierId: details.id as string,
            }).unwrap();
            toast.success("Vendor deleted successfully");
            reload({
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
    accessorKey: "type",
    header: "Vendor Type",

    cell: ({ row }) => (
      <div>
        {row.original.type !== undefined
          ? SupplierType[row.original.type]
          : "Unknown"}
      </div>
    ),
  },
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
