"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { Button, Icon } from "@/components/ui";
import { routes } from "@/lib";
import {
  DistributedRequisitionMaterialDto,
  WarehouseArrivalLocationDto,
} from "@/lib/redux/api/openapi.generated";
import { TableCheckbox } from "@/shared/datatable/table-check";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends WarehouseArrivalLocationDto>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  return (
    <section className="flex items-center justify-end gap-2">
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="default"
          size={"sm"}
          onClick={() =>
            router.push(routes.createChecklist(row.original.id as string))
          }
        >
          <Icon name="Plus" className="h-4 w-4" /> <span>Create Checklist</span>
        </Button>
      </div>
    </section>
  );
}

export const columns: ColumnDef<DistributedRequisitionMaterialDto>[] = [
  TableCheckbox(),
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
    cell: ({ row }) => (
      <div className="">{row.original.manufacturer?.name}</div>
    ),
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
    cell: ({ row }) => <div>{row.original.shipmentInvoice?.code}</div>,
  },
  {
    accessorKey: "orderQuantity",
    header: "Order Quantity",
    cell: ({ row }) => <div>{row.original.quantity}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.confirmArrival}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
