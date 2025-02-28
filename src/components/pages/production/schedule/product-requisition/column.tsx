import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { DropdownMenuItem } from "@/components/ui";
import { Units, convertToLargestUnit } from "@/lib";
import { ProductionScheduleProcurementDto } from "@/lib/redux/api/openapi.generated";
import { TableCheckbox } from "@/shared/datatable/table-check";
import { TableMenuAction } from "@/shared/table-menu";

import InternalTransfers from "./internal-request";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<
  TData extends ProductionScheduleProcurementDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [materialInfo, setMaterialInfo] =
    useState<ProductionScheduleProcurementDto>(
      {} as ProductionScheduleProcurementDto,
    );

  const difference =
    (row.original.material?.totalStock ?? 0) -
    (row.original.quantityNeeded ?? 0);

  const canTransferStock = difference > 0;

  return (
    <div className="flex items-center justify-end gap-2">
      {canTransferStock && (
        <TableMenuAction>
          <DropdownMenuItem className="group">
            <div
              className="flex cursor-pointer items-center justify-start gap-2"
              onClick={() => {
                setMaterialInfo(row.original);
                setIsOpen(true);
              }}
            >
              <span className="text-neutral-dark">Internal Stock Transfer</span>
            </div>
          </DropdownMenuItem>
        </TableMenuAction>
      )}

      {row.original.material?.id && isOpen && (
        <InternalTransfers
          materialInfo={materialInfo}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<ProductionScheduleProcurementDto>[] = [
  TableCheckbox(),
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="">{row.original.material?.code}</div>,
  },
  {
    accessorKey: "material",
    header: "Material",
    cell: ({ row }) => <div className="">{row.original.material?.name}</div>,
  },
  {
    accessorKey: "qty",
    header: "Quantity Needed",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantityNeeded as number,
        row.original.baseUoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock Available",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantityOnHand as number,
        row.original.baseUoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "otherstock",
    header: "Other Sources Available",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.material?.totalStock as number,
        row.original.baseUoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value} {qty.unit}
        </div>
      );
    },
  },

  {
    id: "tools",
    enableHiding: false,
    meta: { omitRowClick: true, pin: "right" },
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
