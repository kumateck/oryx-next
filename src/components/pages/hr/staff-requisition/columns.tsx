import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";

import { Button, ConfirmDeleteDialog, Icon } from "@/components/ui";
import {
  AppointmentType,
  AuditModules,
  ErrorResponse,
  isErrorResponse,
  splitWords,
} from "@/lib";
import {
  StaffRequisitionDtoRead,
  useDeleteApiV1StaffRequisitionsByIdMutation,
} from "@/lib/redux/api/openapi.generated";

import Edit from "./edit";
import { useDispatch } from "react-redux";
import { commonActions } from "@/lib/redux/slices/common";
import { format } from "date-fns";
import { TableMenuAction } from "@/shared/table-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends StaffRequisitionDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const routes = useRouter();
  const [deleteMutation] = useDeleteApiV1StaffRequisitionsByIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<StaffRequisitionDtoRead>(
    {} as StaffRequisitionDtoRead,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <TableMenuAction>
      <DropdownMenuItem>
        <Button
          onClick={() =>
            routes.push(`/hr/staff-requisition/${row?.original?.id}`)
          }
          variant="ghost"
        >
          <Icon
            name="Eye"
            className="h-5 w-5 cursor-pointer text-neutral-500"
          />
          <span>Details</span>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Button
          onClick={() => {
            setDetails(row.original);
            setIsOpen(true);
          }}
          variant="ghost"
        >
          <Icon
            name="Pencil"
            className="h-5 w-5 cursor-pointer text-neutral-500"
          />
          <span>Edit</span>
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Button
          onClick={() => {
            setDetails(row.original);
            setIsDeleteOpen(true);
          }}
          variant={"ghost"}
        >
          <Icon name="Trash2" className="text-red-500 h-5 w-5 cursor-pointer" />
          <span>Delete</span>
        </Button>
      </DropdownMenuItem>

      {details.id && isOpen && (
        <Edit
          details={details}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          try {
            await deleteMutation({
              id: details.id as string,
              module: AuditModules.management.name,
              subModule: AuditModules.management.staffRequisition,
            }).unwrap();
            toast.success("Staff requisition deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </TableMenuAction>
  );
}

export const columns: ColumnDef<StaffRequisitionDtoRead>[] = [
  {
    accessorKey: "numberOfStaff",
    header: "Number of Staff",
    cell: ({ row }) => <div>{row.original.staffRequired}</div>,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => <div>{row.original.department?.name ?? "-"}</div>,
  },
  {
    accessorKey: "designation",
    header: "Job Title",
    cell: ({ row }) => <div>{row.original.designation?.name}</div>,
  },
  {
    accessorKey: "qualification",
    header: "Qualification",
    cell: ({ row }) => <div>{row.original.qualification}</div>,
  },
  {
    accessorKey: "appointmentId",
    header: "Appointment Type",
    cell: ({ row }) => (
      <div>
        {splitWords(
          AppointmentType[row.original.appointmentType as AppointmentType],
        )}
      </div>
    ),
  },
  {
    accessorKey: "requestUrgency",
    header: "Request Urgency",
    cell: ({ row }) => (
      <div>
        {row.original.requestUrgency
          ? format(row.original.requestUrgency, "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
