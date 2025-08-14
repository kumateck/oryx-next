import { ColumnDef } from "@tanstack/react-table";

import { ShipmentDocumentDto } from "@/lib/redux/api/openapi.generated";
import { cn, getEnumBadge, ShipmentDocumentType, ShipmentStatus } from "@/lib";

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
    cell: ({ row }) => {
      const status = row.original.status as ShipmentStatus;
      const { label, colorClass } = getEnumBadge(ShipmentStatus, status);

      return (
        <div
          className={cn(
            `inline-block rounded-full px-2 py-1 text-xs font-medium `,
            colorClass,
          )}
        >
          {label}
        </div>
      );
    },
  },
];
