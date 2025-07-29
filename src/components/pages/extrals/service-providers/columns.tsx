import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialSpecificationDto,
  ServiceProviderDto,
  useDeleteApiV1ServicesByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Edit } from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends MaterialSpecificationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDelete, setIsDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const [deleteService] = useDeleteApiV1ServicesByIdMutation();
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        // TODO: Implement edit functionality
        onClick={() => setOpenEdit(true)}
      />
      <Icon
        name="Trash"
        className="h-5 w-5 cursor-pointer text-red-500"
        onClick={() => setIsDelete(true)}
      />
      {isDelete && (
        <ConfirmDeleteDialog
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={async () => {
            if (!row?.original?.id) return;
            try {
              await deleteService({
                id: row.original.id as string,
              }).unwrap();
              setIsDelete(false);
              dispatch(commonActions.setTriggerReload());
              toast.success("Service deleted successfully.");
            } catch (error) {
              console.error("Error deleting service:", error);
              toast.error(isErrorResponse(error as ErrorResponse)?.description);
            }
          }}
        />
      )}
      {openEdit && (
        <Edit
          isOpen={openEdit}
          onClose={() => setOpenEdit(false)}
          details={row.original}
        />
      )}
    </section>
  );
}

export const columns: ColumnDef<ServiceProviderDto>[] = [
  {
    accessorKey: "name",
    header: "Service ProviderName",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
    cell: () => <div>n/a</div>,
  },
  {
    accessorKey: "contactPersonNumber",
    header: "Contact Person Number",
    cell: () => <div>n/a</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },

  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div>{row.original.country?.name}</div>,
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => <div>{row.original.currency?.name}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.id && ""}</div>,
  },

  {
    id: "actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
