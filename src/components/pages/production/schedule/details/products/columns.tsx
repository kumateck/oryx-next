import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from "react";

import { MaterialStatus } from "@/lib";
import AllStockByMaterial from "@/shared/all-stock";
import { ColumnType } from "@/shared/datatable";
import TableBadge from "@/shared/datatable/badge";

// import { Option } from "@/lib";
// import Edit from "./edit";
import { MaterialRequestDto } from "./type";

export const getColumns: ColumnDef<MaterialRequestDto>[] = [
  {
    accessorKey: "code",
    header: "Material Code",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "finalQuantityNeeded",
    header: "Quantity Needed",
    cell: ({ row }) => <div>{row.original.finalQuantityNeeded}</div>,
  },
  {
    accessorKey: "finalQuantityOnHand",
    header: "Warehouse Stock",
    cell: ({ row }) => <div>{row.original.finalQuantityOnHand}</div>,
  },

  {
    accessorKey: "finalTotalStock",
    header: "All other Source Stock",
    cell: ({ row }) => (
      <div>
        <DataRowAllStock row={row}>
          {row.original.finalTotalStock}
        </DataRowAllStock>
      </div>
    ),
  },
  {
    id: "label",
    header: "Source",
    cell: ({ row }) => (
      <div className="flex items-center">
        {
          <TableBadge
            className="rounded-full px-3 py-1 text-sm font-medium capitalize"
            status={row.original?.materialStatus as unknown as MaterialStatus}
          />
        }
      </div>
    ),
  },
];

export const getPurchaseColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
  // options?: Option[],
): ColumnDef<MaterialRequestDto>[] => [
  {
    accessorKey: "code",
    header: "Material Code",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
  },
  {
    accessorKey: "uom",
    header: "Unit of Measurement",
  },
  {
    accessorKey: "quantityRequested",
    header: "Qty Requested",
    cell: ({ row }) => <div>{row.original.quantityRequested}</div>,
  },
  {
    accessorKey: "quantityOnHand",
    header: "Warehouse Stock",
    cell: ({ row }) => <div>{row.original.quantityOnHand}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Order Quantity",
    meta: {
      edittableCell: {
        min: true,
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },
];

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  children?: React.ReactNode;
}
export function DataRowAllStock<TData extends MaterialRequestDto>({
  row,
  children,
}: DataTableRowActionsProps<TData>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer underline hover:text-primary-hover"
      >
        {children}
      </div>
      <div>
        {isOpen && (
          <AllStockByMaterial
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            materialId={row.original.materialId}
            materialName={row.original.materialName as string}
          />
        )}
      </div>
    </div>
  );
}
