"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ShiftFrequency, StartDay } from "@/lib";
import { ShiftScheduleDtoRead } from "@/lib/redux/api/openapi.generated";

import { Icon } from "@/components/ui";

import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends ShiftScheduleDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <section className="flex items-center justify-end gap-2">
      <div className="flex cursor-pointer items-center justify-start gap-2">
        <Link href={`/plan-shift/${row.id}/calendar`}>
          <Icon
            name="Calendar"
            className="text-blue-500 h-5 w-5 cursor-pointer"
          />
        </Link>
      </div>
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
      <div>{StartDay[row.original.startDate as StartDay]} @- </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
