import { ColumnDef } from "@tanstack/react-table";

import { Units, convertToLargestUnit } from "@/lib";
import { ShipmentInvoiceItemDto } from "@/lib/redux/api/openapi.generated";

export const getColumns = (): ColumnDef<ShipmentInvoiceItemDto>[] => [
  {
    accessorKey: "materialCode",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.material?.code ?? "-"}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.material?.name ?? "-"}</div>,
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => <div>{row.original.manufacturer?.name ?? "-"}</div>,
  },
  {
    accessorKey: "orderQuantity",
    header: "Order Quantity",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.receivedQuantity as number,
        row.original.uoM?.symbol as Units,
      );
      return (
        <div className="">
          {qty.value.toFixed(2)} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "pricePerUnit",
    header: "Price per Unit",
    cell: ({ row }) => <div>{row.original.price ?? "-"}</div>,
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.receivedQuantity as number,
        row.original.uoM?.symbol as Units,
      );
      return <div className="">{qty.value * (row.original.price ?? 0)}</div>;
    },
    // cell: ({ row }) => (
    //   <div>
    //     {row.original.price !== undefined
    //       ? (row.original.receivedQuantity as number) * row.original.price
    //       : "-"}
    //   </div>
    // ),
  },
];
