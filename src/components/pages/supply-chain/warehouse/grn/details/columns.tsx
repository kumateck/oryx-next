import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { DropdownMenuItem, Icon } from "@/components/ui";
import {
  BatchStatus as BatchStatusEnum,
  Units,
  convertToLargestUnit,
} from "@/lib";
import {
  BatchStatus,
  MaterialBatchDto,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

import AssignLocationDialog from "./assign-location";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends MaterialBatchDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState<MaterialBatchDto | null>(
    null,
  );
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);

  return (
    <section className="flex items-center justify-end gap-2">
      {row.original.status === BatchStatusEnum.Approved && (
        <TableMenuAction>
          <DropdownMenuItem className="group">
            <div
              className="flex cursor-pointer items-center justify-center gap-2"
              onClick={() => {
                setSelectedBatch(row.original);
                setIsAssignLocationOpen(true);
              }}
            >
              <Icon
                name="MapPin"
                className="h-5 w-5 cursor-pointer text-neutral-500"
              />
              <span>Assign Location</span>
            </div>
          </DropdownMenuItem>
        </TableMenuAction>
      )}

      <AssignLocationDialog
        open={isAssignLocationOpen}
        onOpenChange={setIsAssignLocationOpen}
        onSuccess={() => dispatch(commonActions.setTriggerReload())}
        selectedBatch={selectedBatch}
      />
    </section>
  );
}

const batchStatusColors: Record<BatchStatus, string> = {
  [BatchStatusEnum.Received]: "bg-blue-100 text-blue-800",
  [BatchStatusEnum.Quarantine]: "bg-yellow-100 text-yellow-800",
  [BatchStatusEnum.Testing]: "bg-purple-100 text-purple-800",
  [BatchStatusEnum.Available]: "bg-green-100 text-green-800",
  [BatchStatusEnum.Rejected]: "bg-red-100 text-red-800",
  [BatchStatusEnum.Retest]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.Frozen]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.Consumed]: "bg-orange-100 text-orange-800",
  [BatchStatusEnum.Approved]: "bg-orange-100 text-orange-800",
};

export const getColumns = (): ColumnDef<MaterialBatchDto>[] => [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber ?? "-"}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => (
      <div>{row.original.checklist?.material?.name ?? "-"}</div>
    ),
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => (
      <div>{row.original.checklist?.manufacturer?.name ?? "-"}</div>
    ),
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => (
      <div>{row.original.checklist?.shipmentInvoice?.code ?? "-"}</div>
    ),
  },
  {
    accessorKey: "totalQuantity",
    header: "Quantity Received",
    cell: ({ row }) => {
      const totqty = row.original.totalQuantity ?? 0;
      const qty = convertToLargestUnit(
        totqty,
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
    accessorKey: "allocatedQuantity",
    header: "Allocated Quantity",
    cell: ({ row }) => {
      const totqty =
        row.original.events?.reduce(
          (accumulator, event) => accumulator + (event?.quantity ?? 0),
          0,
        ) ?? 0;
      const qty = convertToLargestUnit(
        totqty,
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
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>
        {row.original.expiryDate
          ? format(row.original?.expiryDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.manufacturingDate
          ? format(row.original?.manufacturingDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "retestDate",
    header: "Retest Date",
    cell: ({ row }) => (
      <div>
        {row.original.retestDate
          ? format(row.original?.retestDate, "MMMM dd, yyyy")
          : "-"}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as BatchStatus;
      return (
        <div
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        >
          {BatchStatusEnum[status]}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
