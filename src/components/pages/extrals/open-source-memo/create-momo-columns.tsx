import { MemoItemDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<MemoItemDtoRead>[] = [
  {
    header: "Item Name",
    accessorKey: "name",
    cell: ({ row }) => <div>{row.original.item?.name}</div>,
  },
  {
    header: "Item Code",
    accessorKey: "code",
    cell: ({ row }) => <div>{row.original.item?.code}</div>,
  },
  {
    header: "Requested Quantity",
    accessorKey: "requestedQuantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
  {
    header: "Unit Price",
    accessorKey: "unitPrice",
    cell: ({ row }) => <div>{row.original.pricePerUnit}</div>,
  },
  {
    header: "Total Price",
    accessorKey: "totalPrice",
    cell: ({ row }) => <div>{row.original.itemValue}</div>,
  },
];
