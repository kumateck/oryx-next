import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { DropdownMenuItem, Icon } from "@/components/ui";
import { EmployeeDto } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

import UserDialog from "./assign-user";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends EmployeeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDto | null>(
    null,
  );
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              setSelectedEmployee(row.original);
              setIsAssignLocationOpen(true);
            }}
          >
            <Icon
              name="User"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Assign Employee</span>
          </div>
        </DropdownMenuItem>
      </TableMenuAction>

      <UserDialog
        open={isAssignLocationOpen}
        onOpenChange={setIsAssignLocationOpen}
        onSuccess={() => dispatch(commonActions.setTriggerReload())}
        selectedEmployee={selectedEmployee}
      />
    </section>
  );
}

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
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  // {
  //   accessorKey: "department",
  //   header: "Employee Department",
  //   cell: ({ row }) => (
  //     <div className="min-w-36">{row.original.}</div>
  //   ),
  // },
];
