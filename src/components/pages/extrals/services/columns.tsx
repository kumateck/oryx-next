import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialSpecificationDto,
  ServiceDto,
  useDeleteApiV1ServicesByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
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

export const columns: ColumnDef<ServiceDto>[] = [
  {
    accessorKey: "serviceCode",
    header: "Service Code",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "serviceName",
    header: "Service Name",
    cell: ({ row }) => <div>{row.original?.name}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div>
        {row.original?.startDate
          ? format(row.original.startDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      // { row }
      <div>
        {row.original.endDate
          ? format(row.original.endDate, "MMM d, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
