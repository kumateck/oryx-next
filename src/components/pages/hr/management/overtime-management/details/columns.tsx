import { ColumnDef } from "@tanstack/react-table";
import { LeaveRequestDto } from "@/lib/redux/api/openapi.generated";

export const columns: ColumnDef<LeaveRequestDto>[] = [
  {
    id: "name",
    header: "Employee Name",
    cell: () =>
      // { row }
      {
        // return row.original.employee?.designation?.maximumLeaveDays || 0;
      },
  },
  {
    id: "designation",
    header: "Designation",
    cell: () => (
      // { row }
      <div>{/* {row.original.warehouseLocation?.name} */}</div>
    ),
  },
  {
    accessorKey: "staffNumber",
    header: "Staff Number",
    cell: () =>
      // { row }
      {
        // return row.original.startDate
        //   ? format(row.original.startDate, "MMM d, yyyy")
        //   : "N/A";
      },
  },
];
