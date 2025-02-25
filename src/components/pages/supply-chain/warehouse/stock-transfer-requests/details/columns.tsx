import { ColumnDef } from "@tanstack/react-table";

export interface BatchColumns {
  id?: string;
  code?: string | null;
  batchNumber?: string | null;
  materialName?: string | null;
  manufacturerName?: string | null;
  invoiceNumber?: string | null;
  status?: number;
  dateReceived?: string;
  dateApproved?: string | null;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string;
}

export const getColumns = (): ColumnDef<BatchColumns>[] => [
  {
    accessorKey: "code",
    header: "Material Code",
    cell: ({ row }) => <div>{row.original.batchNumber ?? "N/A"}</div>,
  },
  {
    accessorKey: "materialName",
    header: "Material Name",
    cell: ({ row }) => <div>{row.original.materialName ?? "N/A"}</div>,
  },
  {
    accessorKey: "requestedQuantity",
    header: "Requested Quantity",
    cell: ({ row }) => <div>{row.original.manufacturerName ?? "N/A"}</div>,
  },
  {
    accessorKey: "warehouseStock",
    header: "Warehouse Stock",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
];
