import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type ShiftsReportSummary = {
  staffId: string;
  staffName: string;
  category: string;
  startDate: Date;
  endDate: string;
  shiftType: string;
  scheduleName: string;
  departmentName: string;
};
export const columns: ColumnDef<ShiftsReportSummary>[] = [
  {
    accessorKey: "staffId",
    header: "Staff ID",
    cell: ({ row }) => <div>{row.original.staffId}</div>,
  },
  {
    accessorKey: "staffName",
    header: "Staff Name",
    cell: ({ row }) => <div>{row.original.staffName}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Shift Date(start)",
    cell: ({ row }) => (
      <div>{format(row.original.startDate, "yyyy-MM-dd")}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Shift Date(end)",
    cell: ({ row }) => <div>{format(row.original.endDate, "yyyy-MM-dd")}</div>,
  },
  {
    accessorKey: "shiftType",
    header: "Shift Type",
    cell: ({ row }) => <div>{row.original.shiftType}</div>,
  },
  {
    accessorKey: "scheduleName",
    header: "Schedule Name",
    cell: ({ row }) => <div>{row.original.scheduleName}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.departmentName}</div>,
  },
];
