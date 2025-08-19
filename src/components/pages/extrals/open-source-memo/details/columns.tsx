import { MemoItemDtoRead } from "@/lib/redux/api/openapi.generated";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<MemoItemDtoRead>[] = [
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.item?.name || "N/A"}</div>
    ),
  },
  {
    accessorKey: "itemCode",
    header: "Item ID",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.item?.code || "N/A"}</div>
    ),
  },

  {
    accessorKey: "requestedQuantity",
    header: "Requested Qty",
    cell: ({ row }) => (
      <div className="min-w-36">{row.original?.quantity || "N/A"}</div>
    ),
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => (
      <div className="min-w-36">{`${row.original?.termsOfPayment?.symbol} ${row.original?.pricePerUnit}`}</div>
    ),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => (
      <div className="min-w-36">{`${row.original?.termsOfPayment?.symbol} ${row.original?.itemValue}`}</div>
    ),
  },
  //TODO: show the status of a memo
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => <div>{row.original?.|| "N/A"}</div>,
  // }
];
