import { ColumnDef } from "@tanstack/react-table";

// import { Units, convertToLargestUnit } from "@/lib";
import { ProformaInvoiceDto } from "@/lib/redux/api/openapi.generated";

export const getColums = (): ColumnDef<ProformaInvoiceDto>[] => [
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: () => <div></div>,
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: () => (
      // <div>{row.original.product.batchNumber}</div>
      <div></div>
    ),
  },
  {
    accessorKey: "expirationDate",
    header: "Exp Date",
    cell: () => <div>{}</div>,
  },
  {
    accessorKey: "quantityShipped",
    header: "Qty Shipped",
    cell: () => <div>{}</div>,
  },
  {
    accessorKey: "qtyLoose",
    header: "Qty Loose",
    cell: () => <div> </div>,
  },
  {
    accessorKey: "packSize",
    header: "Pack Size",
    cell: () => <div> </div>,
  },
  {
    accessorKey: "NumberobBatches",
    header: "No. Batches",
    cell: () => <div> </div>,
  },
  {
    accessorKey: "uinitPrice",
    header: "Unit Price",
    cell: () => <div> </div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: () => (
      <div>
        {/* {currency}{" "} */}
        {/* {(
          (row.original.price || 0) *
          (convertToLargestUnit(
            row.original.quantity as number,
            row.original.uom?.symbol as Units,
          ).value || 0)
        ).toFixed(2)} */}
      </div>
    ),
  },
];
