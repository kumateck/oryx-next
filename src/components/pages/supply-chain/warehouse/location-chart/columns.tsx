import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Icon } from "@/components/ui";
import { MaterialBatchDto } from "@/lib/redux/api/openapi.generated";
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

export const getColumns = (): ColumnDef<MaterialBatchDto>[] => [
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
    cell: ({ row }) => <div>{row.original.manufacturingDate}</div>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => <div>{row.original.expiryDate}</div>,
  },
  {
    accessorKey: "status",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    accessorKey: "retestDate",
    header: "Retest Date",
    cell: ({ row }) => <div>{row.original.expiryDate}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
