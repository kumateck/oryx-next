import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import {
  ErrorResponse,
  findRecordWithFullAccess,
  isErrorResponse,
  PermissionKeys,
  Section,
} from "@/lib";
import {
  ManufacturerDto,
  MaterialDto,
  useDeleteApiV1ProcurementManufacturerByManufacturerIdMutation,
  useLazyGetApiV1ProcurementManufacturerQuery,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ManufacturerDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] =
    useDeleteApiV1ProcurementManufacturerByManufacturerIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<MaterialDto>({} as MaterialDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [reload] = useLazyGetApiV1ProcurementManufacturerQuery();
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  return (
    <section className="flex items-center justify-end gap-2">
      {findRecordWithFullAccess(
        permissions,
        PermissionKeys.procurement.updateManufacturerDetails,
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
      {findRecordWithFullAccess(
        permissions,
        PermissionKeys.procurement.deleteManufacturer,
      ) && (
        <Icon
          name="Trash2"
          className="text-danger-500 h-5 w-5 cursor-pointer"
          onClick={() => {
            setDetails(row.original);
            setIsDeleteOpen(true);
          }}
        />
      )}
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
              manufacturerId: details.id as string,
            }).unwrap();
            toast.success("Manufacturer deleted successfully");
            reload({
              page: 1,
              pageSize: 10,
            });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<ManufacturerDto>[] = [
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
    accessorKey: "country",
    header: "Country",

    cell: ({ row }) => <div>{row.original.country?.name}</div>,
  },
  {
    accessorKey: "approvedAt",
    header: "Approved At",

    cell: ({ row }) => (
      <div>
        {row.getValue("approvedAt")
          ? format(row.getValue("approvedAt"), "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "validityDate",
    header: "Validity Date",
    cell: ({ row }) => (
      <div>
        {row.getValue("validityDate")
          ? format(row.getValue("validityDate"), "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
