import { ColumnDef, Row } from "@tanstack/react-table";

import { Icon } from "@/components/ui";
import { ColumnType } from "@/shared/datatable";

// import Edit from "./edit";
import { MaterialRequestDto } from "./type";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData extends MaterialRequestDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <section className="flex items-center justify-end gap-2">
      <Icon
        name="Trash2"
        className="h-5 w-5 cursor-pointer text-red-500"
        onClick={() => {
          console.log(row.original);
        }}
      />
    </section>
  );
}
export const getColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>,
): ColumnDef<MaterialRequestDto>[] => [
  // {
  //   accessorKey: "purchaseOrderCode",
  //   header: "PO",
  // },
  {
    accessorKey: "code",
    header: "Material Code",
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
  },

  {
    accessorKey: "costPrice",
    header: "Price per Unit",
  },
  {
    accessorKey: "expectedQuantity",
    header: "Expected Quantity",
  },
  {
    accessorKey: "uomName",
    header: "UOM",
  },
  {
    accessorKey: "receivedQuantity",
    header: "Received Quantity",
    meta: {
      edittableCell: {
        type: ColumnType.NUMBER,
        editable: true,
        setItemLists,
      },
    },
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
  },
  {
    accessorKey: "manufacturerId",
    header: "Manufacturers",
    meta: {
      edittableCell: {
        type: ColumnType.SELECT,
        editable: true,
        setItemLists,
      },
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    meta: {
      edittableCell: {
        type: ColumnType.TEXT,
        editable: true,
        setItemLists,
      },
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
