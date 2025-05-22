import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import {
  StandardTestProcedureDto,
  useDeleteApiV1StandardTestProceduresByIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Edit } from "./edit";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends StandardTestProcedureDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [details, setDetails] = useState<StandardTestProcedureDto>(
    {} as StandardTestProcedureDto,
  );
  const [deletStandartTestProcedureMutation] =
    useDeleteApiV1StandardTestProceduresByIdMutation();
  const dispatch = useDispatch();
  //function for deleting STP
  const handleDeleteSte = async () => {
    if (!details.id) return;
    try {
      await deletStandartTestProcedureMutation({
        id: details.id,
        module: AuditModules.settings.name,
        subModule: AuditModules.settings.standardTestProcedure,
      }).unwrap();
      toast.success("Standart test procedure deleted successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <div className="flex items-center justify-end gap-2">
      <Icon name="FileDown" />
      <Icon name="Pencil" className="h-5 w-5 cursor-pointer text-neutral-500" />
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
          detailts={{
            stpNumber: details.stpNumber as string,
            materialId: {
              value: details.materialId as string,
              label: details.materialId as string,
            },
            description: details.description as string,
          }}
        />
      )}

      {isDeleteOpen && (
        <ConfirmDeleteDialog
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteSte}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<StandardTestProcedureDto>[] = [
  {
    accessorKey: "stpNumber",
    header: "STP Number",
    cell: ({ row }) => <div>{row.original.stpNumber}</div>,
  },
  {
    accessorKey: "materialId",
    header: "Material Number",
    cell: ({ row }) => <div>{row.original.materialId}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
