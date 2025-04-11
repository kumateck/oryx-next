import { ColumnDef } from "@tanstack/react-table";

import { EmployeeDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<EmployeeDto>[] = [
  {
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => <div className="min-w-36">{row.original.fullName}</div>,
  },
  {
    accessorKey: "email",
    header: "Employee Email",
    cell: ({ row }) => <div className="min-w-36">{row.original.email}</div>,
  },
  {
    accessorKey: "type",
    header: "Employee Type",
    cell: ({ row }) => <div className="min-w-36">{row.original?.type}</div>,
  },
  // {
  //   accessorKey: "department",
  //   header: "Employee Department",
  //   cell: ({ row }) => (
  //     <div className="min-w-36">{row.original.}</div>
  //   ),
  // },
];
