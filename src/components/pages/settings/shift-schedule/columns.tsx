"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ErrorResponse, isErrorResponse, ShiftFrequency } from "@/lib";
import {
  ShiftScheduleDtoRead,
  useDeleteApiV1ShiftSchedulesByIdMutation,
} from "@/lib/redux/api/openapi.generated";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { toast } from "sonner";
import { useState } from "react";

import { format } from "date-fns";
import Edit from "./edit";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
// import Edit from "./leave-request/edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends ShiftScheduleDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [open, setOpne] = useState(false);
  const [deleteMutation] = useDeleteApiV1ShiftSchedulesByIdMutation();
  const dispatch = useDispatch();

  const [details, setDetails] = useState<ShiftScheduleDtoRead>(
    {} as ShiftScheduleDtoRead,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <section className="flex items-center justify-end gap-2">
      {open && (
        <Edit
          isOpen={open}
          onClose={() => setOpne(false)}
          defaultValues={details}
        />
      )}
      <div
        className="flex cursor-pointer items-center justify-start gap-2"
        onClick={(e) => {
          e.stopPropagation();
          setDetails(row.original);
          setOpne(true);
        }}
      >
        <Icon name="Pencil" className="size-5 cursor-pointer" />
      </div>

      <div
        className="flex cursor-pointer items-center justify-start gap-2"
        onClick={(e) => {
          e.stopPropagation();
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      >
        <Icon name="Trash2" className="text-red-500 h-5 w-5 cursor-pointer" />
      </div>
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              id: details.id as string,
            }).unwrap();
            dispatch(commonActions.setTriggerReload());
            toast.success("Schedule deleted successfully");
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<ShiftScheduleDtoRead>[] = [
  {
    accessorKey: "name",
    header: "Schedule name",
    cell: ({ row }) => <div>{row.original.scheduleName}</div>,
  },

  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }) => (
      <div>{ShiftFrequency[row.original.frequency as ShiftFrequency]}</div>
    ),
  },

  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.department?.name}</div>,
  },

  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => (
      <div>
        {row.original.startDate
          ? format(row.original.startDate, "MMMM dd, yyyy")
          : ""}{" "}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => (
      <div>
        {row.original.endDate
          ? format(row.original.endDate, "MMMM dd, yyyy")
          : ""}{" "}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
