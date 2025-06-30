import { convertToLargestUnit, Units } from "@/lib";
import { DistributedFinishedProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DistributedFinishedProductDtoRead>[] = [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original?.product?.name}</div>,
  },

  {
    accessorKey: "productCode",
    header: "Product Code",
    cell: ({ row }) => <div>{row.original?.product?.code}</div>,
  },
  {
    accessorKey: "productQuantity",
    header: "Product Quantity",
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
];
