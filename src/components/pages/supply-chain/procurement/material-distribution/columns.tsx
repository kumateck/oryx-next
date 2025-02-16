import { ColumnDef } from "@tanstack/react-table";

import { ShipmentDocumentDto } from "@/lib/redux/api/openapi.generated";

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
];
