import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { ErrorResponse, isErrorResponse } from "@/lib";
import {
  ProductSpecificationDtoRead,
  TestStage,
  useDeleteApiV1ProductSpecificationsByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { TestStageEnum } from "./types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ProductSpecificationDtoRead>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const [deleteProductSpecification] =
    useDeleteApiV1ProductSpecificationsByIdMutation();
  const router = useRouter();
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-500"
        onClick={() => {
          // Handle edit action
          router.push(`/qc/product-specification/${row.original.id}/edit?kind`);
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
              await deleteProductSpecification({
                id: row.original.id as string,
              }).unwrap();
              setIsDelete(false);
              dispatch(commonActions.setTriggerReload());
              toast.success("Product specification deleted successfully.");
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

export const columns: ColumnDef<ProductSpecificationDtoRead>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.product?.name}</div>,
  },
  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => <div>{row.original.product?.code}</div>,
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => (
      <div>{TestStageEnum[row.original.testStage as TestStage]}</div>
    ),
  },
  {
    accessorKey: "specificationNumber",
    header: "SPEC Number",
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
