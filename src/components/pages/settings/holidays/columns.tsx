import { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  HolidayDto,
  useDeleteApiV1HolidaysByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import { toast } from "sonner";
import { commonActions } from "@/lib/redux/slices/common";
import { Edit } from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends HolidayDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [deleteMutation] = useDeleteApiV1HolidaysByIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<HolidayDto>({} as HolidayDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
        className="text-red-500 h-5 w-5 cursor-pointer"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      />
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
              id: details.id as string,
              module: AuditModules.settings.name,
              subModule: AuditModules.settings.holidays,
            }).unwrap();
            toast.success("Leave type deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<HolidayDto>[] = [
  {
    accessorKey: "name",
    header: "Holiday Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>{row.original.date && format(row.original.date, "MMM dd, yyy")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
