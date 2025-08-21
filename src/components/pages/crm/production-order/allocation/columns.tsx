import { ColumnType } from "@/shared/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { ExtendedOrderedProduct } from "./type";

export const getPurchaseColumns = (
  setItemLists: React.Dispatch<React.SetStateAction<ExtendedOrderedProduct[]>>,
  // options?: Option[],
): ColumnDef<ExtendedOrderedProduct>[] => [
  {
    accessorKey: "code",
    header: "Product Code",
    cell: ({ row }) => <div>{row.original.product?.code}</div>,
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.product?.name}</div>,
  },
  {
    accessorKey: "quantityRequested",
    header: "Qty Requested",
    cell: ({ row }) => <div>{row.original.totalOrderQuantity}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Allocated Quantity",
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
