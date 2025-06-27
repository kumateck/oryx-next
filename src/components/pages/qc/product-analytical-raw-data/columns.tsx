import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import {
  ProductAnalyticalRawDataDto,
  useDeleteApiV1ProductArdByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Edit } from "./edit";
import { ProductArdSchemaType, Stage, stageLabels } from "./types";
import { DownloadAttachmentButton } from "../attechment-download";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends ProductAnalyticalRawDataDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteProductARDMutation] = useDeleteApiV1ProductArdByIdMutation();
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-end gap-2">
      <DownloadAttachmentButton
        attachments={
          row.original.attachments?.map((atta) => ({
            url: atta.link as string,
            fileName: atta.name as string,
          })) || []
        }
      />
      <Icon
        name="Pencil"
        className="h-5 w-5 cursor-pointer text-neutral-700"
        onClick={() => {
          setIsEdit(true);
        }}
      />
      <Icon
        name="Trash"
        className="text-red-500 h-5 w-5 cursor-pointer"
        onClick={() => {
          setIsDeleteOpen(true);
        }}
      />

      {isEdit && (
        <Edit
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          id={row.original.id as string}
          details={
            {
              description: row.original.description as string,
              formId: {
                value: row.original.form?.id as string,
                label: row.original.form?.name as string,
              },
              stpId: {
                label: row.original.productStandardTestProcedure
                  ?.stpNumber as string,
                value: row.original.productStandardTestProcedure?.id as string,
              },
              specNumber: row.original.specNumber as string,
              stage: {
                value: row.original.stage as Stage,
                label: stageLabels[row.original.stage as Stage],
              },
            } as ProductArdSchemaType
          }
        />
      )}

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          if (!row.original.productStandardTestProcedure?.id) return;
          try {
            await deleteProductARDMutation({
              id: row.original.productStandardTestProcedure?.id,
              module: AuditModules.qualityAssurance.name,
              subModule: AuditModules.qualityAssurance.analyticalRawData,
            }).unwrap();
            toast.success("Product ARD deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}

export const columns: ColumnDef<ProductAnalyticalRawDataDto>[] = [
  {
    accessorKey: "Name",
    header: "Product Name",
    cell: ({ row }) => (
      <div>{row.original?.productStandardTestProcedure?.product?.name}</div>
    ),
  },

  {
    accessorKey: "stpNumber",
    header: "STP Number",
    cell: ({ row }) => (
      <div>{row.original?.productStandardTestProcedure?.stpNumber}</div>
    ),
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      console.log(
        "row.original.stage",
        stageLabels[row.original?.stage as Stage],
      );
      return <div>{stageLabels[row.original?.stage as Stage]}</div>;
    },
  },
  {
    accessorKey: "specNumber",
    header: "Spec Number",
    cell: ({ row }) => <div>{row.original?.specNumber}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
