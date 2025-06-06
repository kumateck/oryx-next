import { ColumnDef } from "@tanstack/react-table";
import { GeneralAttendanceReportDtoRead } from "@/lib/redux/api/openapi.generated";
import Link from "next/link";

export const columns: ColumnDef<GeneralAttendanceReportDtoRead>[] = [
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div>
        <Link
          href={`/hr/attendance-report-summary/${row.original.departmentName}`}
        >
          {row.original.departmentName}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "permanentStaff",
    header: "Permanent Staff",
    cell: ({ row }) => <div>{row.original.permanentStaff}</div>,
  },
  {
    accessorKey: "casualStaff",
    header: "Casual Staff",
    cell: ({ row }) => <div>{row.original.casualStaff}</div>,
  },
  {
    accessorKey: "totalStaff",
    header: "Total Staff",
    cell: ({ row }) => (
      <div>
        {(row.original.permanentStaff ?? 0) + (row.original.casualStaff ?? 0)}
      </div>
    ),
  },
  {
    accessorKey: "permanentMorning",
    header: "Permanent Morning\n(8am - 5pm)",
    cell: ({ row }) => <div>{row.original.permanentMorning}</div>,
  },
  {
    accessorKey: "casualMorning",
    header: "Casual Morning\n(8am - 5pm)",
    cell: ({ row }) => <div>{row.original.casualMorning}</div>,
  },
  {
    accessorKey: "permanentAfternoon",
    header: "Permanent Afternoon\n(12pm - 1pm)",
    cell: ({ row }) => <div>{row.original.permanentAfternoon}</div>,
  },
  {
    accessorKey: "casualAfternoon",
    header: "Casual Afternoon\n(12pm - 1pm)",
    cell: ({ row }) => <div>{row.original.casualAfternoon}</div>,
  },
  {
    accessorKey: "permanentNight",
    header: "Permanent Night\n(9pm - 8am)",
    cell: ({ row }) => <div>{row.original.permanentNight}</div>,
  },
  {
    accessorKey: "casualNight",
    header: "Casual Night\n(9pm - 8am)",
    cell: ({ row }) => <div>{row.original.casualNight}</div>,
  },
];
