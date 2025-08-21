"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  DistributedMaterialStatus,
  Option,
  Units,
  convertToLargestUnit,
  getEnumBadgeWithHexColors,
} from "@/lib";
import { DistributedRequisitionMaterialDto } from "@/lib/redux/api/openapi.generated";
import { TableCheckbox } from "@/shared/datatable/table-check";
import MultiSelectListViewer from "@/shared/multi-select-lists";
import StatusBadge from "@/shared/status-badge";

// interface DataTableRowActionsProps<TData> {
//   row: Row<TData>;
// }

// export function DataTableRowActions<
//   TData extends DistributedRequisitionMaterialDto,
// >({ row }: DataTableRowActionsProps<TData>) {
//   const router = useRouter();
//   const { id, status } = row.original;

//   const canCreateChecklist =
//     status === DistributedMaterialStatus.Distributed ||
//     status === DistributedMaterialStatus.Arrived;

//   const { hasPermissionAccess } = useUserPermissions();

//   return (
//     <section className="flex items-center justify-end gap-2">
//       <div className="flex items-center justify-end gap-2">
//         {canCreateChecklist ? (
//           hasPermissionAccess(
//             PermissionKeys.warehouse.viewReceivedRawMaterialsItems,
//           ) && (
//             <Button
//               variant="default"
//               size="sm"
//               onClick={() => router.push(routes.createChecklist(id as string))}
//             >
//               <Icon name="Plus" className="h-4 w-4" />{" "}
//               <span>Create Checklist</span>
//             </Button>
//           )
//         ) : (
//           <Button
//             variant="default"
//             size="sm"
//             onClick={() => router.push(routes.viewChecklist(id as string))}
//           >
//             <Icon name="Eye" className="h-4 w-4" /> <span>View Checklist</span>
//           </Button>
//         )}
//       </div>
//     </section>
//   );
// }

export const columns: ColumnDef<DistributedRequisitionMaterialDto>[] = [
  TableCheckbox<DistributedRequisitionMaterialDto>({
    disableRow: (rowData) => {
      return rowData.status === DistributedMaterialStatus.Distributed;
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
      const { label, style } = getEnumBadgeWithHexColors(
        DistributedMaterialStatus,
        status,
      );

      return <StatusBadge label={label} style={style} />;
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
