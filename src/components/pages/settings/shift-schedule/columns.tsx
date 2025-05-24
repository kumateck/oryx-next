"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import {
  ErrorResponse,
  isErrorResponse,
  ShiftFrequency,
  StartDay,
} from "@/lib";
import {
  ShiftScheduleDtoRead,
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

export function DataTableRowActions<TData extends ShiftScheduleDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [deleteMutation] = useDeleteApiV1DesignationByIdMutation();

  const [details, setDetails] = useState<ShiftScheduleDtoRead>(
    {} as ShiftScheduleDtoRead,
  );
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
    accessorKey: "startDay",
    header: "Start Day & Time",
    cell: ({ row }) => (
      <div>
        {StartDay[row.original.startDate as StartDay]} @-{" "}
        {row.original.startTime}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
