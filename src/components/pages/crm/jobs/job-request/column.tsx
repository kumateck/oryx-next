import { Icon } from "@/components/ui";
import { JobRequestRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends JobRequestRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <div className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-700"
        onClick={() => {
          console.log("origin data from", row.original?.id);
          // setDetails(row.original);
          // setIsEdit(true);
        }}
      />
      <Icon
        name="Trash"
        className="text-red-500 h-5 w-5 cursor-pointer"
        onClick={() => {
          // setDetails(row.original);
          // setIsDeleteOpen(true);
        }}
      />

      {/* {isEdit && (
              <Edit
                isOpen={isEdit}
                onClose={() => setIsEdit(false)}
                id={details.id as string}
                details={details}
              />
            )} */}

      {/* <ConfirmDeleteDialog
              open={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={async () => {
                if (!details.id) return;
                try {
                  await deleteMaterialARDMutation({
                    id: details.id,
                    module: AuditModules.qualityAssurance.name,
                    subModule: AuditModules.qualityAssurance.analyticalRawData,
                  }).unwrap();
                  toast.success("Material ARD deleted successfully");
                  dispatch(commonActions.setTriggerReload());
                } catch (error) {
                  toast.error(isErrorResponse(error as ErrorResponse)?.description);
                }
              }}
            /> */}
    </div>
  );
}

export const column: ColumnDef<JobRequestRead>[] = [
  {
    header: "Department",
    accessorKey: "department",
    cell: ({ row }) => <div>{row.original?.department?.name || "N/A"}</div>,
  },
  {
    header: "Job Location",
    accessorKey: "jobLocation",
    cell: ({ row }) => <div>{row.original?.location || "N/A"}</div>,
  },
  {
    header: "Issued By",
    accessorKey: "issuedById",
    cell: ({ row }) => (
      <div>{`${row.original?.issuedBy?.firstName} ${row.original?.issuedBy?.lastName}`}</div>
    ),
  },
  {
    header: "Issued Date",
    accessorKey: "dateOfIssue",
    cell: ({ row }) => (
      <div>
        {row.original?.dateOfIssue &&
          format(new Date(row.original?.dateOfIssue), "MMMM dd, yyyy")}
      </div>
    ),
  },
  {
    header: "Preferred Completion Date",
    accessorKey: "preferredCompletionDate",
    cell: ({ row }) => (
      <div>
        {row.original?.preferredCompletionDate &&
          format(
            new Date(row.original?.preferredCompletionDate),
            "MMMM dd, yyyy",
          )}
      </div>
    ),
  },
  {
    header: "Job Status",
    accessorKey: "status",
    cell: ({ row }) => <div>{row.original?.status || "N/A"}</div>,
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
