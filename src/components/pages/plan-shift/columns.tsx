"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ShiftFrequency } from "@/lib";
import { ShiftScheduleDtoRead } from "@/lib/redux/api/openapi.generated";

import { Icon } from "@/components/ui";

import { format } from "date-fns";
import AssignShiftSchedule from "@/shared/calendar/weekly/add";
import { useState } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends ShiftScheduleDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [selectedShift, setSelectedShift] = useState<ShiftScheduleDtoRead>();
  const handleAssigned = () => {
    setSelectedShift(() => row.original);
    setIsOpen(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex items-center justify-end gap-2">
      <div className="flex cursor-pointer items-center justify-start gap-2">
        <button onClick={handleAssigned} className="">
          <Icon name="Users" className="text-blue-500 h-5 w-5 cursor-pointer" />
        </button>
      </div>
      {isOpen && (
        <AssignShiftSchedule
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValues={selectedShift}
        />
      )}
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
    meta: {
      omitRowClick: true,
    },
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
