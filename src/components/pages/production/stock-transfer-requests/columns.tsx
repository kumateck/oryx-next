import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  Button,
  ConfirmDeleteDialog,
  ConfirmDialog,
  Icon,
} from "@/components/ui";
import {
  ErrorResponse,
  StockTransfer,
  TransferType,
  Units,
  convertToLargestUnit,
  isErrorResponse,
} from "@/lib";
import {
  DepartmentStockTransferDtoRead,
  usePutApiV1ProductionScheduleStockTransferApproveByStockTransferIdMutation,
  usePutApiV1ProductionScheduleStockTransferRejectByStockTransferIdMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

export const getColumns = (
  type: TransferType,
  currentDepartment: string,
): ColumnDef<DepartmentStockTransferDtoRead>[] => [
  {
    accessorKey: "date",
    header: "Requested Date",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? format(row.original.createdAt, "MMM d, yyyy")
          : "-"}
        {currentDepartment}
      </div>
    ),
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "department",
    header:
      Number(type) === TransferType.Inbound
        ? "Request Department"
        : "Supplier Department",
    cell: ({ row }) => (
      <div>
        {Number(type) === TransferType.Inbound
          ? row.original.fromDepartment?.name
          : row.original.toDepartment?.name}
      </div>
    ),
  },
  {
    accessorKey: "qty",
    header: "Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original?.quantity as number,
        row.original.uoM?.symbol as Units,
      );
      return (
        <div>
          {qty.value}
          {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {
          StockTransfer[
            row.original.status as unknown as keyof typeof StockTransfer
          ]
        }
      </div>
    ),
  },
  ...(Number(type) === TransferType.Inbound
    ? [
        {
          id: "actions",
          cell: ({ row }: { row: Row<DepartmentStockTransferDtoRead> }) => (
            <DataTableRowActions row={row} />
          ),
        },
      ]
    : []),
];

export function DataTableRowActions<
  TData extends DepartmentStockTransferDtoRead,
>({ row }: { row: Row<TData> }) {
  const dispatch = useDispatch();
  // console.log(row.original);
  const [approveMutation, { isLoading: isLoadingApprove }] =
    usePutApiV1ProductionScheduleStockTransferApproveByStockTransferIdMutation();
  const [rejectMutation, { isLoading: isLoadingReject }] =
    usePutApiV1ProductionScheduleStockTransferRejectByStockTransferIdMutation();
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);
  const [isRejectedOpen, setIsRejectedOpen] = useState(false);

  const handleApproval = async () => {
    try {
      await approveMutation({
        stockTransferId: row.original.id as string,
      }).unwrap();
      toast.success("Transfer approved successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  const handleRejection = async () => {
    try {
      await rejectMutation({
        stockTransferId: row.original.id as string,
      }).unwrap();
      toast.success("Transfer rejected successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };
  return (
    <section className="flex items-center justify-end gap-2">
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="success"
          size="sm"
          className="rounded-2xl"
          onClick={() => setIsApprovalOpen(true)}
        >
          {isLoadingApprove ? (
            <Icon name="LoaderCircle" className="size-4 animate-spin" />
          ) : (
            <Icon name="Check" className="size-4" />
          )}
          <span>Approve</span>
        </Button>

        <Button
          variant="destructive"
          size="sm"
          className="rounded-2xl"
          onClick={() => setIsRejectedOpen(true)}
        >
          {isLoadingReject ? (
            <Icon name="LoaderCircle" className="size-4 animate-spin" />
          ) : (
            <Icon name="X" className="size-4" />
          )}
          <span>Reject</span>
        </Button>
      </div>

      <ConfirmDialog
        confirmText="Approve"
        description="Are you sure you want to approve this transfer?"
        open={isApprovalOpen}
        onClose={() => setIsApprovalOpen(false)}
        onConfirm={handleApproval}
        icon="Check"
      />
      <ConfirmDeleteDialog
        title="Reject Transfer Request"
        confirmText="Reject"
        open={isRejectedOpen}
        onClose={() => setIsRejectedOpen(false)}
        onConfirm={handleRejection}
        description="Are you sure you want to reject this transfer?"
      />
    </section>
  );
}
