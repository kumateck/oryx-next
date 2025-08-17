"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  EmployeeDto,
  usePutApiV1EmployeeByIdChangeTypeMutation,
  usePutApiV1EmployeeByIdStatusMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import {
  EmployeeType,
  EmployeeStatusType,
  EmployeeActiveStatus,
  EmployeeInactiveStatus,
  ErrorResponse,
  isErrorResponse,
  PermissionKeys,
  splitWords,
} from "@/lib";
import { useUserPermissions } from "@/hooks/use-permission";
import ThrowErrorMessage from "@/lib/throw-error";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from "@/components/ui";
import { TableMenuAction } from "@/shared/table-menu";
import DropdownBtns from "@/shared/btns/drop-btn";
import UserDialog from "./assign-user";
import { StatusColorsOptions } from "./types";

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
              }}
            >
              <Icon name="Pencil" className="h-5 w-5 text-neutral-500" />
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
              <Icon name="User" className="h-5 w-5 text-neutral-500" />
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

export function EmployeeTypeColumn<TData extends EmployeeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );
  const [updateEmployee, { isLoading }] =
    usePutApiV1EmployeeByIdChangeTypeMutation();

  const handleEmployeeType = async (id: string, type: EmployeeType) => {
    setSelectedEmployeeId(id);
    try {
      await updateEmployee({ id, employeeType: type }).unwrap();
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      ThrowErrorMessage(error);
    }
  };

  return (
    <div className="min-w-36 flex gap-2 items-center">
      {isLoading && selectedEmployeeId === row.original.id && (
        <Icon name="LoaderCircle" className="animate-spin size-5" />
      )}
      <DropdownBtns
        variant="ghost"
        icon="AlignJustify"
        title={EmployeeType[row.original.type as EmployeeType]}
        menus={[
          {
            name: EmployeeType[EmployeeType.Casual],
            onClick: () =>
              handleEmployeeType(
                row.original.id as string,
                EmployeeType.Casual,
              ),
          },
          {
            name: EmployeeType[EmployeeType.Permanent],
            onClick: () =>
              handleEmployeeType(
                row.original.id as string,
                EmployeeType.Permanent,
              ),
          },
        ]}
      />
    </div>
  );
}

export function StatusActions<TData extends EmployeeDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [updateStatus, { isLoading }] = usePutApiV1EmployeeByIdStatusMutation(
    {},
  );
  const dispatch = useDispatch();

  const activeStatusOptions = Object.entries(EmployeeActiveStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: splitWords(key), value: String(value) }));

  const inactiveStatusOptions = Object.entries(EmployeeInactiveStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: splitWords(key), value: String(value) }));

  const isActiveStatus =
    row.original.activeStatus !== null &&
    row.original.activeStatus !== undefined;
  const isInactiveStatus =
    row.original.inactiveStatus !== null &&
    row.original.inactiveStatus !== undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isLoading} asChild>
        <div
          className={`text-sm cursor-pointer flex gap-2 items-center justify-center ${
            isActiveStatus
              ? StatusColorsOptions.activeStatus[
                  row.original.activeStatus as EmployeeActiveStatus
                ]
              : isInactiveStatus
                ? StatusColorsOptions.inactiveStatus[
                    row.original.inactiveStatus as EmployeeInactiveStatus
                  ]
                : StatusColorsOptions.statusColors[
                    row.original.status as EmployeeStatusType
                  ]
          } text-white px-3 py-1 rounded-full w-fit`}
        >
          {isLoading ? (
            <Icon name="LoaderCircle" size={15} className="animate-spin" />
          ) : (
            <Icon name="AlignJustify" size={15} />
          )}
          <span>
            {row.original.status === EmployeeStatusType.Active
              ? row?.original?.activeStatus !== null
                ? splitWords(
                    EmployeeActiveStatus[
                      row?.original?.activeStatus as EmployeeActiveStatus
                    ],
                  )
                : EmployeeStatusType[row.original.status as EmployeeStatusType]
              : ""}
            {row.original.status === EmployeeStatusType.Inactive
              ? row?.original?.inactiveStatus !== null
                ? splitWords(
                    EmployeeInactiveStatus[
                      row?.original?.inactiveStatus as EmployeeInactiveStatus
                    ],
                  )
                : EmployeeStatusType[row.original.status as EmployeeStatusType]
              : ""}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="rounded-2xl">
        {row.original.status === EmployeeStatusType.Active
          ? activeStatusOptions.map((option) => {
              return (
                <DropdownMenuItem
                  key={option.value}
                  className="group w-full cursor-pointer"
                  disabled={
                    isLoading ||
                    String(row?.original?.activeStatus) === option.value
                  }
                  onClick={async () => {
                    if (
                      isLoading ||
                      String(row?.original?.activeStatus) === option.value
                    ) {
                      return;
                    }
                    try {
                      await updateStatus({
                        id: row.original.id as string,
                        updateEmployeeStatus: {
                          activeStatus: Number(
                            option.value,
                          ) as unknown as EmployeeActiveStatus,
                          status: EmployeeStatusType.Active,
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
                </DropdownMenuItem>
              );
            })
          : inactiveStatusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className="group cursor-pointer w-full"
                onClick={async () => {
                  if (
                    isLoading ||
                    String(row?.original?.inactiveStatus) === option.value
                  ) {
                    return;
                  }
                  try {
                    await updateStatus({
                      id: row?.original?.id as string,
                      updateEmployeeStatus: {
                        inactiveStatus: Number(
                          option.value,
                        ) as unknown as EmployeeInactiveStatus,
                        status: EmployeeStatusType.Inactive,
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
              </DropdownMenuItem>
            ))}
        <DropdownMenuItem
          className="group w-full cursor-pointer"
          disabled={isLoading}
          onClick={async () => {
            const status =
              row.original.status === EmployeeStatusType.Active
                ? EmployeeStatusType.Inactive
                : EmployeeStatusType.Active;
            try {
              await updateStatus({
                id: row.original.id as string,
                updateEmployeeStatus: {
                  status: status,
                  activeStatus: undefined,
                  inactiveStatus: undefined,
                },
              }).unwrap();
              toast.success("Status updated successfully");
              dispatch(commonActions.setTriggerReload());
            } catch (error) {
              console.error("Failed to update status:", error);
              ThrowErrorMessage(error);
              toast.error(isErrorResponse(error as ErrorResponse)?.description);
            }
          }}
        >
          <span>
            {row.original.status === EmployeeStatusType.Active
              ? "Deactivate"
              : "Activate"}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<EmployeeDto>[] = [
  {
    accessorKey: "staffId",
    header: "Staff ID",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.staffNumber ?? "N/A"}</div>
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
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.department?.name}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Employee Type",
    cell: ({ row }) => <EmployeeTypeColumn row={row} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusActions row={row} />,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
