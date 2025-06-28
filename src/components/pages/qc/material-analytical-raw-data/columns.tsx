import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialAnalyticalRawDataDto,
  useDeleteApiV1MaterialArdByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Edit } from "./edit";
import { DownloadAttachmentButton } from "../attechment-download";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<
  TData extends MaterialAnalyticalRawDataDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<MaterialAnalyticalRawDataDto>(
    {} as MaterialAnalyticalRawDataDto,
  );
  const [deleteMaterialARDMutation] = useDeleteApiV1MaterialArdByIdMutation();
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
          setDetails(row.original);
          setIsEdit(true);
        }}
      />
      <Icon
        name="Trash"
        className="text-red-500 h-5 w-5 cursor-pointer"
        onClick={() => {
          setDetails(row.original);
          setIsDeleteOpen(true);
        }}
      />

      {isEdit && (
        <Edit
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          id={details.id as string}
          details={details}
        />
      )}

      <ConfirmDeleteDialog
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
      />
    </div>
  );
}

export const columns: ColumnDef<MaterialAnalyticalRawDataDto>[] = [
  {
    accessorKey: "Name",
    header: "Material Name",
    cell: ({ row }) => (
      <div>{row.original?.materialStandardTestProcedure?.material?.name}</div>
    ),
  },
  {
    accessorKey: "stpNumber",
    header: "STP Number",
    cell: ({ row }) => (
      <div>{row.original?.materialStandardTestProcedure?.stpNumber}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
