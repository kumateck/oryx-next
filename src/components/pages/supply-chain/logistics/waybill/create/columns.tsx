// Change the type in this line in the table file
// defaultColumns?: ColumnDef<any>[];
import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";
import { ShipmentInvoiceItemDtoRead } from "@/lib/redux/api/openapi.generated";

export const getColumns = (): ColumnDef<ShipmentInvoiceItemDtoRead>[] => [
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original?.material?.code}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original?.material?.name}</div>,
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => <div>{row.original?.manufacturer?.name}</div>,
  },
  {
    accessorKey: "orderQuantity",
    header: "Order Quantity",
    cell: ({ row }) => {
      const converted = convertToLargestUnit(
        row.original.receivedQuantity as number,
        row.original?.uoM?.symbol as Units,
      );
      return (
        <div>
          {converted?.value}
          {converted?.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "pricePerUnit",
    header: "Price Per Unit",
    cell: ({ row }) => <div>{row.original?.price}</div>,
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({}) => <div>{""}</div>,
  },
];
