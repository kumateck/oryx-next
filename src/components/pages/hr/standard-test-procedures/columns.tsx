import { ConfirmDeleteDialog, Icon } from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import {
  MaterialStandardTestProcedureDto,
  useDeleteApiV1MaterialStpsByIdMutation,
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
export function DataTableRowActions<
  TData extends MaterialStandardTestProcedureDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<MaterialStandardTestProcedureDto>(
    {} as MaterialStandardTestProcedureDto,
  );
  const [deleteMaterialSTPMutation] = useDeleteApiV1MaterialStpsByIdMutation();
  const dispatch = useDispatch();
  //function for deleting STP
  const handleDeleteSte = async () => {
    if (!details.id) return;
    try {
      await deleteMaterialSTPMutation({
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
          detailts={{
            stpNumber: details.stpNumber as string,
            materialId: {
              value: details.materialId as string,
              label: details.material?.name as string,
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

export const columns: ColumnDef<MaterialStandardTestProcedureDto>[] = [
  {
    accessorKey: "stpNumber",
    header: "STP Number",
    cell: ({ row }) => <div>{row.original.stpNumber}</div>,
  },
  {
    accessorKey: "materialId",
    header: "Material Number",
    cell: ({ row }) => <div>{row.original?.material?.name}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
