import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialSpecificationDto,
  useDeleteApiV1MaterialSpecificationsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends MaterialSpecificationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const [deleteMaterialSpecification] =
    useDeleteApiV1MaterialSpecificationsByIdMutation();
  const router = useRouter();
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          // Handle edit action
          router.push(
            `/qc/material-specification/${row.original.id}/edit?kind=${row.original.material?.kind}`,
          );
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
            if (!row?.original?.id) return;
            try {
              await deleteMaterialSpecification({
                id: row.original.id as string,
              }).unwrap();
              setIsDelete(false);
              dispatch(commonActions.setTriggerReload());
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
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.material?.code}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "spcNumber",
    header: "SPEC",
    cell: ({ row }) => <div>{row.original?.specificationNumber}</div>,
  },
  {
    accessorKey: "effectiveDate",
    header: "Effective Date",
    cell: ({ row }) => (
      <div>
        {row.original.effectiveDate
          ? format(row.original.effectiveDate, "MMM d, yyyy")
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
          ? format(row.original.reviewDate, "MMM d, yyyy")
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
    cell: ({ row }) => <div>{row.original?.supersedesNumber}</div>,
  },

  {
    id: "actions",
    meta: {
      omitRowClick: true,
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
