import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

type bincardTypes = {
  date: Date;
  description: string;
  waybill: string;
  batchNumber: string;
  ARNumber: string;
  manufacturedDate: Date;
  expiryDate: Date;
  productName: string;
  quantityReceived: number;
  quantityIssued: number;
  balanceQuantity: number;
};

type generalTypes = {
  batchNumber: string;
  quantity: number;
  manufactureData: string;
  expiryDate: Date;
};

export const generalColumn: ColumnDef<generalTypes>[] = [
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
  {
    accessorKey: "manufactureData",
    header: "Manufacture Date",
    cell: ({ row }) => <div>{row.original.manufactureData}</div>,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>{format(row.original.expiryDate ?? "", "MMM d, yyyy")}</div>
    ),
  },
];

export const bincardColumn: ColumnDef<bincardTypes>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>{format(row.original.date ?? "", "MMM d, yyyy")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
  },
  {
    accessorKey: "waybill",
    header: "Waybill",
    cell: ({ row }) => <div>{row.original.waybill}</div>,
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => <div>{row.original.batchNumber}</div>,
  },
  {
    accessorKey: "ARNumber",
    header: "AR No.",
    cell: ({ row }) => <div>{row.original.ARNumber}</div>,
  },
  {
    accessorKey: "manufacturedDate",
    header: "Manufacturing Date",
    cell: ({ row }) => (
      <div>{format(row.original.manufacturedDate ?? "", "MMM d, yyyy")}</div>
    ),
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => (
      <div>{format(row.original.expiryDate ?? "", "MMM d, yyyy")}</div>
    ),
  },
  {
    accessorKey: "quantityReceived",
    header: "Quantity Received",
    cell: ({ row }) => (
      <div className=" text-green-700 ">
        {row.original.quantityReceived} Bottles
      </div>
    ),
  },
  {
    accessorKey: "quantityIssued",
    header: "Quantity Issued",
    cell: ({ row }) => (
      <div className="w-full text-red-700 ">
        {row.original.quantityIssued} Bottles
      </div>
    ),
  },
  {
    accessorKey: "balanceQuantity",
    header: "Balance Quantity",
    cell: ({ row }) => <div>{row.original.balanceQuantity} Bottles</div>,
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    cell: ({ row }) => <div>{row.original.productName}</div>,
  },
];

export const dummyGeneral: generalTypes[] = [
  {
    batchNumber: "BATCH-001",
    quantity: 500,
    manufactureData: "2025-01-15",
    expiryDate: new Date("2026-01-15"),
  },
  {
    batchNumber: "BATCH-002",
    quantity: 300,
    manufactureData: "2025-02-10",
    expiryDate: new Date("2026-02-10"),
  },
  {
    batchNumber: "BATCH-003",
    quantity: 800,
    manufactureData: "2025-03-05",
    expiryDate: new Date("2026-03-05"),
  },
  {
    batchNumber: "BATCH-004",
    quantity: 1000,
    manufactureData: "2025-04-20",
    expiryDate: new Date("2026-04-20"),
  },
];

export const dummyBincards: bincardTypes[] = [
  {
    date: new Date("2025-06-10"),
    description: "Received stock from central warehouse",
    waybill: "WB-34567",
    batchNumber: "BATCH-20250610",
    ARNumber: "AR-001122",
    manufacturedDate: new Date("2025-03-01"),
    expiryDate: new Date("2026-03-01"),
    productName: "Paracetamol 500mg",
    quantityReceived: 1000,
    quantityIssued: 0,
    balanceQuantity: 1000,
  },
  {
    date: new Date("2025-06-12"),
    description: "Issued to Ward A",
    waybill: "WB-34568",
    batchNumber: "BATCH-20250610",
    ARNumber: "AR-001122",
    manufacturedDate: new Date("2025-03-01"),
    expiryDate: new Date("2026-03-01"),
    productName: "Paracetamol 500mg",
    quantityReceived: 0,
    quantityIssued: 200,
    balanceQuantity: 800,
  },
  {
    date: new Date("2025-06-15"),
    description: "Received emergency stock",
    waybill: "WB-34600",
    batchNumber: "BATCH-20250615",
    ARNumber: "AR-001133",
    manufacturedDate: new Date("2025-04-01"),
    expiryDate: new Date("2026-04-01"),
    productName: "Amoxicillin 250mg",
    quantityReceived: 500,
    quantityIssued: 0,
    balanceQuantity: 500,
  },
  {
    date: new Date("2025-06-17"),
    description: "Issued to OPD",
    waybill: "WB-34605",
    batchNumber: "BATCH-20250615",
    ARNumber: "AR-001133",
    manufacturedDate: new Date("2025-04-01"),
    expiryDate: new Date("2026-04-01"),
    productName: "Amoxicillin 250mg",
    quantityReceived: 0,
    quantityIssued: 150,
    balanceQuantity: 350,
  },
];
