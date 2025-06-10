"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ErrorResponse, isErrorResponse, rotationType, DayOfWeek } from "@/lib";
import {
  ShiftTypeDto,
  useDeleteApiV1DesignationByIdMutation,
  useLazyGetApiV1DesignationQuery,
} from "@/lib/redux/api/openapi.generated";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { toast } from "sonner";
import { useState } from "react";
// import Edit from "./leave-request/edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends ShiftTypeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1DesignationByIdMutation();

  const [details, setDetails] = useState<ShiftTypeDto>({} as ShiftTypeDto);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadDesignations] = useLazyGetApiV1DesignationQuery();

  return (
    <section className="flex items-center justify-end gap-2">
      <div
        className="flex cursor-pointer items-center justify-start gap-2"
        onClick={(e) => {
          e.stopPropagation();
          setDetails(row.original);
        }}
      >
        <Icon
          name="Pencil"
          className="h-5 w-5 cursor-pointer text-neutral-500"
        />
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
      {/* <Edit
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setDetails({} as LeaveRequestDto);
        }}
        details={details}
        loadDesignations={loadDesignations}
      /> */}

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              id: details.id as string,
            }).unwrap();
            toast.success("Schedule deleted successfully");
            loadDesignations({ page: 1, pageSize: 10 });
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </section>
  );
}

export const columns: ColumnDef<ShiftTypeDto>[] = [
  {
    accessorKey: "name",
    header: "Shift name",
    cell: ({ row }) => <div>{row.original.shiftName}</div>,
  },

  {
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => (
      <div>
        {row.original.rotationType !== undefined
          ? rotationType[row.original.rotationType]
          : ""}
      </div>
    ),
  },
  // This is a placeholder for the actual logic to get start and end time
  {
    accessorKey: "startTime",
    header: "Start & End Time",
    cell: ({ row }) => {
      <div>
        {row.original.endTime} @- {row.original.startTime}
      </div>;
    },
  },
  {
    accessorKey: "Shift Days",
    header: "Shift Days",
    cell: ({ row }) => {
      const days = row.original.applicableDays;
      return (
        <div>
          {Array.isArray(days)
            ? days.map((day) => DayOfWeek[day]).join(", ")
            : days && DayOfWeek[days]}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
