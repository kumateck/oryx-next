import { ColumnDef } from "@tanstack/react-table";

import { PurchaseOrderItemDtoRead } from "@/lib/redux/api/openapi.generated";
import { convertToLargestUnit, getSmallestUnit, Units } from "@/lib";

export const getColumns = (
  currency: string,
): ColumnDef<PurchaseOrderItemDtoRead>[] => [
  {
    accessorKey: "code",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.purchaseOrder?.code}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.material?.name}</div>,
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => (
      <div>
        {row.original.manufacturers
          ?.map((manufacturer) => manufacturer.manufacturer?.name)
          .join(", ")}
      </div>
    ),
  },
  // {
  //   accessorKey: "requestedQuantiy",
  //   header: "UOM",
  //   // cell: ({ row }) => <div>{row.original.uom?.symbol}</div>,
  //   cell: ({ row }) => {
  //     const qty = convertToLargestUnit(
  //       row.original.quantity as number,
  //       getSmallestUnit(row.original.uom?.symbol as Units),
  //     );
  //     return <div className="">{qty.unit}</div>;
  //   },
  // },
  {
    accessorKey: "quantity",
    header: "Requested Quantity",
    // cell: ({ row }) => <div>{row.original.quantity}</div>,
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantity as number,
        getSmallestUnit(row.original.uom?.symbol as Units),
      );
      return (
        <div className="">
          {qty.value}
          {qty.unit}
        </div>
      );
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div>
        {currency} {row.original.price}
      </div>
    ),
  },
];
