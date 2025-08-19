import { ColumnDef } from "@tanstack/react-table";

import {
  DistributedMaterialStatus,
  Units,
  convertToLargestUnit,
  getEnumBadgeWithHexColors,
} from "@/lib";
import { DistributedRequisitionMaterialDto } from "@/lib/redux/api/openapi.generated";
import StatusBadge from "@/shared/status-badge";

// const batchStatusColors: Record<DistributedMaterialStatus, string> = {
//   [DistributedMaterialStatus.Distributed]: "bg-blue-100 text-blue-800",
//   [DistributedMaterialStatus.Arrived]: "bg-yellow-100 text-yellow-800",
//   [DistributedMaterialStatus.Checked]: "bg-green-100 text-green-800",
//   [DistributedMaterialStatus.GrnGenerated]: "bg-orange-100 text-orange-800",
// };

export const getColumns =
  (): ColumnDef<DistributedRequisitionMaterialDto>[] => [
    {
      accessorKey: "materialName",
      header: "Material Name",
      cell: ({ row }) => (
        <div className="min-w-36">{row.original.material?.name}</div>
      ),
    },
    {
      accessorKey: "manufacturerName",
      header: "Manufacturer Name",
      cell: ({ row }) => <div className="">{row.original.material?.name}</div>,
    },
    {
      accessorKey: "invoiceNumber",
      header: "Invoice Number",
      cell: ({ row }) => <div>{row.original.shipmentInvoice?.code}</div>,
    },
    {
      accessorKey: "orderQuantity",
      header: "Order Quantity",
      cell: ({ row }) => {
        const qty = convertToLargestUnit(
          row.original.quantity as number,
          row.original.uom?.symbol as Units,
        );
        return (
          <div>
            {qty.value}
            {qty.unit}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status as DistributedMaterialStatus;
        const { label, style } = getEnumBadgeWithHexColors(
          DistributedMaterialStatus,
          status,
        );

        return <StatusBadge label={label} style={style} />;
      },
    },
  ];
