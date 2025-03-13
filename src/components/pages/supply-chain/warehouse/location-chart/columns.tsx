import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Icon } from "@/components/ui";
import { Units, convertToLargestUnit } from "@/lib";
import { MaterialBatchDto } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { TableMenuAction } from "@/shared/table-menu";

import AssignLocationDialog from "./assign-location";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export type MaterialBatchWithShelfId = MaterialBatchDto & {
  shelfMaterialBatchId: string;
  quantity: number;
};

export function DataTableRowActions<TData extends MaterialBatchWithShelfId>({
  row,
}: DataTableRowActionsProps<TData>) {
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] =
    useState<MaterialBatchWithShelfId | null>(null);
  const [isAssignLocationOpen, setIsAssignLocationOpen] = useState(false);

  return (
    <section className="flex items-center justify-end gap-2">
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

      <AssignLocationDialog
        open={isAssignLocationOpen}
        onOpenChange={setIsAssignLocationOpen}
        onSuccess={() => dispatch(commonActions.setTriggerReload())}
        selectedBatch={selectedBatch}
      />
    </section>
  );
}

export interface BatchColumns {
  id?: string;
  code?: string | null;
  batchNumber?: string | null;
  materialName?: string | null;
  manufacturerName?: string | null;
  invoiceNumber?: string | null;
  status?: number;
  dateReceived?: string;
  dateApproved?: string | null;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string;
  materialCode: string;
}

export const getColumns = (): ColumnDef<MaterialBatchWithShelfId>[] => [
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => (
      <div>{row.original.checklist?.material?.code ?? "-"}</div>
    ),
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => (
      <div>{row.original.checklist?.material?.name ?? "-"}</div>
    ),
  },
  {
    accessorKey: "code",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber ?? "-"}</div>,
  },
  {
    accessorKey: "arNumber",
    header: "AR Number",
    cell: ({ row }) => <div>{row.original.batchNumber ?? "-"}</div>,
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
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantity as number,
        row.original.uoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value} {qty.unit}
        </div>
      );
    },
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
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
