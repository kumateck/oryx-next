import { ColumnDef } from "@tanstack/react-table";
import { AttendanceRecordDepartmentDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<AttendanceRecordDepartmentDto>[] = [
  {
    accessorKey: "staffName",
    header: "Staff Name",
    cell: ({ row }) => <div>{row.original.staffName}</div>,
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => <div>{row.original.employeeId}</div>,
  },
  {
    accessorKey: "shift",
    header: "Shift",
    cell: ({ row }) => <div>{row.original.shiftName}</div>,
  },
  {
    accessorKey: "clockInTime",
    header: "Clock In Time",
    cell: ({ row }) => <div>{row.original.clockInTime}</div>,
  },
  {
    accessorKey: "clockOutTime",
    header: "Clock Out Time",
    cell: ({ row }) => <div>{row.original.clockOutTime}</div>,
  },
];
