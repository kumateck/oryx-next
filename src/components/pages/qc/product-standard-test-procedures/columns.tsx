import {
  ConfirmDeleteDialog,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { AuditModules, ErrorResponse, isErrorResponse } from "@/lib";
import {
  ProductStandardTestProcedureDto,
  useDeleteApiV1ProductStpsByIdMutation,
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
  TData extends ProductStandardTestProcedureDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [details, setDetails] = useState<
    ProductStandardTestProcedureDto & {
      productName: string;
    }
  >({
    productName: "",
  } as ProductStandardTestProcedureDto & {
    productName: string;
  });
  const [deleteProductSTPMutation] = useDeleteApiV1ProductStpsByIdMutation();
  const dispatch = useDispatch();

  const isConnected = false;

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
          console.log("row", row);
          setDetails({
            ...(row.original as ProductStandardTestProcedureDto),
            productName: row.original.product?.name ?? "",
          });
          setIsEdit(true);
        }}
      />
      <div className="size-fit">
        {/* add a tooltip if stp is active using shadcn ui */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Icon
              name="Trash"
              className="text-red-500 h-5 w-5 cursor-pointer"
              onClick={() => {
                setDetails({
                  ...(row.original as ProductStandardTestProcedureDto),
                  productName: ((row.original as any)?.productName ??
                    "") as string,
                });
                setIsDeleteOpen(true);
              }}
            />
          </TooltipTrigger>
          {isConnected && (
            <TooltipContent>
              <span>
                This STP cannot be deleted because it is currently assigned.
              </span>
            </TooltipContent>
          )}
        </Tooltip>
      </div>

      {isEdit && (
        <Edit
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          id={details.id as string}
          details={{
            stpNumber: details.stpNumber as string,
            productId: {
              value: details.product?.id as string,
              label: details.product?.name as string,
            },
          }}
        />
      )}

      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async () => {
          if (!details.id) return;
          try {
            await deleteProductSTPMutation({
              id: details.id,
              module: AuditModules.settings.name,
              subModule: AuditModules.settings.standardTestProcedure,
            }).unwrap();
            toast.success("Standart test procedure deleted successfully");
            dispatch(commonActions.setTriggerReload());
          } catch (error) {
            toast.error(isErrorResponse(error as ErrorResponse)?.description);
          }
        }}
      />
    </div>
  );
}

export const columns: ColumnDef<ProductStandardTestProcedureDto>[] = [
  {
    accessorKey: "stpNumber",
    header: "STP Number",
    cell: ({ row }) => <div>{row.original.stpNumber}</div>,
  },
  {
    accessorKey: "productId",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original?.product?.name}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
