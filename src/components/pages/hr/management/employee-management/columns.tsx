import { ColumnDef, Row } from "@tanstack/react-table";

import { EmployeeDto } from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import { DropdownMenuItem, Icon } from "@/components/ui";
import { useState } from "react";

import UserDialog from "./assign-user";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { EmployeeType, splitWords } from "@/lib";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends EmployeeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDto>(
    {} as EmployeeDto,
  );
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);
  const router = useRouter();

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              setSelectedEmployee(row.original);
              setIsAssignLocationOpen(true);
              console.log(row.original.type);
            }}
          >
            <Icon
              name="Pencil"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Edit Info</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="group">
          <div
            className="flex cursor-pointer items-center justify-center gap-2"
            onClick={() => {
              router.push(`/hr/employee-management/${row.id}/details`);
            }}
          >
            <Icon
              name="User"
              className="h-5 w-5 cursor-pointer text-neutral-500"
            />
            <span>Employee Details</span>
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
    cell: ({ row }) => (
      <div className="min-w-36">
        {splitWords(EmployeeType[row.original.type as EmployeeType])}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
