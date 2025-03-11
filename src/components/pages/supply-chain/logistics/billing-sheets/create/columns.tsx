import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";

export const getColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.material?.code}</div>
    ),
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original.material?.name}</div>
    ),
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => <div className="">{row.original.material?.name}</div>,
  },
  {
    accessorKey: "orderQuantity",
    header: "Order Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantity as number,
        row.original.uom?.symbol as Units,
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
    accessorKey: "pricePerUnit",
    header: "Price Per Unit",
    cell: ({}) => <div>{""}</div>,
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({}) => <div>{""}</div>,
  },
];

export const getChargesColumns = (): ColumnDef<any>[] => [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({}) => <div className="min-w-36">{""}</div>,
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({}) => <div className="min-w-36">{""}</div>,
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({}) => <div className="min-w-36">{""}</div>,
  },
];
