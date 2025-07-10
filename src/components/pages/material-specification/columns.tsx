import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialSpecificationDto,
  useDeleteApiV1MaterialSpecificationsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends MaterialSpecificationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDelete, setIsDelete] = useState(false);
  const [deleteMaterialSpecification] =
    useDeleteApiV1MaterialSpecificationsByIdMutation();
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          // Handle edit action
          console.log("Edit action for row:", row.original);
        }}
      />
      <Icon
        name="Trash"
        className="h-5 w-5 cursor-pointer text-red-500"
        onClick={() => setIsDelete(true)}
      />
      {isDelete && (
        <ConfirmDeleteDialog
          open={isDelete}
          onClose={() => setIsDelete(false)}
          onConfirm={async () => {
            if (row?.original?.id) return;
            try {
              await deleteMaterialSpecification({
                id: row.original.id as string,
              }).unwrap();
              setIsDelete(false);
              toast.success("Material specification deleted successfully.");
            } catch (error) {
              console.error("Error deleting specification:", error);
              toast.error(isErrorResponse(error as ErrorResponse)?.description);
            }
          }}
        />
      )}
    </section>
  );
}

export const columns: ColumnDef<MaterialSpecificationDto>[] = [
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "spcNumber",
    header: "SPC",
    cell: ({ row }) => <div>{row.original?.specificationNumber}</div>,
  },
  {
    accessorKey: "effectiveDate",
    header: "Effective Date",
    cell: ({ row }) => (
      <div>
        {row.original.testSpecifications
          ?.map((test) => test.reference)
          .join(", ")}
        {row.original.effectiveDate
          ? format(row.original.effectiveDate, "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "reviewDate",
    header: "Review Date",
    cell: ({ row }) => (
      // { row }
      <div>
        {row.original.reviewDate
          ? format(row.original.reviewDate, "MMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "revisionNumber",
    header: "Revision Number",
    cell: ({ row }) => <div>{row.original?.revisionNumber}</div>,
  },
  {
    accessorKey: "supercedesNumber",
    header: "Supercedes",
    cell: ({ row }) => <div>{row.original?.supercedesNumber}</div>,
  },

  {
    id: "actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
