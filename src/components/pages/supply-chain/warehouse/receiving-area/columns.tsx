"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import { Button, Icon } from "@/components/ui";
import {
  DistributedMaterialStatus,
  Option,
  PermissionKeys,
  Section,
  Units,
  convertToLargestUnit,
  findRecordWithFullAccess,
  routes,
} from "@/lib";
import { DistributedRequisitionMaterialDto } from "@/lib/redux/api/openapi.generated";
import { TableCheckbox } from "@/shared/datatable/table-check";
import MultiSelectListViewer from "@/shared/multi-select-lists";
import { useSelector } from "@/lib/redux/store";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<
  TData extends DistributedRequisitionMaterialDto,
>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const { id, status } = row.original;

  const canCreateChecklist =
    status === DistributedMaterialStatus.Distributed ||
    status === DistributedMaterialStatus.Arrived;

  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];

  return (
    <section className="flex items-center justify-end gap-2">
      <div className="flex items-center justify-end gap-2">
        {canCreateChecklist ? (
          findRecordWithFullAccess(
            permissions,
            PermissionKeys.warehouse.viewReceivedRawMaterialsItems,
          ) && (
            <Button
              variant="default"
              size="sm"
              onClick={() => router.push(routes.createChecklist(id as string))}
            >
              <Icon name="Plus" className="h-4 w-4" />{" "}
              <span>Create Checklist</span>
            </Button>
          )
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => router.push(routes.viewChecklist(id as string))}
          >
            <Icon name="Eye" className="h-4 w-4" /> <span>View Checklist</span>
          </Button>
        )}
      </div>
    </section>
  );
}

const batchStatusColors: Record<DistributedMaterialStatus, string> = {
  [DistributedMaterialStatus.Distributed]: "bg-blue-100 text-blue-800",
  [DistributedMaterialStatus.Arrived]: "bg-yellow-100 text-yellow-800",
  [DistributedMaterialStatus.Checked]: "bg-green-100 text-green-800",
  [DistributedMaterialStatus.GrnGenerated]: "bg-orange-100 text-orange-800",
};

export const columns: ColumnDef<DistributedRequisitionMaterialDto>[] = [
  TableCheckbox<DistributedRequisitionMaterialDto>({
    // Here is where you define the logic:
    // e.g., disable the checkbox if status is 'CLOSED'
    disableRow: (rowData) => {
      return rowData.status === DistributedMaterialStatus.Distributed;
      // or rowData.status === DistributedMaterialStatus.CLOSED
      // or whatever your condition is
    },
  }),
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
      <div className="">
        <MultiSelectListViewer
          className="max-w-60"
          lists={
            row.original.materialItemDistributions?.map((item) => {
              return {
                label: item.shipmentInvoiceItem?.manufacturer?.name as string,
              };
            }) as Option[]
          }
        />
      </div>
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
    cell: ({ row }) => {
      const qty = convertToLargestUnit(
        row.original.quantity as number,
        row.original.uom?.symbol as Units,
      );
      return (
        <div>
          {qty.value} {qty.unit}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as DistributedMaterialStatus;
      return (
        <div
          className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${batchStatusColors[status]}`}
        >
          {DistributedMaterialStatus[status]}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
