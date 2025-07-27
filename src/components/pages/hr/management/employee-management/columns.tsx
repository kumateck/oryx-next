import { ColumnDef, Row } from "@tanstack/react-table";

import {
  EmployeeDto,
  usePutApiV1EmployeeByIdStatusMutation,
} from "@/lib/redux/api/openapi.generated";
import { TableMenuAction } from "@/shared/table-menu";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from "@/components/ui";
import { useState } from "react";

import UserDialog from "./assign-user";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import {
  EmployeeActiveStatus,
  EmployeeInactiveStatus,
  EmployeeStatusType,
  EmployeeType,
  ErrorResponse,
  isErrorResponse,
  PermissionKeys,
  splitWords,
} from "@/lib";
import { useRouter } from "next/navigation";
import { useUserPermissions } from "@/hooks/use-permission";
import { toast } from "sonner";

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

  //Check Permision
  // check permissions here
  const { hasPermissionAccess } = useUserPermissions();

  return (
    <section className="flex items-center justify-end gap-2">
      <TableMenuAction>
        {hasPermissionAccess(
          PermissionKeys.humanResources.updateEmployeeDetails,
        ) && (
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
              <span>Update Employee Info</span>
            </div>
          </DropdownMenuItem>
        )}

        {hasPermissionAccess(PermissionKeys.humanResources.viewEmployee) && (
          <DropdownMenuItem className="group">
            <div
              className="flex cursor-pointer items-center justify-center gap-2"
              onClick={() => {
                router.push(
                  `/hr/employee-management/${row.original.id}/details`,
                );
              }}
            >
              <Icon
                name="User"
                className="h-5 w-5 cursor-pointer text-neutral-500"
              />
              <span>Employee Details</span>
            </div>
          </DropdownMenuItem>
        )}
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

function StatusActions<TData extends EmployeeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  // TODO: use the right endpoint for updating
  const [updateStatus, { isLoading }] = usePutApiV1EmployeeByIdStatusMutation(
    {},
  );
  const dispatch = useDispatch();

  const activeStatusOptions = Object.entries(EmployeeActiveStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: splitWords(key),
      value: String(value),
    }));
  const inactiveStatusOptions = Object.entries(EmployeeInactiveStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: splitWords(key),
      value: String(value),
    }));
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isLoading} asChild>
        <div
          className={`text-sm cursor-pointer flex gap-1 items-center justify-center ${row.original.status === EmployeeStatusType.Active ? "bg-green-600" : "bg-gray-500"} text-white px-3 py-1 rounded-full w-fit`}
        >
          <span>
            {/* { EmployeeStatusType[row.original.status as EmployeeStatusType]} */}
            {row.original.status === EmployeeStatusType.Active
              ? row?.original?.activeStatus
                ? splitWords(EmployeeActiveStatus[row?.original?.activeStatus])
                : EmployeeStatusType[row.original.status as EmployeeStatusType]
              : ""}
            {row.original.status === EmployeeStatusType.Inactive
              ? row?.original?.inactiveStatus
                ? splitWords(
                    EmployeeInactiveStatus[row?.original?.inactiveStatus],
                  )
                : EmployeeStatusType[row.original.status as EmployeeStatusType]
              : ""}
          </span>
          {isLoading && (
            <Icon name="LoaderCircle" className="size-5 animate-spin" />
          )}
        </div>
      </DropdownMenuTrigger>
      {row.original.status === EmployeeStatusType.Active ? (
        <DropdownMenuContent align="end" side="bottom" className="rounded-2xl">
          {activeStatusOptions.map((option) => (
            <DropdownMenuItem key={option.value} className="group">
              <Button
                variant={
                  String(row?.original?.activeStatus) === option.value
                    ? "outline"
                    : "default"
                }
                className="w-full flex text-start items-center gap-2"
                onClick={async () => {
                  try {
                    await updateStatus({
                      id: row.original.id as string,
                      updateEmployeeStatus: {
                        status: row.original.status as EmployeeStatusType,
                        activeStatus:
                          option.value as unknown as EmployeeActiveStatus,
                      },
                    }).unwrap();
                    toast.success("Status updated successfully");
                    dispatch(commonActions.setTriggerReload());
                  } catch (error) {
                    console.error("Failed to update status:", error);
                    toast.error(
                      isErrorResponse(error as ErrorResponse)?.description,
                    );
                  }
                }}
              >
                <span>{option.label}</span>
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end" side="bottom" className="rounded-2xl">
          {inactiveStatusOptions.map((option) => (
            <DropdownMenuItem key={option.value} className="group">
              <Button
                variant={
                  String(row?.original?.inactiveStatus) === option.value
                    ? "outline"
                    : "ghost"
                }
                className="w-full text-start items-center gap-2"
                onClick={async () => {
                  try {
                    await updateStatus({
                      id: row?.original?.id as string,
                      updateEmployeeStatus: {
                        inactiveStatus:
                          option.value as unknown as EmployeeInactiveStatus,
                        activeStatus: row.original
                          .activeStatus as EmployeeActiveStatus,
                      },
                    }).unwrap();
                    toast.success("Status updated successfully");
                    dispatch(commonActions.setTriggerReload());
                  } catch (error) {
                    console.error("Failed to update status:", error);
                    toast.error(
                      isErrorResponse(error as ErrorResponse)?.description,
                    );
                  }
                }}
              >
                {option.label}
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

export const columns: ColumnDef<EmployeeDto>[] = [
  {
    accessorKey: "staffId",
    header: "Staff ID",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.staffNumber ? row.original.staffNumber : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Employee Name",
    cell: ({ row }) => (
      <div className="min-w-36">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusActions row={row} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
