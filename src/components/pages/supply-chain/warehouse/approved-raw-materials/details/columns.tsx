import { ColumnDef } from "@tanstack/react-table";

import {
  // BinCardInformationDto,
  ShelfMaterialBatchDto,
} from "@/lib/redux/api/openapi.generated";

export const generalColumns: ColumnDef<ShelfMaterialBatchDto>[] = [
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.materialBatch?.batchNumber}</div>,
  },
  {
    accessorKey: "warehouseLocation",
    header: "Warehouse Location",
    cell: ({ row }) => <div>{row.original.warehouseLocationShelf?.code}</div>,
  },
  {
    accessorKey: "manufacturerName",
    header: "Manufacturer Name",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatch?.checklist?.manufacturer?.name ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "arNumber",
    header: "AR Number",
    cell: ({}) => <div>{"-"}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.materialBatch?.totalQuantity}</div>,
  },
  {
    accessorKey: "manufacturingDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>
        {row.original.materialBatch?.manufacturingDate?.split("T")[0] ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>{row.original.materialBatch?.expiryDate?.split("T")[0] ?? "-"}</div>
    ),
  },
  {
    accessorKey: "retestdate",
    header: "Retest Date",
    cell: ({ row }) => (
      <div>{row.original.materialBatch?.retestDate?.split("T")[0] ?? "-"}</div>
    ),
  },
];

// export const bincardColumns: ColumnDef<BinCardInformationDto>[] = [
//   {
//     accessorKey: "date",
//     header: "Date",
//     cell: ({ row }) => <div>{row.original.expiryDate?.split("T")[0]}</div>,
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//     cell: ({ row }) => <div>{row.original.description}</div>,
//   },
//   {
//     accessorKey: "waybill",
//     header: "Waybill",
//     cell: ({ row }) => <div>{row.original.wayBill ?? "-"}</div>,
//   },
//   {
//     accessorKey: "arNumber",
//     header: "AR No.",
//     cell: ({ row }) => <div>{row.original.arNumber ?? "-"}</div>,
//   },
//   {
//     accessorKey: "manufacturingDate",
//     header: "Manufacturing Date",
//     cell: ({ row }) => (
//       <div>{row.original.manufacturingDate?.split("T")[0]}</div>
//     ),
//   },
//   {
//     accessorKey: "expiryDate",
//     header: "Expiry Date",
//     cell: ({ row }) => <div>{row.original.expiryDate?.split("T")[0]}</div>,
//   },
//   {
//     accessorKey: "quantityReceived",
//     header: "Quantity Received",
//     cell: ({ row }) => {
//       const qty = row.original.quantityReceived ?? 0;
//       return (
//         <div className={qty > 0 ? "bg-green-600" : ""}>
//           {qty !== 0 ? qty : ""}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "quantityIssued",
//     header: "Quantity Issued",
//     cell: ({ row }) => {
//       const qty = row.original.quantityIssued ?? 0;
//       return (
//         <div className={qty > 0 ? "bg-red-400" : ""}>
//           {qty !== 0 ? qty : ""}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "balanceQuantity",
//     header: "Balance Quantity",
//     cell: ({ row }) => <div>{row.original.balanceQuantity ?? ""}</div>,
//   },
//   {
//     accessorKey: "productName",
//     header: "Product Name",
//     cell: ({ row }) => <div>{row.original.productName ?? ""}</div>,
//   },
//   {
//     accessorKey: "batchNumber",
//     header: "Batch Number",
//     cell: ({ row }) => <div>{row.original.batchNumber ?? ""}</div>,
//   },
// ];
