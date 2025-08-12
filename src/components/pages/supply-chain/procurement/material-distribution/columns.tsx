import { ColumnDef } from "@tanstack/react-table";

import { ShipmentDocumentDto } from "@/lib/redux/api/openapi.generated";
import { ShipmentDocumentType, ShipmentStatus } from "@/lib";

export const columns: ColumnDef<ShipmentDocumentDto>[] = [
  {
    accessorKey: "code",
    header: "Shipment ID",
    cell: ({ row }) => <div className="min-w-36">{row.original.code}</div>,
  },
  {
    accessorKey: "supplierName",
    header: "Supplier Name",
    cell: ({ row }) => (
      <div>{row.original.shipmentInvoice?.supplier?.name}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Document Type",
    cell: ({ row }) => (
      <div>{ShipmentDocumentType[Number(row.original.type)]}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Document Status",
    cell: ({ row }) => <div>{ShipmentStatus[Number(row.original.status)]}</div>,
  },
];
