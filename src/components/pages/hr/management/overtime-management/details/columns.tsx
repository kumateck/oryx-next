import { ColumnDef } from "@tanstack/react-table";
import { EmployeeDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<EmployeeDto>[] = [
  {
    id: "name",
    header: "Employee Name",
    cell: ({ row }) => (
      <div>{`${row.original.firstName} ${row.original.lastName}`}</div>
    ),
  },
  {
    id: "designation",
    header: "Designation",
    cell: ({ row }) => (
      <div>{`${row.original.designation?.name || "N/A"}`}</div>
    ),
  },
  {
    accessorKey: "staffNumber",
    header: "Staff Number",
    cell: ({ row }) => <div>{`${row.original.staffNumber || "N/A"}`}</div>,
  },
];
