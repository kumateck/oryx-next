"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { ErrorResponse, isErrorResponse, rotationType, DayOfWeek } from "@/lib";
import {
  ShiftTypeDto,
  useDeleteApiV1ShiftTypeByIdMutation,
} from "@/lib/redux/api/openapi.generated";

import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { toast } from "sonner";
import { useState } from "react";
import EditShiftTypes from "./edit";
import { ShiftTypeRequestDto } from "./types";
import { commonActions } from "@/lib/redux/slices/common";
import { useDispatch } from "@/lib/redux/store";
// import Edit from "./leave-request/edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends ShiftTypeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1ShiftTypeByIdMutation();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<ShiftTypeRequestDto>(
    {} as ShiftTypeRequestDto,
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <section className="flex items-center justify-end gap-2">
      <div
        className="flex cursor-pointer items-center justify-start gap-2"
        onClick={() => {
          if (!row.original) return;
          console.log("row.original", row.original);
          const details: ShiftTypeRequestDto = {
            shiftName: row.original?.shiftName as string,
            applicableDays: row.original?.applicableDays
              ? row.original.applicableDays.map((day) => ({
                  label: DayOfWeek[day],
                  value: String(day),
                }))
              : [],
            rotationType: {
              label: rotationType[row.original?.rotationType as number],
              value: String(row.original.rotationType),
            },
            startTime: row.original?.startTime as string,
            endTime: row.original?.endTime as string,
          };
          setDetails(details);
          setOpen(true);
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
          setIsDeleteOpen(true);
        }}
      >
        <Icon name="Trash2" className="text-red-500 h-5 w-5 cursor-pointer" />
      </div>
      {open && (
        <EditShiftTypes
          isOpen={open}
          onClose={() => {
            setOpen(false);
          }}
          details={details as ShiftTypeRequestDto}
          id={row.original.id as string}
        />
      )}

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              id: row.original.id as string,
            }).unwrap();
            toast.success("Schedule deleted successfully");
            dispatch(commonActions.setTriggerReload());
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
  {
    accessorKey: "startTime",
    header: "Start & End Time",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.startTime} - {row.original.endTime}
        </div>
      );
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
